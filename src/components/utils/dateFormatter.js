export default function dateFormatter(da) {
  let d = da.split("/");
  function make(t) {
    if (t.length < 2) {
      return "0" + t;
    } else {
      return t;
    }
  }
  return make(d[1]) + "/" + make(d[0]) + "/" + d[2];
}
