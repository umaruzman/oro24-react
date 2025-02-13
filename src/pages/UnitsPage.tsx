import { useState } from "react";
import BlockSelector from "../components/BlockSelector";
import FloorSection from "../components/FloorSelection";
import DashboardLayout from "../layout/DashboardLayout";

// const unitTypes: string[] = ["STUDIO", "1BH", "2BH"];
const floors: number[] = [1, 2];
// Example unit types

const UnitsPage: React.FC = () => {
  const [selectedBlock, setSelectedBlock] = useState<string>("BLOCK-2");

  return (
    <DashboardLayout>
      <div className="bg-white p-4 rounded-md">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold mb-4">Torino by ORO24</h1>
          <BlockSelector
            selectedBlock={selectedBlock}
            setSelectedBlock={setSelectedBlock}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {floors.map((floor) => (
            <FloorSection key={floor} floor={floor} />
          ))}
        </div>
        <div className="mt-4 flex justify-between items-center">
          <p className="text-lg font-semibold">You selected 56 units</p>
          <button className="bg-black text-white px-4 py-2 rounded-md">
            Assign Check List
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UnitsPage;
