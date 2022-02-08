const filterOutFalsy = (items) => {
   return items.filter((item) => Boolean(item));
};

module.exports = { filterOutFalsy };
