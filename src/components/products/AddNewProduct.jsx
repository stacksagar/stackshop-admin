import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {add_product} from "../../redux/actions/product.actions";
import Button from "../utils/Button";
import Input from "../utils/Input";
import SelectorCategories from "../categories/SelectorCategories";
import {get_categories} from "../../redux/actions/category.actions";

const AddNewProduct = ({showANP, setShowANP}) => {
  const dispatch = useDispatch();
  const {create_loading: loading, create_error: error} = useSelector(
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
    add_product(dispatch, formData, setShowANP);
  }

  useEffect(() => {
    if (!categories_fetched) {
      get_categories(dispatch);
    }
  }, [dispatch, categories_fetched]);

  return (
    <>
      <div
        onClick={() => setShowANP(false)}
        className="fixed inset-0 m-auto bg-black bg-opacity-25 z-40"
      />
      <form
        onSubmit={uploadHandler}
        className="bg-gray-200 overflow-y-auto fixed inset-0 m-auto z-50 w-96 p-5 h-minus_header flex flex-col space-y-3"
      >
        <button
          onClick={() => setShowANP(false)}
          type="button"
          className="absolute top-3 right-4 text-lg"
        >
          &times;
        </button>
        <p className="py-0.5 text-lg text-blue-500">Add New Product</p>
        {error && <p className="py-0.5 text-sm text-red-500">{error}</p>}
        <Input onChange={stateHandler} id="name" />
        <SelectorCategories
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Input onChange={stateHandler} id="price" />
        <Input onChange={stateHandler} id="quantity" />
        <Input onChange={stateHandler} id="description" optional={true} />
        <Input
          type="file"
          multiple={true}
          onChange={imagesHandler}
          id="images"
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

export default AddNewProduct;
