import { useContext, createContext } from "react";

const WalletContext = createContext();

export const WalletProvider = ({ children, value }) => {
  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
