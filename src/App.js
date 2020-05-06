import React, { useEffect, lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// import "./styles.css";
import { GlobalStyle } from "./global.styles";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

// import ShopPage from "./pages/shop/shop.component";
// import CheckOutPage from "./pages/checkout/checkout.component";
import Header from "./components/header/header.component";
// import SignInAndSignUp from "./pages/sign-in-and-sign-out/sign-in-sign-out.component";

import { selectCurrentUser } from "./redux/user/user.selectors";
import { checkUserSession } from "./redux/user/user.actions";
import Spinner from "./components/spinner/spinner.componet";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";

// import HomePage from "./pages/homepage/homepage.component";
const HomePage = lazy(() => import("./pages/homepage/homepage.component"));

const ShopPage = lazy(() => import("./pages/shop/shop.component"));

const CheckOutPage = lazy(() => import("./pages/checkout/checkout.component"));

const SignInAndSignUp = lazy(() =>
  import("./pages/sign-in-and-sign-out/sign-in-sign-out.component")
);

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);
  return (
    <div>
      <GlobalStyle />
      <Header />
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Route exact path="/" component={HomePage} />
            <Route path="/shop" component={ShopPage} />
            <Route exact path="/checkout" component={CheckOutPage} />
            <Route
              exact
              path="/signin"
              render={() =>
                currentUser ? <Redirect to="/" /> : <SignInAndSignUp />
              }
            />
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
