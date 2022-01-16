import {CheckCircleIcon, CheckIcon} from "@heroicons/react/solid";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  update_order,
  update_order_peyment_status,
} from "../../redux/actions/order.actions";

import Button from "../utils/Button";
import dateFormatter from "../utils/dateFormatter";
const Order = ({order}) => {
  const dispatch = useDispatch();
  const {loading} = useSelector((state) => state.order);
  const [running, setRunning] = useState(0);
  const [status, setStatus] = useState("");
  const [peymentStatus, setPeymentStatus] = useState("");
  useEffect(() => {
    order?.orderStatus.map((status, i) => {
      if (status.isCompleted) {
        setRunning(i + 1);
      }
      return null;
    });
  }, [order, loading]);

  function updateOrder() {
    if (status) {
      update_order(dispatch, order._id, status);
    }
  }

  function updatePeymentStatus() {
    if (peymentStatus) {
      update_order_peyment_status(dispatch, order._id, peymentStatus);
    }
  }

  return (
    <div className="bg-gray-800 text-white m-5">
      <p className="h-header w-full bg-gray-700 flex space-x-1 items-center px-5">
        <b className="text-gray-300"> ORDER ID: </b>
        <span> {order?._id} </span>
      </p>

      <div className="flex justify-between p-5">
        <div>
          <p className="font-semibold border-b mb-1 ">items</p>
          {order?.items.map((item) => (
            <p className="text-xs" key={item._id}>
              {item.product.name}
            </p>
          ))}
        </div>
        <div>
          <p className="font-semibold border-b mb-1 ">Total Price</p>
          <p>{order?.amount}</p>
        </div>
        <div>
          <p className="font-semibold border-b mb-1 ">Peyment Type</p>
          <p>{order?.peymentMethod}</p>
        </div>
        <div>
          <p className="font-semibold border-b mb-1 ">Peyment Status</p>
          <p>{order?.peymentStatus}</p>
        </div>
      </div>

      <div className="flex justify-center px-10 py-16">
        {order?.orderStatus.map((status, i) => {
          if (i === 0) {
            return (
              <div
                key={status._id}
                className="-mr-7 flex flex-col items-center"
              >
                <p>{status.type}</p>
                <div className="h-2 z-30 my-3 flex items-center justify-start">
                  <div
                    className={`bg-green-500  w-6 h-6  rounded-full flex items-center justify-center`}
                  >
                    <CheckIcon className="w-3" />
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold">
                    {dateFormatter(status.date[0])}
                  </p>
                  <p className="text-xs">{status.date[1]}</p>
                </div>
              </div>
            );
          } else {
            return (
              <div
                key={status._id}
                className=" w-1/4 flex flex-col justify-start items-center"
              >
                <p className="w-full text-right">{status.type}</p>
                <div
                  className={`${
                    status.isCompleted ? "bg-green-400" : "bg-gray-500"
                  } w-full h-2 my-3 flex items-center justify-end`}
                >
                  <div
                    className={`${
                      status.isCompleted ? "bg-green-500" : "bg-blue-500"
                    } w-6 h-6  rounded-full flex items-center justify-center`}
                  >
                    {status.isCompleted && <CheckIcon className="w-3" />}
                    {running === i && (
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    )}
                  </div>
                </div>
                {status.isCompleted && (
                  <div className="w-full text-right">
                    <p className="text-xs font-semibold">{status.date[0]}</p>
                    <p className="text-xs">{status.date[1]}</p>
                  </div>
                )}
              </div>
            );
          }
        })}
      </div>

      <div className="flex items-center justify-center space-x-5 mx-auto pb-8">
        {running > 3 ? (
          <p className="text-green-300 flex items-center space-x-1">
            <b>Order Delivery Completed</b> <CheckCircleIcon className="w-6" />
          </p>
        ) : (
          <>
            <p className="font-semibold text-gray-300">Update Order Status</p>
            <select
              onChange={(e) => setStatus(e.target.value)}
              className="p-2 w-44 bg-black focus:ring outline-none"
            >
              <option value="" className="text-gray-500">
                Select
              </option>
              {order?.orderStatus.map(
                (status, i) =>
                  running === i && (
                    <option key={status.type} value={status.type}>
                      {status.type}
                    </option>
                  )
              )}
            </select>
            <Button
              disabled={!status}
              onClick={updateOrder}
              loading={loading}
              text="Confirm"
              bg="bg-green-500 w-44"
            />
          </>
        )}
      </div>
      {running > 3 ? (
        <></>
      ) : (
        <div className="flex items-center justify-center space-x-5 mx-auto pb-8">
          <p className="font-semibold text-gray-300">Update Peyment Status</p>
          <select
            onChange={(e) => setPeymentStatus(e.target.value)}
            className="p-2 w-44 bg-black focus:ring outline-none"
          >
            <option value="" className="text-gray-500">
              Select
            </option>
            <option key={status.type} value="pending">
              Pending
            </option>
            <option key={status.type} value="completed">
              Completed
            </option>
            <option key={status.type} value="cancelled">
              Cancelled
            </option>
            <option key={status.type} value="refunt">
              Refund
            </option>
          </select>
          <Button
            disabled={!peymentStatus}
            onClick={updatePeymentStatus}
            loading={loading}
            text="Confirm"
            bg="bg-green-500 w-44"
          />
        </div>
      )}
    </div>
  );
};

export default Order;
