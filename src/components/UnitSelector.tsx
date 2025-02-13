import { FC } from "react";
import IUnit from "../interfaces/IUnit";
import UnitButton from "./UnitButton";

interface UnitSelectorProps {
  units: IUnit[];
  selectedUnits?: number[];
  setSelectedUnits: React.Dispatch<React.SetStateAction<number[]>>;
}

const UnitSelector: FC<UnitSelectorProps> = ({
  units,
  selectedUnits,
  setSelectedUnits,
}) => {
  const onUnitButtonClick = (unitId: number) => {
    setSelectedUnits((prev: number[]) => {
      return prev.includes(unitId)
        ? prev.filter((id) => id !== unitId)
        : [...prev, unitId];
    });
  };

  return (
    <div className="grid grid-cols-4 gap-[5px]">
      {units.map((unit, index) => (
        <UnitButton
          key={index}
          unit={unit}
          active={selectedUnits?.includes(unit.InventoryID)}
          onClick={() => onUnitButtonClick(unit.InventoryID)}
        />
      ))}
    </div>
  );
};

export default UnitSelector;
