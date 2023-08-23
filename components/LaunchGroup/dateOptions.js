export const monthOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
export const daysInMonth = (month) => {
  const currentYear = new Date().getFullYear();
  if (month === 2) {
    return (currentYear % 4 === 0 && currentYear % 100 !== 0) ||
      currentYear % 400 === 0
      ? 29
      : 28;
  }
  return new Date(currentYear, month, 0).getDate();
};
export const nowYear = new Date().getFullYear();
// export function roundUpToNearestMultipleOf5(number) {
//   const remainder = number % 5;
//   if (remainder === 0) {
//     return number;
//   }
//   return number + (5 - remainder);
// }
export function roundUpToNearestMultipleOf5(number) {
  const remainder = number % 5;
  const roundedNumber = remainder === 0 ? number : number + (5 - remainder);
  return roundedNumber < 10 ? `0${roundedNumber}` : `${roundedNumber}`;
}
