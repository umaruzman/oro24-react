import { FC } from "react";
import oro24Logo from "../assets/logo.svg";
import DashboardFooter from "./DashboardFooter";
import DashboardHeader from "./DashboardHeader";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="h-screen w-screen overflow-hidden flex">
      <aside className="flex-[250px] bg-black h-full w-full max-w-[250px] flex-shrink-0 p-[20px]">
        <div>
          <img src={oro24Logo} alt="" className="max-w-[150px] w-full" />
        </div>
      </aside>
      <main className="flex-1 flex flex-col overflow-auto">
        <DashboardHeader />
        <section className="flex-1 p-[10px]">{children}</section>
        <DashboardFooter />
      </main>
    </div>
  );
};

export default DashboardLayout;
