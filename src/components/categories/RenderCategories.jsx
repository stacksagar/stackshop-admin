import {useState} from "react";
import {useDispatch} from "react-redux";
import {delete_category} from "../../redux/actions/category.actions";
import DeletePopup from "./DeletePopup";
import ShowCategories from "./ShowCategories";

function RendeCategories({categories, editHandler}) {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [deleteID, setDeleteID] = useState("");
  const deletingCategory = (id) => {
    setShowPopup(true);
    setDeleteID(id);
  };
  const deleteCategory = () => {
    if (deleteID) {
      delete_category(dispatch, deleteID, setShowPopup);
    }
  };

  return (
    <ul className="">
      {showPopup && (
        <DeletePopup
          deleteCategory={deleteCategory}
          setShowPopup={setShowPopup}
        />
      )}

      {categories?.map((c, i) => (
        <ShowCategories
          editHandler={editHandler}
          key={i}
          c={c}
          deletingCategory={deletingCategory}
        />
      ))}
    </ul>
  );
}

export default RendeCategories;
