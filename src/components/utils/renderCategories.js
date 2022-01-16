const renderCategories = (
  get_categories,
  setSelectedCategory,
  setOpenCategories
) => {
  const show_categories = [];
  const categoryClickHandler = (c) => {
    setSelectedCategory({name: c.name, _id: c._id});
    setOpenCategories((p) => !p);
  };
  for (let c of get_categories) {
    show_categories.push(
      <li className={`pl-2 capitalize `} key={c._id}>
        <p className="flex">
          <button
            onClick={() => categoryClickHandler(c)}
            className="py-1 px-2 rounded hover:bg-black"
          >
            {c.name}
          </button>
        </p>
        {c.children.length > 0 ? (
          <ul>
            {renderCategories(
              c.children,
              setSelectedCategory,
              setOpenCategories
            )}
          </ul>
        ) : null}
      </li>
    );
  }
  return show_categories;
};

export default renderCategories;
