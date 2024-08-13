import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import OrdersList from './OrdersList';
import CabinetForm from './CabinetForm';

const Home: React.FC = () => {
  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4">Welcome to the Carpentry App</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link className="nav-link btn btn-outline-primary mb-2" to="/orders">
                View Orders
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link btn btn-outline-secondary" to="/new-order">
                Create New Order
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/orders" element={<OrdersList />} />
          <Route path="/new-order" element={<CabinetForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
