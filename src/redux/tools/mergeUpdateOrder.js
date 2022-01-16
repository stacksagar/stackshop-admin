export default function mergeUpdateOrder(updatedOrder, orders) {
  const newOrders = orders.filter((o) => o._id !== updatedOrder._id);
  return [...newOrders, updatedOrder];
}
