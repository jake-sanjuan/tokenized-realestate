import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import NavBar from "./components/NavBar";
import Buy from "./pages/Buy";
import Home from "./pages/Home";
import Sell from "./pages/Sell";
import Agents from "./pages/Agents";
import Account from "./pages/Account";
import Light from "./styles/theme";
import Footer from "./components/Footer";
import PropertyListing from "./pages/PropertyListing";
import Tokenize from "./pages/Tokenize";
import RegisterAsSeller from "./pages/RegisterAsSeller";
import Instructions from "./pages/Instructions";

const App = ({ client }) => {
  return (
    <ThemeProvider theme={Light}>
      <Router>
        <NavBar client={client} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/buy" component={Buy} />
          <Route path="/buy/property/:id" component={PropertyListing} />
          <Route path="/sell" component={Sell} />
          <Route path="/agents" component={Agents} />
          <Route path="/account" component={Account} />
          <Route path="/tokenize" component={Tokenize} />
          <Route exact path="/register/seller" component={RegisterAsSeller} />
          <Route exact path="/claim" component={Instructions} />
        </Switch>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
