import {useState} from "react";
import {MinusIcon, PlusIcon} from "@heroicons/react/solid";

const DisplayCats = ({c, setSelectedCategory}) => {
  const [open_child, set_open_child] = useState(false);

  return (
    <li
      className={`px-4 w-full text-xs ${
        open_child && c.children.length > 0
          ? "my-1 border-l border-b border-gray-400 "
          : ""
      }`}
    >
      <div className="flex items-center">
        {!open_child && (
          <div className="relative w-5 h-0.5 -ml-9 bg-transparent"></div>
        )}

        <div
          className={`flex p-1 transition-none items-center space-x-1 ${
            open_child && c.children.length > 0 && "-ml-4"
          } `}
        >
          <button onClick={() => setSelectedCategory(c)} type="button">
            {c.name}
          </button>

          {c?.children?.length > 0 && (
            <button
              type="button"
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
        </div>
      </div>
      {open_child && (
        <RenderCategories
          categories={c?.children}
          setSelectedCategory={setSelectedCategory}
        />
      )}
    </li>
  );
};

function RenderCategories({categories, setSelectedCategory}) {
  return (
    <ul>
      {categories?.map((c, i) => (
        <DisplayCats setSelectedCategory={setSelectedCategory} key={i} c={c} />
      ))}
    </ul>
  );
}

export default function SelectorCategories({
  categories,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div>
      <label htmlFor="" className="text-sm">
        Select Parent Category <span className="text-xs">(optional)</span>
      </label>
      {selectedCategory?.name && (
        <p className="bg-white p-2 mb-1 text-sm relative">
          {selectedCategory?.name}
          <span
            onClick={() => setSelectedCategory({})}
            className="absolute inset-y-0 flex justify-center items-center bg-red-500 text-white cursor-pointer rounded-full w-5 h-5 right-5 m-auto text-lg"
          >
            &times;
          </span>
        </p>
      )}
      <div className="max-h-40 overflow-y-auto bg-white p-2">
        <RenderCategories
          setSelectedCategory={setSelectedCategory}
          categories={categories}
        />
      </div>
    </div>
  );
}
