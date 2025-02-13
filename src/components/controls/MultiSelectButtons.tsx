import { FC, useCallback } from "react";

export interface IMultiSelectButtonsItem {
  label: string;
  value: string | number | null;
}

interface MultiSelectButtonsProps {
  items: Partial<IMultiSelectButtonsItem>[];
  value: Partial<IMultiSelectButtonsItem> | Partial<IMultiSelectButtonsItem>[];
  multiple?: boolean;
  onChange?: (
    value:
      | Partial<IMultiSelectButtonsItem>
      | Partial<IMultiSelectButtonsItem>[]
      | null
  ) => void;
}

const MultiSelectButtons: FC<MultiSelectButtonsProps> = ({
  items,
  value,
  multiple,
  onChange,
}) => {
  const handleOnClick = useCallback(
    (newValue: Partial<IMultiSelectButtonsItem>) => {
      if (!multiple) {
        if (onChange)
          onChange(
            newValue.value == (value as Partial<IMultiSelectButtonsItem>).value
              ? null
              : newValue
          );
      } else {
        const valueArray = [...(value as Partial<IMultiSelectButtonsItem>[])];
        const findIndex = valueArray?.findIndex(
          (v) => v.value == newValue?.value
        );

        if (findIndex >= 0) {
          if (onChange)
            onChange(valueArray.filter((_, index) => index !== findIndex));
        } else {
          if (onChange)
            onChange([
              ...(value as Partial<IMultiSelectButtonsItem>[]),
              newValue,
            ]);
        }
      }
    },
    [value, multiple]
  );

  return (
    <div className="flex">
      {items.map((type, index) => (
        <button
          key={type.value}
          onClick={() => handleOnClick(type)}
          className={`px-4 py-2 border border-black 
            ${
              multiple &&
              (value as Partial<IMultiSelectButtonsItem>[])?.some(
                (v) => v.value === type.value
              )
                ? "bg-[#6EC0E2]"
                : (value as Partial<IMultiSelectButtonsItem>).value ===
                  type.value
                ? "bg-[#6EC0E2]"
                : "bg-white"
            } 
            ${index === 0 ? "rounded-l-md border-l" : "border-l-0"} 
            ${index === items.length - 1 ? "rounded-r-md" : ""}`}
        >
          {type.label}
        </button>
      ))}
    </div>
  );
};

export default MultiSelectButtons;
