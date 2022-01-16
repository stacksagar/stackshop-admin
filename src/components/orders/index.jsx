import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {get_orders} from "../../redux/actions/order.actions";
import Layout from "../Layout";
import Order from "./Order";

const Orders = () => {
  const dispatch = useDispatch();
  const {orders, fetched} = useSelector((state) => state.order);
  useEffect(() => {
    if (!fetched) {
      get_orders(dispatch);
    }
  }, [dispatch, fetched]);

  return (
    <Layout>
      {orders?.map((order) => (
        <Order key={order._id} order={order} />
      ))}
    </Layout>
  );
};

export default Orders;
