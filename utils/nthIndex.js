// Find index position of custom string in string

function nthIndex(str, pat, n) {
  let L = str.length; let
    i = -1;
  while (n-- && i++ < L) {
    i = str.indexOf(pat, i);
    if (i < 0) break;
  }
  return i;
}

export default nthIndex;
