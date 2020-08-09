const calcCartTotalPrice = (items) => {
  return items.reduce((sum, item) => {
    console.log(item)
    if (!item.product) return sum;
    return sum + item.count * item.product.price;
  }, 0);
};

export default calcCartTotalPrice;
