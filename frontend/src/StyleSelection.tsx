import React from 'react';

interface StyleSelectionProps {
  styles: string[];
  selectedStyle: string;
  onSelect: (style: string) => void;
}

const StyleSelection: React.FC<StyleSelectionProps> = ({ styles, selectedStyle, onSelect }) => {
  return (
    <div>
      <label>Style</label>
      <select value={selectedStyle} onChange={(e) => onSelect(e.target.value)}>
        {styles.map((style) => (
          <option key={style} value={style}>
            {style}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StyleSelection;
