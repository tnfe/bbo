/**
 * is typeof type
 */
const isTypeof = (val, type) => {
  return (
    Object.prototype.toString
      .call(val)
      .slice(8, -1)
      .toLowerCase() === type
  );
};

export default isTypeof;
