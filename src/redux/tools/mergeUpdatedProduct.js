export default function mergeUpdatedProduct(products, updated) {
  let new_prod = products.filter((p) => p._id !== updated._id);
  return [...new_prod, updated];
}
