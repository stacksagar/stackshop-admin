import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {update_product} from "../../redux/actions/product.actions";
import Button from "../utils/Button";
import Input from "../utils/Input";
import SelectorCategories from "../categories/SelectorCategories";
import {get_categories} from "../../redux/actions/category.actions";

const UpdateProduct = ({setShowUP, selectedUP}) => {
  const dispatch = useDispatch();
  const {update_loading: loading, update_error: error} = useSelector(
    (state) => state.products
  );
  const {categories, fetched: categories_fetched} = useSelector(
    (state) => state.categories
  );

  const [state, setState] = useState({});
  const [showImages, setShowImages] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  function stateHandler(e) {
    setState((prev) => ({...prev, [e.target.name]: e.target.value}));
  }
  useEffect(() => {
    if (Object.keys(selectedUP).length > 0) {
      Object.values(selectedUP?.images).map((img) =>
        setShowImages((prev) => [...prev, img.image])
      );
      setSelectedCategory(selectedUP.category);
      setState((prev) => ({
        ...prev,
        name: selectedUP.name,
        price: selectedUP.price,
        quantity: selectedUP.quantity,
        description: selectedUP.description,
      }));
    }
  }, [selectedUP]);

  useEffect(() => {
    if (images.length > 0) {
      setState((prev) => ({...prev, images}));
    }
    if (selectedCategory?.name) {
      setState((prev) => ({
        ...prev,
        category: selectedCategory._id,
      }));
    }
  }, [images, selectedCategory]);

  function imagesHandler(e) {
    if (e.target.files.length > 0) {
      setShowImages([]);
      setImages([]);
    }
    const files = e.target.files;
    for (let file of files) {
      setImages((prev) => [...prev, file]);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (ev) => {
        setShowImages((prev) => [...prev, ev.target.result]);
      };
    }
  }

  function uploadHandler(e) {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(state).map(([key, val]) => {
      if (key === "images") {
        for (let image of val) {
          formData.append("image", image);
        }
      } else {
        formData.append(key, val);
      }
      return null;
    });
    update_product(dispatch, formData, setShowUP, selectedUP._id);
  }

  useEffect(() => {
    if (!categories_fetched) {
      get_categories(dispatch);
    }
  }, [dispatch, categories_fetched]);

  return (
    <>
      <div
        onClick={() => setShowUP(false)}
        className="fixed inset-0 m-auto bg-black bg-opacity-25 z-40"
      />
      <form
        onSubmit={uploadHandler}
        className="bg-gray-200 overflow-y-auto fixed inset-0 m-auto z-50 w-96 p-5 h-minus_header flex flex-col space-y-3"
      >
        <button
          onClick={() => setShowUP(false)}
          type="button"
          className="absolute top-3 right-4 text-lg"
        >
          &times;
        </button>
        <p className="py-0.5 text-lg text-blue-500">Update Product</p>
        {error && <p className="py-0.5 text-sm text-red-500">{error}</p>}
        <Input value={state?.name || ""} onChange={stateHandler} id="name" />
        <SelectorCategories
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Input value={state?.price || ""} onChange={stateHandler} id="price" />
        <Input
          value={state?.quantity || ""}
          onChange={stateHandler}
          id="quantity"
        />
        <Input
          value={state?.description || ""}
          onChange={stateHandler}
          id="description"
          optional={true}
        />
        <input
          type="file"
          multiple={true}
          name="images"
          id="images"
          onChange={imagesHandler}
        />
        <div>
          {showImages.map((image, i) => (
            <img
              alt=""
              key={i}
              src={image}
              className="w-16 h-10 object-cover inline-block ml-1 mt-1"
            />
          ))}
        </div>
        <Button type="submit" text="Upload Product" loading={loading} />
      </form>
    </>
  );
};

export default UpdateProduct;
