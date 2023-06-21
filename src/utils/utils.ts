const months = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

function padTo2Digits(num: number) {
  return num.toString().padStart(2, "0");
}

export function formatDate(date: Date | "", join: "/" | "-" = "/") {
  if (!date) return "";
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join(join);
}

export function formatDateTXT(date: Date | "") {
  if (!date) return "";
  return (
    padTo2Digits(date.getDate()) +
    " " +
    months[date.getMonth()] +
    " " +
    date.getFullYear()
  );
}
export function formatTime(date: Date | "") {
  if (!date) return "";
  return [padTo2Digits(date.getHours()), padTo2Digits(date.getMinutes())].join(
    ":"
  );
}

export function cleanString(str: string) {
  return `${str}`
    .toLowerCase()
    .trim()
    .replace(/á/gi, "a")
    .replace(/é/gi, "e")
    .replace(/í/gi, "i")
    .replace(/ó/gi, "o")
    .replace(/ú/gi, "u")
    .replace(/ñ/gi, "n");
}

export function numberWithDot(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
