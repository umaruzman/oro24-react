import { createContext, FC, useEffect, useState } from "react";
import IUser from "../interfaces/user";

const appContext = createContext<{
  user: IUser | null | undefined;
  setUser: React.Dispatch<React.SetStateAction<IUser | null | undefined>>;
}>({
  user: null,
  setUser: () => {},
});

interface AppContextProviderProps {
  children: React.ReactNode;
}

const AppContextProvider: FC<AppContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null | undefined>(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

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
