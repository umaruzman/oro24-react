import { FC } from "react";

const blocks: string[] = [
  "BLOCK-1",
  "BLOCK-2",
  "BLOCK-3",
  "BLOCK-4",
  "BLOCK-5",
  "BLOCK-6",
];

interface BlockSelectorProps {
  selectedBlock: string;
  setSelectedBlock: (block: string) => void;
}

const BlockSelector: FC<BlockSelectorProps> = ({
  selectedBlock,
  setSelectedBlock,
}) => {
  return (
    <div className="flex mb-4">
      {blocks.map((block, index) => (
        <button
          key={block}
          onClick={() => setSelectedBlock(block)}
          className={`px-4 py-2 border border-black ${
            selectedBlock === block ? "bg-[#6EC0E2]" : "bg-white"
          } ${index === 0 ? "rounded-l-md border-l" : "border-l-0"} ${
            index === blocks.length - 1 ? "rounded-r-md" : ""
          }`}
        >
          {block}
        </button>
      ))}
    </div>
  );
};

export default BlockSelector;
