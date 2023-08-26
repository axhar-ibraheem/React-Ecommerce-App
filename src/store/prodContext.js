import React from "react";

const ProdContext = React.createContext({
  products: [],
  totalAmount: 0,
  idToken: "",
  login: () => {},
  logout: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  apiKey: "",
  email: "",
  changed: "",
});

export default ProdContext;
