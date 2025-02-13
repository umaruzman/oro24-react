import { FC } from "react";
import DashboardFooter from "./DashboardFooter";
import DashboardHeader from "./DashboardHeader";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="h-screen w-screen overflow-auto flex">
      <aside className="flex-[250px] bg-black h-full w-full max-w-[250px] flex-shrink-0">
        Hello
      </aside>
      <main className="flex-1 flex flex-col">
        <DashboardHeader />
        <section className="flex-1 p-[10px]">{children}</section>
        <DashboardFooter />
      </main>
    </div>
  );
};

export default DashboardLayout;
