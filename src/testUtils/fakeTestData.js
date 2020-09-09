import casual from "casual";

const fakeBuyer = () => ({
  __typename: "User",
  id: "4234",
  name: casual.name,
  email: casual.email,
  age: 21,
  image:
    "https://res.cloudinary.com/di0hg10hd/image/upload/v1597378083/sickfits/qekc7yfql14ligautxzq.jpg",
  orderItems: [],
  reviews: [],
  type: "BUYER",
});

const fakeOrderItems = () => [
  {
    __typename: "OrderItem",
    id: "123asd",
    image: "",
    count: 2,
    name: "fake order item 0",
    price: 10,
    product: {
      __typename: "Product",
      id: "456w",
      name: "fake order item 0",
      seller: {
        id: "zxcv",
        name: "EbayTest",
        __typename: "Seller",
      },
    },
    reviewed: null,
    order: {
      id: "asdfg",
      finishedAt: "2020-09-02T02:34:55.835Z",
      __typename: "Order",
    },
  },

  {
    __typename: "OrderItem",
    id: "123vbn",
    image: "",
    count: 3,
    name: "fake order item 1",
    price: 10,
    product: {
      __typename: "Product",
      id: "456",
      name: "fake order item 1",
      seller: {
        id: "zxcv123",
        name: "AmazonTest",
        __typename: "Seller",
      },
    },
    reviewed: null,
    order: {
      id: "asdfgsss",
      finishedAt: "2020-09-02T02:34:55.835Z",
      __typename: "Order",
    },
  },
];

export { fakeBuyer, fakeOrderItems };
