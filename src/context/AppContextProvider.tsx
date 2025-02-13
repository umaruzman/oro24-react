import { createContext, FC, useEffect, useState } from "react";
import IUser from "../interfaces/IUser";

const appContext = createContext<{
  user: IUser | null | undefined;
  setUser: (user: IUser | null | undefined) => void;
}>({
  user: null,
  setUser: () => {},
});

interface AppContextProviderProps {
  children: React.ReactNode;
}

const AppContextProvider: FC<AppContextProviderProps> = ({ children }) => {
  const [user, setUserVal] = useState<IUser | null | undefined>(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string)
      : null
  );

  const setUser = (user: IUser | null | undefined) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUserVal(user);
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  return (
    <appContext.Provider value={{ user, setUser }}>
      {children}
    </appContext.Provider>
  );
};

export { appContext, AppContextProvider };
