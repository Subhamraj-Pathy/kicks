export const getDate = (timestamp) => {
  const dateObj = timestamp.toDate();
  const date = dateObj.getDate();
  const month = dateObj.toLocaleString('default', { month: 'long' });
  // const month = dateObj.getMonth();
  const year = dateObj.getFullYear();
  return `${date} ${month} ${year}`
}
