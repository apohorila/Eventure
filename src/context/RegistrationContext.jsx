import { createContext, useContext, useState } from "react";

const RegistrationContext = createContext(null);

export const RegistrationProvider = ({ children }) => {
  const [registrationData, setRegistrationData] = useState(null);

  return (
    <RegistrationContext.Provider
      value={{ registrationData, setRegistrationData }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = () => useContext(RegistrationContext);
