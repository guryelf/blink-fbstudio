import React, { createContext, useContext, useState } from "react";

interface CreditsContextType {
  credits: number;
  addCredits: (amount: number) => void;
  removeCredits: (amount: number) => void;
}

const CreditsContext = createContext<CreditsContextType | undefined>(undefined);

export const CreditsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [credits, setCredits] = useState(10);

  const addCredits = (amount: number) => {
    setCredits((prev) => prev + amount);
  };

  const removeCredits = (amount: number) => {
    setCredits((prev) => Math.max(0, prev - amount));
  };

  return (
    <CreditsContext.Provider value={{ credits, addCredits, removeCredits }}>
      {children}
    </CreditsContext.Provider>
  );
};

export const useCredits = () => {
  const context = useContext(CreditsContext);
  if (!context) {
    throw new Error("useCredits must be used within a CreditsProvider");
  }
  return context;
};
