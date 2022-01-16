import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {get_categories} from "../../redux/actions/category.actions";
import Layout from "../Layout";
import LoadingScreen from "../Singles/LoadingScreen";
import Button from "../utils/Button";
import AddNewCategory from "./AddNewCategory";
import RendeCategories from "./RenderCategories";
import UpdateCategory from "./UpdateCategory";

const Categories = () => {
  const {categories, loading, error, fetched} = useSelector(
    (state) => state.categories
  );
  const dispatch = useDispatch();
  const [showANC, setShowANC] = useState(false);
  const [showUC, setShowUC] = useState(false);
  const [selectedUC, setSelectedUC] = useState({});
  const editHandler = (category) => {
    setShowUC(true);
    setSelectedUC(category);
  };

  useEffect(() => {
    if (!fetched) {
      get_categories(dispatch);
    }
  }, [fetched, dispatch]);

  if (loading)
    return (
      <Layout>
        <LoadingScreen />
      </Layout>
    );

  if (error)
    return (
      <Layout>
        <p className="text-red-300">{error}</p>
      </Layout>
    );

  return (
    <Layout px={true}>
      <div className="py-9 flex justify-between">
        <p className="text-lg text-white">Categories</p>
        <Button onClick={() => setShowANC(true)} text="Add new category" />
      </div>
      <RendeCategories
        categories={categories}
        setShowUC={setShowUC}
        editHandler={editHandler}
      />

      {showANC && <AddNewCategory setShowANC={setShowANC} />}
      {showUC && (
        <UpdateCategory selectedUC={selectedUC} setShowUC={setShowUC} />
      )}
    </Layout>
  );
};

export default Categories;
