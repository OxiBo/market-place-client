const calcCartTotalPrice = (items) => {
  return items.reduce((sum, item) => {
    console.log(item)
    if (!item.product) return sum;
    return sum + item.count * (item.price / 100);
  }, 0);
};

export default calcCartTotalPrice;
