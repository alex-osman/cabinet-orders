import React from 'react';
import CabinetForm from './CabinetForm';
import OrdersList from './OrdersList';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Custom Cabinet Order</h1>
      <CabinetForm />
      <OrdersList />
    </div>
  );
};

export default App;
