function extractWords(input) {
  return input.filter((val) => isNaN(parseInt(val, 10)));
}

function extractNums(input) {
  return input.filter((val) => !isNaN(parseInt(val, 10)));
}

function filterInUnique(input) {
  return [...input].filter((val, idx, arr) => arr.indexOf(val) === idx);
}

function getUniqueWords(input) {
  return filterInUnique(extractWords(input));
}

function getUniqueValues(input) {
  return filterInUnique(input);
}

function sortNumsDesc(input) {
  return extractNums(input).sort((a, b) => b - a);
}

function sortNumsAsc(input) {
  return extractNums(input).sort((a, b) => a - b);
}

function sortByWordLength(input) {
  return extractWords(input).sort((a, b) => a.length - b.length);
}

function sortInputAlphabetically(input) {
  return extractWords(input).sort();
}

export default {
  getUniqueWords,
  getUniqueValues,
  sortNumsDesc,
  sortNumsAsc,
  sortByWordLength,
  sortInputAlphabetically,
};
