import React, { createContext, useContext, useState, useEffect } from 'react';
import { SAMPLE_ACTIVE_ORDER } from '../data/mockData';

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('quickbite_orders');
      return saved ? JSON.parse(saved) : [SAMPLE_ACTIVE_ORDER];
    } catch {
      return [SAMPLE_ACTIVE_ORDER];
    }
  });

  const [activeTrackingOrderId, setActiveTrackingOrderId] = useState(() => {
    return 'QB-98421';
  });

  const [isTrackerOpen, setIsTrackerOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('quickbite_orders', JSON.stringify(orders));
  }, [orders]);

  // Simulated live progression for current active order
  useEffect(() => {
    if (!activeTrackingOrderId) return;

    const interval = setInterval(() => {
      setOrders(prevOrders => {
        return prevOrders.map(order => {
          if (order.id !== activeTrackingOrderId || order.status === 'delivered') return order;

          const stageIndex = order.stages.findIndex(s => s.active);
          if (stageIndex === -1) return order;

          // If still running, increment progress or advance stage
          let nextProgress = (order.progressPercentage || 25) + 3;
          let newStages = [...order.stages];
          let newStatus = order.status;

          if (nextProgress >= 100) {
            nextProgress = 100;
            newStatus = 'delivered';
            newStages = newStages.map(s => ({ ...s, completed: true, active: false }));
            newStages[newStages.length - 1].active = true;
          } else if (nextProgress > 80 && order.status !== 'on_the_way') {
            newStatus = 'on_the_way';
            newStages[2].completed = true;
            newStages[2].active = false;
            newStages[3].active = true;
          } else if (nextProgress > 50 && order.status === 'preparing') {
            newStatus = 'picked_up';
            newStages[1].completed = true;
            newStages[1].active = false;
            newStages[2].active = true;
          }

          return {
            ...order,
            progressPercentage: nextProgress,
            status: newStatus,
            stages: newStages,
            estimatedDeliveryMin: Math.max(1, Math.round(order.estimatedDeliveryMin * 0.95))
          };
        });
      });
    }, 6000);

    return () => clearInterval(interval);
  }, [activeTrackingOrderId]);

  const placeOrder = ({ items, restaurant, subtotal, deliveryFee, serviceFee, discountAmount, total, address, deliveryNote }) => {
    const newOrderId = `QB-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newOrder = {
      id: newOrderId,
      createdAt: timeStr,
      restaurant: {
        name: restaurant.name,
        phone: '+1 (555) 234-5678',
        address: restaurant.address || 'Local Downtown Branch',
      },
      status: 'preparing',
      progressPercentage: 25,
      estimatedDeliveryMin: parseInt(restaurant.deliveryTime?.split('-')[0] || '20', 10),
      estimatedTime: `${restaurant.deliveryTime || '20-25'} mins away`,
      driver: {
        name: 'Alex Rivera',
        rating: 4.96,
        vehicle: 'E-Bike Delivery Courier',
        phone: '+1 (555) 890-1234',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
        trips: '1,820 deliveries'
      },
      items,
      subtotal,
      deliveryFee,
      serviceFee,
      discountAmount,
      total,
      deliveryAddress: address || 'Current Location, Main Blvd',
      deliveryNote: deliveryNote || 'Leave at front door / ring bell',
      stages: [
        { label: 'Order Placed', time: timeStr, completed: true, active: false },
        { label: 'Kitchen Preparing', time: `${timeStr}`, completed: false, active: true },
        { label: 'Driver Picked Up', time: 'In ~10 min', completed: false, active: false },
        { label: 'Out for Delivery', time: 'In ~15 min', completed: false, active: false },
        { label: 'Delivered', time: `In ~${restaurant.deliveryTime || '20'} min`, completed: false, active: false }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    setActiveTrackingOrderId(newOrderId);
    setIsTrackerOpen(true);
    return newOrderId;
  };

  const currentActiveOrder = orders.find(o => o.id === activeTrackingOrderId) || orders[0] || null;

  return (
    <OrderContext.Provider
      value={{
        orders,
        activeTrackingOrderId,
        setActiveTrackingOrderId,
        currentActiveOrder,
        isTrackerOpen,
        setIsTrackerOpen,
        placeOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
}
