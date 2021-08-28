import { useContext, createContext, useState } from "react";

const UserAddressContext = createContext("");

export const UserAddressProvider = ({ children }) => {
  const [address, setAddress] = useState("");

  return (
    <UserAddressContext.Provider value={{ address, setAddress }}>
      {children}
    </UserAddressContext.Provider>
  );
};

export const useUserAddress = () => useContext(UserAddressContext);
