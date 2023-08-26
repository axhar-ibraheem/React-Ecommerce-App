import Home from "./Pages/Home";
import About from "./Pages/About";
import ContactUs from "./Pages/ContactUs";
import { Route, Switch, Redirect } from "react-router-dom/cjs/react-router-dom";
import Mainnav from "./components/Layout/Mainnav";
import ProductDetail from "./Pages/ProductDetail";
import { useState, useContext, useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Products from "./components/Layout/Products";
import ProdContext from "./store/prodContext";
import Auth from "./Pages/Auth";

let initialRender = true;

const App = () => {
  const [showCart, setShowCart] = useState(false);
  const ctx = useContext(ProdContext);
  const { products, totalAmount } = ctx;
  const useremail = ctx.email?.replace(/[.]/g, "") ?? undefined;
  const cart = {
    products: products,
    totalAmount: totalAmount,
  };
  const showCartHandler = () => {
    setShowCart(true);
  };
  const hideCartHandler = () => {
    setShowCart(false);
  };
  const userLoggedIn = !!ctx.idToken;

  useEffect(() => {
    async function sendData() {
      await fetch(
        `https://ecommerce-app-a6739-default-rtdb.firebaseio.com/cart${useremail}.json`,
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
    }

    if (initialRender) {
      initialRender = false;
      return;
    }
    if (ctx.changed) {
      sendData();
    }
  // eslint-disable-next-line
  }, [products]);

  return (
    <>
      <Mainnav onShow={showCartHandler} />
      {<Cart onShow={showCart} onHide={hideCartHandler} />}
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home" exact>
          <Home />
        </Route>
        <Route path="/products" exact>
          {userLoggedIn && <Products></Products>}
          {!userLoggedIn && <Redirect to="/auth"></Redirect>}
        </Route>

        <Route path="/about">
          <About></About>
        </Route>
        <Route path="/contact">
          <ContactUs />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        {userLoggedIn && (
          <Route path="/products/:prodId">
            <ProductDetail />
          </Route>
        )}
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </>
  );
};
export default App;
