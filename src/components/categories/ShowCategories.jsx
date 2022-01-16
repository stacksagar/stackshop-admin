import {useState} from "react";
import {MinusIcon, PlusIcon} from "@heroicons/react/solid";
import RendeCategories from "./RenderCategories";

const ShowCategories = ({c, deletingCategory, editHandler}) => {
  const [open_child, set_open_child] = useState(false);

  return (
    <li
      className={`px-4 w-full  ${
        open_child && c.children.length > 0 ? "my-6 border-l border-b" : "my-4"
      }`}
    >
      <div className="flex items-center text-white">
        {!open_child && (
          <div className="relative w-5 h-0.5 -ml-8 bg-white">
            <span className="block w-2 h-2 transform rotate-45 border border-white border-l-0 border-b-0 absolute inset-y-0 right-0 my-auto" />
          </div>
        )}

        <div
          className={`flex p-2 transition-none items-center space-x-1 ${
            open_child && c.children.length > 0 && "bg-black -ml-4"
          } `}
        >
          {c?.children?.length > 0 && (
            <button
              onClick={() => set_open_child((prev) => !prev)}
              className="border text-xs"
            >
              {open_child ? (
                <MinusIcon className="w-4" />
              ) : (
                <PlusIcon className="w-4" />
              )}
            </button>
          )}

          <span
            className={`cursor-pointer  ${
              open_child &&
              c.children.length > 0 &&
              "font-semibold tracking-wider"
            }`}
          >
            {c.name}
          </span>

          <button
            onClick={() => editHandler(c)}
            className="px-1 py-0.5 rounded bg-gray-500  text-xs"
          >
            edit
          </button>
          <button
            onClick={() => deletingCategory(c._id)}
            className="px-1 py-0.5 rounded bg-red-600  text-xs"
          >
            delete
          </button>
        </div>
      </div>
      {open_child && (
        <RendeCategories categories={c?.children} editHandler={editHandler} />
      )}
    </li>
  );
};
export default ShowCategories;
