import { FC } from "react";
import floorDataMap from "../common/floorDataMap";
import IUnit from "../interfaces/IUnit";

interface UnitButtonProps {
  active?: boolean;
  onClick?: () => void;
  unit: IUnit;
}

const UnitButton: FC<UnitButtonProps> = ({ active, onClick, unit }) => {
  return (
    <div
      className={`flex items-center gap-[5px] justify-between p-[10px] bebas-neue-regular rounded-md border border-black cursor-pointer select-none transition-all active:scale-[0.98] ${
        active ? "bg-[#cef0ff]" : "bg-white hover:bg-[#e7e7e7]"
      }`}
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      <span className="flex text-lg w-[16px]">
        {floorDataMap?.[unit.ApartmentType as keyof typeof floorDataMap]?.short}
      </span>
      <span className="min-w-[2px] max-w-[2px] w-full h-full bg-[#000000] flex-shrink-0 flex-grow-0">
        &nbsp;
      </span>
      <span className="flex text-base">{unit.UnitNo}</span>
    </div>
  );
};

export default UnitButton;
