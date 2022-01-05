// import getLogger from "./logger.helper";

// interface ISign {
//   nonce: string;
//   timestamp: string;
//   sign: string;
// }

// const LOWER_CASE = "abcdefghijklmnopqrstuvwxyz";
// const UPPER_CASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
// const NUMBERIC = "0123456789";
// const UNSAFE_CHARS = '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\'

// generate random string
export function zeroPad(num: string | number) {
  return `0${num}`.slice(-2);
}

export function formatDate(date: Date) {
  return {
    yyyy: date.getFullYear() + "",
    m: zeroPad(date.getMonth() + 1),
    d: zeroPad(date.getDate()),
    h: zeroPad(date.getHours()),
    mm: zeroPad(date.getMinutes()),
    s: zeroPad(date.getSeconds()),
    date,
  };
}
