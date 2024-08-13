import React, { useState } from 'react';
import axios from 'axios';
import { ConfigurationType } from './enums/configuration-type.enum';

interface Cabinet {
  width: number;
  height: number;
  depth: number;
  configurationType: ConfigurationType;
}

const CabinetForm: React.FC = () => {
  const [customerName, setCustomerName] = useState<string>('');
  const [cabinets, setCabinets] = useState<Cabinet[]>([
    { width: 0, height: 0, depth: 21, configurationType: ConfigurationType.TWO_DRAWER },
  ]);

  const addCabinet = () => {
    setCabinets([...cabinets, { width: 0, height: 0, depth: 21, configurationType: ConfigurationType.TWO_DRAWER }]);
  };

  const updateCabinet = (index: number, key: keyof Cabinet, value: any) => {
    const updatedCabinets = cabinets.map((cabinet, i) =>
      i === index ? { ...cabinet, [key]: value } : cabinet
    );
    setCabinets(updatedCabinets);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const orderData = {
      customerName,
      cabinets,
    };

    try {
      await axios.post('http://localhost:4000/orders', orderData);
      alert('Order created successfully!');
      setCustomerName('');
      setCabinets([{ width: 0, height: 0, depth: 21, configurationType: ConfigurationType.TWO_DRAWER }]);
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Create New Vanity Order</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="customerName" className="form-label">Customer Name</label>
          <input
            type="text"
            className="form-control"
            id="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>

        {cabinets.map((cabinet, index) => (
          <div key={index} className="mb-4">
            <h5>Cabinet {index + 1}</h5>
            <div className="row mb-3">
              <div className="col-md-4">
                <label htmlFor={`width-${index}`} className="form-label">Width</label>
                <input
                  type="number"
                  className="form-control"
                  id={`width-${index}`}
                  value={cabinet.width}
                  onChange={(e) => updateCabinet(index, 'width', parseFloat(e.target.value))}
                  min={15}
                  max={30.75}
                  step={0.25}
                  required
                />
              </div>
              <div className="col-md-4">
                <label htmlFor={`height-${index}`} className="form-label">Height</label>
                <input
                  type="number"
                  className="form-control"
                  id={`height-${index}`}
                  value={cabinet.height}
                  onChange={(e) => updateCabinet(index, 'height', parseFloat(e.target.value))}
                  min={15}
                  max={30.75}
                  step={0.25}
                  required
                />
              </div>
              <div className="col-md-4">
                <label htmlFor={`configuration-${index}`} className="form-label">Configuration</label>
                <select
                  id={`configuration-${index}`}
                  className="form-select"
                  value={cabinet.configurationType}
                  onChange={(e) => updateCabinet(index, 'configurationType', e.target.value as ConfigurationType)}
                  required
                >
                  <option value="">Select configuration</option>
                  <option value={ConfigurationType.TWO_DRAWER}>2 Drawers</option>
                  <option value={ConfigurationType.THREE_DRAWER}>3 Drawers</option>
                  <option value={ConfigurationType.DOOR}>Door</option>
                  <option value={ConfigurationType.DOOR_FALSE_FRONT}>Door with False Front</option>
                </select>
              </div>
            </div>
          </div>
        ))}

        <button type="button" className="btn btn-secondary mb-3" onClick={addCabinet}>
          Add Another Cabinet
        </button>

        <button type="submit" className="btn btn-primary">Submit Order</button>
      </form>
    </div>
  );
};

export default CabinetForm;
