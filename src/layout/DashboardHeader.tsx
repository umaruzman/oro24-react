import { useContext } from "react";
import { FaUser } from "react-icons/fa";
import { MdOutlineMenu } from "react-icons/md";
import { appContext } from "../context/AppContextProvider";

const DashboardHeader = () => {
  const { user } = useContext(appContext);

  return (
    <header className="bg-white px-[10px] flex justify-between items-center">
      <div className="text-lg">
        <MdOutlineMenu />
      </div>
      <div className="bg-[#e1e1e1] flex gap-2 items-center px-2 py-1">
        <div className="rounded-full aspect-square bg-[#ffffff] p-2">
          <FaUser />
        </div>
        <div>{user?.name}</div>
      </div>
    </header>
  );
};

export default DashboardHeader;
