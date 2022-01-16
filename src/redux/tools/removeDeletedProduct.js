export default function removeDeletedProduct(products, deleted) {
  return products.filter((p) => p._id !== deleted._id);
}
