import React from "react";
import {useDispatch} from "react-redux";
import {delete_product} from "../../redux/actions/product.actions";
const Btn = ({text, ...props}) => (
  <button
    {...props}
    className="text-xs px-2 py-1 rounded outline-none focus:ring-1 bg-blue-500"
  >
    {text}
  </button>
);

const BodyTr = ({index, product, setShowDPHandler, setShowUPHandler}) => {
  const dispatch = useDispatch();
  const deleteProduct = (id) => {
    delete_product(dispatch, id);
  };
  return (
    <tr className="bg-gray-900 text-center text-sm">
      <td className="p-3">{index}</td>
      <td className="p-3 text-left">{product?.name}</td>
      <td className="p-3 tracking-wider text-gray-200">
        Tk.{product?.price.toLocaleString("en-US")}
      </td>
      <td className="p-3">{product?.quantity}</td>
      <td className="p-3">{product?.category?.name}</td>
      <td className="p-3">
        <div className="flex justify-center space-x-3">
          <Btn onClick={() => setShowUPHandler(product)} text="Edit" />
          <Btn onClick={() => setShowDPHandler(product)} text="Details" />
          <Btn onClick={() => deleteProduct(product?._id)} text="Delete" />
        </div>
      </td>
    </tr>
  );
};

const Table = ({products, setShowDPHandler, setShowUPHandler}) => {
  return (
    <table className="table text-gray-300 border-separate space-y-12 w-full">
      <thead className="bg-gray-800 text-white sticky top-0">
        <tr>
          <th className="p-3 font-semibold tracking-wider">#</th>
          <th className="p-3 font-semibold tracking-wider">Name</th>
          <th className="p-3 font-semibold tracking-wider">Price</th>
          <th className="p-3 font-semibold tracking-wider">Quantity</th>
          <th className="p-3 font-semibold tracking-wider">Category</th>
          <th className="p-3 font-semibold tracking-wider">Action</th>
        </tr>
      </thead>
      <tbody>
        {products?.map((p, i) => (
          <BodyTr
            key={i}
            index={i}
            product={p}
            setShowUPHandler={setShowUPHandler}
            setShowDPHandler={setShowDPHandler}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
