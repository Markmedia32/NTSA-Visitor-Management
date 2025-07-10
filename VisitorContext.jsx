import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

const STORAGE_KEY = 'ntsa-visitor-logs';

const VisitorLogContext = createContext(null);
export const useVisitors = () => {
  const ctx = useContext(VisitorLogContext);
  if (!ctx) throw new Error('useVisitors must be inside <VisitorLogProvider>');
  return ctx;
};

export const VisitorLogProvider = ({ children }) => {
  /* load from localStorage */
  const [logs, setLogs] = useState(() => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  });

  /* persist */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
  }, [logs]);

  /* helpers */
  const addLog = (entry) => setLogs((prev) => [...prev, entry]);

  const updateLog = (idNumber, updates) =>
    setLogs((prev) =>
      prev.map((log) =>
        log.idNumber === idNumber && log.timeout === null
          ? { ...log, ...updates }
          : log
      )
    );

  /* frequency helper (count past visits) */
  const visitCount = useCallback(
    (idNumber) =>
      logs.filter((log) => log.idNumber === idNumber && log.timeout !== null)
        .length,
    [logs]
  );

  return (
    <VisitorLogContext.Provider value={{ logs, addLog, updateLog, visitCount }}>
      {children}
    </VisitorLogContext.Provider>
  );
};

export default VisitorLogProvider;
