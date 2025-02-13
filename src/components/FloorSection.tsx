import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { FaCheck } from "react-icons/fa";
import floorDataMap from "../common/floorDataMap";
import IFloor from "../interfaces/IFloor";
import MultiSelectButtons, {
  IMultiSelectButtonsItem,
} from "./controls/MultiSelectButtons";
import UnitSelector from "./UnitSelector";

interface FloorSectionProps {
  floor: IFloor;
  selectedUnits: number[];
  setSelectedUnits: React.Dispatch<React.SetStateAction<number[]>>;
}

const FloorSection: FC<FloorSectionProps> = ({
  floor,
  selectedUnits,
  setSelectedUnits,
}) => {
  const [selectedUnitType, setSelectedUnitType] = useState<string[]>([]);
  const [isFilteringByType, setIsFilteringByType] = useState(false);

  // Extract unique unit types from the floor data
  const unitTypes: string[] = useMemo(() => {
    return Array.from(
      new Set(floor?.ProjectDeliveries?.map((unit) => unit.ApartmentType) || [])
    );
  }, [floor]);

  // Get only the selected units for this floor
  const selectedUnitsForFloor = useMemo(() => {
    return selectedUnits.filter((unitId) =>
      floor?.ProjectDeliveries?.some((unit) => unit.InventoryID === unitId)
    );
  }, [selectedUnits, floor]);

  // Check if all units in this floor are selected
  const isAllSelected = useMemo(() => {
    return selectedUnitsForFloor.length === floor?.ProjectDeliveries?.length;
  }, [selectedUnitsForFloor, floor]);

  // Select/Deselect all units for this specific floor
  const selectAllToggle = useCallback(() => {
    setSelectedUnits((prevSelected) => {
      const floorUnitIds =
        floor?.ProjectDeliveries?.map((unit) => unit.InventoryID) || [];

      if (isAllSelected) {
        // Remove only this floor's units from selectedUnits
        return prevSelected.filter((id) => !floorUnitIds.includes(id));
      } else {
        // Add this floor's units, keeping others intact
        return [...new Set([...prevSelected, ...floorUnitIds])];
      }
    });

    setSelectedUnitType([]); // Reset filters when selecting all
    setIsFilteringByType(false);
  }, [isAllSelected, floor, setSelectedUnits]);

  // Update selectedUnits when selectedUnitType changes (handle filtering)
  useEffect(() => {
    if (isFilteringByType) {
      setSelectedUnits((prevSelected) => {
        // Keep other floors' selections intact, update only this floor
        const filteredUnits =
          floor?.ProjectDeliveries?.filter((unit) =>
            selectedUnitType.includes(unit.ApartmentType)
          )?.map((unit) => unit.InventoryID) || [];

        return [
          ...prevSelected.filter(
            (id) =>
              !floor?.ProjectDeliveries?.some((unit) => unit.InventoryID === id)
          ),
          ...filteredUnits,
        ];
      });
    }
  }, [
    selectedUnitType,
    floor?.ProjectDeliveries,
    setSelectedUnits,
    isFilteringByType,
  ]);

  // Only update selectedUnitType when filtering by type
  const handleUnitTypeChange = (
    value:
      | Partial<IMultiSelectButtonsItem>
      | Partial<IMultiSelectButtonsItem>[]
      | null
  ) => {
    if (!value) {
      setSelectedUnitType([]);
      setIsFilteringByType(false);
      return;
    }

    // Ensure it's an array
    const selectedTypes = Array.isArray(value)
      ? value.map((item) => item.value as string)
      : [value.value as string];

    setSelectedUnitType(selectedTypes);
    setIsFilteringByType(true);
  };

  return (
    <div className="border p-4 rounded-md bg-[#F3F6F9] shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Floor - {floor.floor_no}</h3>
        <div className="flex gap-3 items-center">
          <button
            className="text-sm bg-white border border-black px-4 py-2 rounded-md flex gap-2 justify-center items-center h-fit"
            onClick={selectAllToggle}
          >
            <span className="bg-[#D6D6D6] aspect-square p-0.5 rounded-md">
              <FaCheck />
            </span>
            {isAllSelected ? "Deselect all" : "Select all"}
          </button>
          <div className="flex items-center">
            <MultiSelectButtons
              items={unitTypes.map((unit) => ({
                label:
                  floorDataMap?.[unit as keyof typeof floorDataMap]?.medium,
                value: unit,
              }))}
              value={selectedUnitType.map((unit) => ({
                label:
                  floorDataMap?.[unit as keyof typeof floorDataMap]?.medium,
                value: unit,
              }))}
              multiple
              onChange={handleUnitTypeChange}
            />
          </div>
        </div>
      </div>
      <UnitSelector
        units={floor.ProjectDeliveries}
        selectedUnits={selectedUnits}
        setSelectedUnits={setSelectedUnits}
      />
    </div>
  );
};

export default FloorSection;
