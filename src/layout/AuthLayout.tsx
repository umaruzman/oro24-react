import { FC } from "react";
import authBg from "../assets/auth-bg.png";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div
      className={`h-screen w-screen bg-cover bg-center flex justify-center items-center`}
      style={{
        backgroundImage: `url('${authBg}')`,
      }}
    >
      {children}
    </div>
  );
};

export default AuthLayout;
