import React from 'react';

interface DimensionInputProps {
  label: string;
  value: number | string;
  onChange: (value: string) => void;
}

const DimensionInput: React.FC<DimensionInputProps> = ({ label, value, onChange }) => {
  return (
    <div>
      <label>{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default DimensionInput;
