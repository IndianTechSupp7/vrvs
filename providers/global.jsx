import { createContext, useContext, useRef, useState } from "react";

export const useGlobalProvider = () => useContext(MyContext);

// 1. Create context
export const MyContext = createContext();

export const GlobalProvider = ({ children }) => {
  const verticalGestureRef = useRef(null);
  const [active, setActive] = useState(null);
  const [diakok, setDiakok] = useState([]);
  const [kiadasok, setKiadasok] = useState([]);

  return (
    <MyContext.Provider
      value={{
        verticalGestureRef,
        active,
        setActive,
        kiadasok,
        setKiadasok,
        diakok,
        setDiakok,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
