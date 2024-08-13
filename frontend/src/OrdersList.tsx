import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Order {
  id: number;
  width: number;
  height: number;
  depth: number;
  style: string;
}

const OrdersList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get<Order[]>('http://localhost:4000/api/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Orders List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Width</th>
            <th>Height</th>
            <th>Depth</th>
            <th>Style</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.width}</td>
              <td>{order.height}</td>
              <td>{order.depth}</td>
              <td>{order.style}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersList;
