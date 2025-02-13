import { FC, useState } from "react";
import { FaCheck } from "react-icons/fa";

const floorData: string[] = ["1B", "2B", "3B"];

interface FloorSectionProps {
  floor: number;
}

const FloorSection: FC<FloorSectionProps> = ({ floor }) => {
  const [selectedFloor, setSelectedFloor] = useState<string>();

  const toggleUnit = (unit: string) => {
    setSelectedFloor((prevSelected) => (prevSelected === unit ? "" : unit));
  };

  return (
    <div className="border p-4 rounded-md bg-[#F3F6F9] shadow-md">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Floor - {floor}</h3>
        <div className="flex gap-3">
          <button
            className="text-sm bg-white border border-black px-5 rounded-md flex gap-2 justify-center items-center"
            onClick={() => {}}
          >
            <span className="bg-[#D6D6D6] aspect-square p-0.5 rounded-md">
              <FaCheck />
            </span>
            Select all
          </button>
          <div className="flex">
            {floorData.map((floor, index) => (
              <button
                key={floor}
                onClick={() => toggleUnit(floor)}
                className={`px-4 py-2 border text-black border-black ${
                  selectedFloor === floor ? "bg-[#6EC0E2]" : "bg-white"
                } ${index === 0 ? "rounded-l-md border-l" : "border-l-0"} ${
                  index === floorData.length - 1 ? "rounded-r-md" : ""
                }`}
              >
                {floor}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloorSection;
