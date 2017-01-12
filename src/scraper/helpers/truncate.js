
const truncate = (string) => {
  if (string.length > 125)
    return string.substring(0, 125) + '...';
  else
    return string;
};

export default truncate;