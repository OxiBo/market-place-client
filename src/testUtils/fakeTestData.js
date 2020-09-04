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

export { fakeBuyer };
