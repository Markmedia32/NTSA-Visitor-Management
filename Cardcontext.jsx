import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

const STORAGE_KEY = 'ntsa-cards';

/* ---------- CONTEXT + HOOK ---------- */
export const CardContext = createContext(null);

export const useCards = () => {
  const ctx = useContext(CardContext);
  if (!ctx) throw new Error('useCards() must be used inside <CardProvider>');
  return ctx;
};

/* ---------- PROVIDER ---------- */
export const CardProvider = ({ children }) => {
  /* load cards or empty array */
  const [cards, setCards] = useState(() => {
    try {
      const json = localStorage.getItem(STORAGE_KEY);
      return json ? JSON.parse(json) : [];
    } catch {
      return [];
    }
  });

  /* persist */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  }, [cards]);

  /* helpers */
  const addCard = (id) =>
    setCards((prev) => [...prev, { id, status: 'available' }]);

  const updateCard = (id, status) =>
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c))
    );

  const firstAvailable = useCallback(
    () => cards.find((c) => c.status === 'available'),
    [cards]
  );

  /* issue card */
  const issueNextCard = () => {
    const next = firstAvailable();
    if (!next) return null;
    updateCard(next.id, 'issued');
    return next.id;
  };

  /* release card & push to bottom */
  const releaseCard = (id) =>
    setCards((prev) => {
      const updated = prev.map((c) =>
        c.id === id ? { ...c, status: 'available' } : c
      );
      const card  = updated.find((c) => c.id === id);
      const rest  = updated.filter((c) => c.id !== id);
      return [...rest, card];
    });

  const value = {
    cards,
    addCard,
    updateCard,
    firstAvailable,
    issueNextCard,
    releaseCard,
  };

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
};

export default CardProvider;
