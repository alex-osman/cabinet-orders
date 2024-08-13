import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import OrdersList from './OrdersList';
import CabinetForm from './CabinetForm';

const Home: React.FC = () => {
  return (
    <div className="container mt-5">
      <h1>Welcome to the Carpentry App</h1>
      <p>Select an option from the navigation bar to get started.</p>
    </div>
  );
};

const Navbar: React.FC = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">Carpentry App</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/new-order">New Order</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/orders">Order List</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
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
