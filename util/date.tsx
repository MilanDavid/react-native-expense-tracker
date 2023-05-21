export const DATE_DDMMYYYY_MASK = (text = "") => {
  const cleanText = text.replace(/\D+/g, "");
  let secondDigitDayMask = /\d/;

  if (cleanText.charAt(0) === "0") {
    secondDigitDayMask = /[1-9]/;
  }

  if (cleanText.charAt(0) === "3") {
    secondDigitDayMask = /[01]/;
  }

  let secondDigitMonthMask = /\d/;

  if (cleanText.charAt(2) === "0") {
    secondDigitMonthMask = /[1-9]/;
  }

  if (cleanText.charAt(2) === "1") {
    secondDigitMonthMask = /[012]/;
  }

  return [
    /[0-3]/,
    secondDigitDayMask,
    ".",
    /[0-1]/,
    secondDigitMonthMask,
    ".",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];
};
