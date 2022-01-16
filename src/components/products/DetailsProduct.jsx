import React from "react";

const DetailsProduct = ({product, setShowDP}) => {
  return (
    <div className="fixed inset-0 m-auto flex items-center justify-center">
      <div
        onClick={() => setShowDP(false)}
        className="bg-opacity-25 bg-black fixed inset-0 m-auto z-40"
      />
      <div className="relative z-50 bg-white p-12 overflow-y-auto rounded max-h-minus_header max-w-screen-md flex flex-col space-y-4">
        <span
          onClick={() => setShowDP(false)}
          className="absolute cursor-pointer right-4 top-3 text-xl text-black"
        >
          &times;
        </span>
        <p>
          <b>Name:</b> {product?.name}
        </p>
        <p>
          <b>Price:</b> {product?.price}
        </p>
        <p>
          <b>Quantity:</b> {product?.quantity}
        </p>
        <p>
          <b>Category:</b> {product?.category.name}
        </p>
        <p>
          <b>Description:</b> {product?.description}
        </p>
        <div className="">
          {product?.images.map((file, i) => (
            <img
              key={i}
              src={file.image}
              className="w-40 h-24 inline-block object-cover rounded mr-2 mb-2"
              alt=""
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailsProduct;
