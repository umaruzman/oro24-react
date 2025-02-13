import { useCallback, useContext, useEffect, useState } from "react";
import { BASE_URL } from "../api/auth";
import BlockSelector from "../components/BlockSelector";
import FloorSection from "../components/FloorSection";
import { appContext } from "../context/AppContextProvider";
import IFloor from "../interfaces/IFloor";
import DashboardLayout from "../layout/DashboardLayout";

const UnitsPage: React.FC = () => {
  const { user } = useContext(appContext);
  const [floors, setFloors] = useState<IFloor[]>([]);
  const [blocks, setBlocks] = useState<string[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const [selectedUnits, setSelectedUnits] = useState<number[]>([]);
  const [initialDataFetched, setInitialDataFetched] = useState(false);
  const [assigningUnit, setAssigningUnit] = useState<boolean>(false);

  const fetchInitialData = useCallback(async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/HandOverProjectDelivery/inventory/floor-inventory-byBlock`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-app-id": "KYCTY",
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify({
            ProjectID: 1,
            apt_type: "All",
            block: selectedBlock || "All",
            ProjectDeliveryStatusID: 1,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();

        if (!initialDataFetched) {
          (data as IFloor[]).forEach((floor) => {
            floor.ProjectDeliveries.forEach((unit) => {
              setBlocks((prev) => {
                if (!prev.includes(unit.Block)) {
                  return [...prev, unit.Block];
                }
                return prev;
              });
            });
          });
        }

        setFloors(data as IFloor[]);
      }
    } catch (error) {
      console.error("Error fetching initial data:", error);
    } finally {
      setInitialDataFetched(true);
    }
  }, [user?.token, initialDataFetched, selectedBlock]);

  useEffect(() => {
    fetchInitialData();
  }, [selectedBlock]);

  const assignUnits = useCallback(async () => {
    setAssigningUnit(true);
    const payload = [];

    try {
      for (const unitId of selectedUnits) {
        const response = await fetch(
          `${BASE_URL}/api/HandOverProjectDelivery/work-activity-items-by-unit-multiple`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-app-id": "KYCTY",
              Authorization: `Bearer ${user?.token}`,
            },
            body: JSON.stringify({
              InventoryIDs: `${unitId}`,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();

          payload.push({
            InventoryID: unitId,
            Spaces: data,
          });
        }
      }

      const finalResponse = await fetch(
        `${BASE_URL}/api/HandOverProjectDelivery/add-inspection-space`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-app-id": "KYCTY",
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (finalResponse.ok) {
        const finalData = await finalResponse.json();
        console.log(finalData.Message);
        alert("Assigning units completed successfully!");
      }
    } catch (error) {
      console.error("Error assigning units:", error);
    } finally {
      setAssigningUnit(false);
    }
  }, [selectedUnits, user?.token]);

  return (
    <DashboardLayout>
      <div className="relative">
        <div className="bg-white p-4 rounded-md">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold mb-4">Torino by ORO24</h1>
            <BlockSelector
              blocks={blocks}
              selectedBlock={selectedBlock}
              setSelectedBlock={setSelectedBlock}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {floors.map((floor) => (
              <FloorSection
                key={floor.floor_no}
                floor={floor}
                selectedUnits={selectedUnits}
                setSelectedUnits={setSelectedUnits}
              />
            ))}
          </div>
        </div>
        {selectedUnits.length > 0 ? (
          <div className="mt-4 flex justify-center items-center fixed bottom-0 bg-[#e8d699] py-[10px] px-[20px] w-[calc(100%-250px)] left-[250px] gap-3">
            <p className="text-lg font-semibold">
              You selected {selectedUnits.length} units
            </p>
            <button
              className="text-white px-4 py-2 rounded-md bg-[#9f8224] hover:bg-[#886d15] translate-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={assignUnits}
              disabled={assigningUnit}
            >
              Assign Check List
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </DashboardLayout>
  );
};

export default UnitsPage;
