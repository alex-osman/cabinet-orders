import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ConfigurationType } from './enums/configuration-type.enum';
import { StyleType } from './enums/StyleType.enum';

interface Cabinet {
  id: number;
  width: number;
  height: number;
  depth: number;
  configurationType: ConfigurationType;
  style: StyleType;
}

interface Order {
  id: number;
  customerName: string;
  orderDate: string;
  cabinets: Cabinet[];
}

const OrdersList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get<Order[]>('http://localhost:4000/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const toggleExpand = (orderId: number) => {
    setExpandedOrderId((prevId) => (prevId === orderId ? null : orderId));
  };

  const handleGenerate = async (orderId: number) => {
    try {
      const response = await axios.post(`http://localhost:4000/orders/${orderId}/generate-ord`);
      console.log('Response:', response);
    } catch (error) {
      console.error('Error generating .ord file:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Orders List</h2>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Order Date</th>
            <th>Number of Cabinets</th>
            <th>Generate .ORD</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <React.Fragment key={order.id}>
              <tr>
                <td>{order.id}</td>
                <td>{order.customerName}</td>
                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                <td onClick={() => toggleExpand(order.id)} style={{ cursor: 'pointer', color: 'blue' }}>
                  {order.cabinets.length}
                </td>
                <td>
                  <button onClick={() => handleGenerate(order.id)} className="btn btn-primary">Generate</button>
                </td>
              </tr>
              {expandedOrderId === order.id && (
                order.cabinets.map((cabinet) => (
                  <tr key={cabinet.id}>
                    <td colSpan={5} style={{ paddingLeft: '30px' }}>
                      <table>
                        <tr><th> ID:</th><td>{cabinet.id}</td></tr>
                        <tr><th>Width:</th><td>{cabinet.width} in</td></tr>
                        <tr><th>Height:</th><td>{cabinet.height} in</td></tr>
                        <tr><th>Depth:</th><td>{cabinet.depth} in</td></tr>
                        <tr><th>Type:</th><td>{cabinet.configurationType}</td></tr>
                        <tr><th>Style:</th><td>{cabinet.style}</td></tr>
                      </table>
                    </td>
                  </tr>
                ))
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersList;
