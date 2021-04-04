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

const App = () => {
  return (
    <ThemeProvider theme={Light}>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/buy" component={Buy} />
          <Route path="/sell" component={Sell} />
          <Route path="/agents" component={Agents} />
          <Route path="/account" component={Account} />
        </Switch>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
