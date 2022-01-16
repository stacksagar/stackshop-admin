import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {create_category} from "../../redux/actions/category.actions";
import Button from "../utils/Button";
import Input from "../utils/Input";
import SelectorCategories from "../categories/SelectorCategories";

const AddNewCategory = ({setShowANC}) => {
  const dispatch = useDispatch();
  const {
    categories,
    create_loading: loading,
    create_error: error,
  } = useSelector((state) => state.categories);
  const [showImage, setShowImage] = useState(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState();

  function imageHandler(e) {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (ev) => {
        setShowImage(ev.target.result);
      };
    }
  }

  function uploadHandler(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    if (image) {
      formData.append("image", image);
    }
    if (selectedCategory?._id) {
      formData.append("parent", selectedCategory._id);
    }
    create_category(dispatch, formData, setShowANC);
  }

  return (
    <div className="fixed inset-0 m-auto flex justify-center items-center">
      <div
        onClick={() => setShowANC(false)}
        className="fixed inset-0 m-auto bg-black bg-opacity-25 z-40"
      />
      <form
        onSubmit={uploadHandler}
        className="bg-gray-200 relative overflow-y-auto z-50 w-96 p-5 max-h-minus_header flex flex-col space-y-3"
      >
        <button
          onClick={() => setShowANC(false)}
          type="button"
          className="absolute top-3 right-4 text-lg"
        >
          &times;
        </button>
        <p className="py-0.5 text-lg text-blue-500">Add New Category</p>
        {error && <p className="py-0.5 text-sm text-red-500">{error}</p>}
        <Input onChange={(e) => setName(e.target.value)} id="name" />
        <SelectorCategories
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
        />
        <input type="file" name="image" id="image" onChange={imageHandler} />
        <div>
          {showImage && (
            <div className="relative w-20 h-16">
              <span
                onClick={() => {
                  setImage(null);
                  setShowImage(null);
                }}
                className="absolute cursor-pointer top-0 -right-3 flex justify-center items-center text-white bg-red-500 w-6 h-6 rounded-full"
              >
                &times;
              </span>
              <img
                alt=""
                src={showImage}
                className="w-full h-full object-cover inline-block ml-1 mt-1"
              />
            </div>
          )}
        </div>
        <Button type="submit" text="Add Category" loading={loading} />
      </form>
    </div>
  );
};

export default AddNewCategory;
