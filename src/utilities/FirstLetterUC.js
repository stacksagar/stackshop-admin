const FirstLetterUC = (fullText) => {
  return fullText.split("")[0].toUpperCase() + fullText.substr(1).toLowerCase();
};
export default FirstLetterUC;
