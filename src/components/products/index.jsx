import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {get_products} from "../../redux/actions/product.actions";
import Layout from "../Layout";
import Table from "./Table";
import LoadingScreen from "../Singles/LoadingScreen";
import Button from "../utils/Button";
import AddNewProduct from "./AddNewProduct";
import UpdateProduct from "./UpdateProduct";
import DetailsProduct from "./DetailsProduct";

const Products = () => {
  const [showANP, setShowANP] = useState(false);
  const [showDP, setShowDP] = useState(false);
  const [showUP, setShowUP] = useState(false);

  const [selectedDP, setSelectedDP] = useState({});
  const [selectedUP, setSelectedUP] = useState({});
  const setShowUPHandler = (product) => {
    setShowUP(true);
    setSelectedUP(product);
  };
  const setShowDPHandler = (product) => {
    setShowDP(true);
    setSelectedDP(product);
  };

  const {products, fetched, loading} = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!fetched) {
      get_products(dispatch);
    }
  }, [dispatch, fetched]);

  if (loading)
    return (
      <Layout>
        <LoadingScreen />
      </Layout>
    );
  return (
    <Layout px={true}>
      <div className="py-9 flex justify-between">
        <p className="text-lg text-white">Products</p>
        <Button onClick={() => setShowANP(true)} text="Add new product" />
      </div>
      <Table
        products={products}
        setShowDPHandler={setShowDPHandler}
        setShowUPHandler={setShowUPHandler}
      />
      {showANP && <AddNewProduct showANP={showANP} setShowANP={setShowANP} />}

      {showDP && <DetailsProduct product={selectedDP} setShowDP={setShowDP} />}

      {showUP && (
        <UpdateProduct setShowUP={setShowUP} selectedUP={selectedUP} />
      )}
    </Layout>
  );
};

export default Products;
