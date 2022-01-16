const buildNewCategories = (prev_cats, new_cat) => {
  const new_cats = [];

  if (!new_cat?.parent) return [...prev_cats, new_cat];

  for (let c of prev_cats) {
    if (c._id === new_cat.parent) {
      new_cats.push({
        ...c,
        children: buildNewCategories([...c.children, new_cat], new_cat),
      });
    } else {
      new_cats.push({
        ...c,
        children: buildNewCategories(c.children, new_cat),
      });
    }
  }

  return new_cats;
};

export default buildNewCategories;
