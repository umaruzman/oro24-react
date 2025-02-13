import { FC, useContext } from "react";
import { Navigate } from "react-router";
import { appContext } from "../../context/AppContextProvider";

interface IsAuthorizedProps {
  children: React.ReactNode;
}

const IsAuthorized: FC<IsAuthorizedProps> = ({ children }) => {
  const { user } = useContext(appContext);

  return user ? (
    children
  ) : (
    <>
      <Navigate to="/login" />
    </>
  );
};

export default IsAuthorized;
