import React from "react";
import { AddPeople } from "~/shared/icons/AddPeople";

type Props = {
  onClick: () => void;
  isSolid?: boolean;
  isHeader?: boolean;
  disabled?: boolean;
  className?: string;
}

const AddPeopleButton: React.FC<Props> = ({ onClick, isSolid = true, isHeader = true, disabled = false, className = "" }) => {
  return (
    <button
      onClick={() => {
        if (!disabled) return onClick();
      }}
      className={`
        bg-blue-600 
        outline-0 flex items-center justify-center rounded-md cursor-pointer 
        ${isHeader ? "h-[36px] w-[36px]" : "h-[30px] w-[33px]"} 
        ${isSolid ? "hover:bg-blue-900" : "bg-slate-200 border border-blue-600 hover:bg-slate-300"}
        ${disabled && "opacity-50 cursor-not-allowed"}
        ${className}
      `}>
      <AddPeople color={!isSolid ? "#2563EB" : "#F8FAFC"} />
    </button>
  );
};

export default AddPeopleButton;
