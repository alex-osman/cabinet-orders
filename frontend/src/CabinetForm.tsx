import React, { useState } from 'react';
import DimensionInput from './DimensionInput';
import StyleSelection from './StyleSelection';
import axios from 'axios';

const CabinetForm: React.FC = () => {
  const [width, setWidth] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [depth, setDepth] = useState<string>('');
  const [selectedStyle, setSelectedStyle] = useState<string>('');
  const styles = ['Modern', 'Traditional', 'Rustic']; // Example styles

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const orderData = {
      width: parseFloat(width),
      height: parseFloat(height),
      depth: parseFloat(depth),
      style: selectedStyle,
    };

    try {
      const response = await axios.post('http://localhost:4000/api/orders', orderData);
      // Handle response, e.g., download the .ord file
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <DimensionInput label="Width" value={width} onChange={setWidth} />
      <DimensionInput label="Height" value={height} onChange={setHeight} />
      <DimensionInput label="Depth" value={depth} onChange={setDepth} />
      <StyleSelection
        styles={styles}
        selectedStyle={selectedStyle}
        onSelect={setSelectedStyle}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CabinetForm;
