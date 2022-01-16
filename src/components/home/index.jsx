import React, {useState} from "react";
import axiosInstance from "../../helpers/axiosInstance";
import Layout from "../Layout";
const Home = () => {
  const [images, setImages] = useState();
  const handler = async () => {
    const formData = new FormData();
    Object.values(images).map((val) => formData.append("image", val));
    const {data} = await axiosInstance.post("/api/product/first", formData);
    console.log("data ", data);
  };
  return (
    <Layout>
      <input
        type="file"
        multiple={true}
        onChange={(e) => setImages(e.target.files)}
      />
      <button onClick={handler}> Submit </button>
    </Layout>
  );
};

export default Home;
