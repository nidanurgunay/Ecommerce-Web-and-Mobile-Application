import React from "react";
import PageFooter from "./Footer";
import Header from "./Header";
import "./App.css";
import createHistory from 'history/createBrowserHistory';
import { Component} from 'react';

import user_info from "./user_info";
import auth from "./auth";
import Login from "./Login";
import Homepage from "./Homepage";
import Reg from "./register";
import Checkout from "./Checkout";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import womenHeels from "./womenHeels";
import womenBoots from "./womenBoots";
import womenSneakers from "./womenSneakers";
import menBoots from "./menBoots";
import menSneakers from "./menSneakers";
import menClassics from "./menClassics";
import Basket from "./basket";
import womenAllCategories from "./womenAllCategories";
import menAllCategories from "./menAllCategories";
import changePassword from "./changePassword";
import product from "./product";
import product_manager from "./product_manager";
import product_manager_comments from "./product_manager_comments";
import Search from "./search"
import pm_add_product from "./pm_add_product";
import pm_delete_product from "./pm_delete_product";
import pm_edit_product from "./pm_edit_product";
import sm_invoices from "./sm_invoices";
import sm_campaigns from "./sm_campaigns";
import sales_manager from "./sales_manager";
import sm_invoice_details from "./sm_invoice_details";
import about_us from "./about_us";
import Payment from "./Payment";
const history = createHistory();

class App extends Component {

  constructor() {

    super();
    this.state = {
      loggedin: false,
    }

  }
  handleLogin = () => {
    var email = localStorage.getItem('email');

    if (email !== null) {
      this.setState({ loggedin: true })
    }
    else {

      this.setState({ loggedin: false })

    }


  }
  handleLogout = () => {
    this.setState({ loggedin: false });

  }
  componentDidMount = () => {
    var email = localStorage.getItem('email');

    if (email !== null) {
      this.setState({ loggedin: true })
    }
    else {

      this.setState({ loggedin: false })

    }
  }

  render() {

    return (
      <Router history={history} >
        <Header handleLogin={this.state.loggedin} />
        <div className="container">
          <br />

          <Switch>
            <Route exact path="/Login" component={Login} handleLogin={this.handleLogin} />
            <Route path="/Homepage" component={Homepage} />


            <Route path="/register" component={Reg} />
            <Route path="/auth" component={auth} />
            <Route path="/womenHeels" component={womenHeels} />
            <Route path="/womenBoots" component={womenBoots} />
            <Route path="/womenSneakers" component={womenSneakers} />
            <Route path="/menClassics" component={menClassics} />
            <Route path="/menBoots" component={menBoots} />
            <Route path="/menSneakers" component={menSneakers} />
            <Route path="/menAll" component={menAllCategories} />
            <Route path="/womenAll" component={womenAllCategories} />
            <Route path="/basket" component={Basket} exact />
            <Route path="/product/:id/:ar/:num" component={product} exact />
            <Route path="/basket/:id" component={Basket} exact />
            <Route path="/Checkout" component={Checkout} />
            <Route path="/changePassword" component={changePassword} />
            <Route path="/user_info" component={user_info} />
            <Route path="/product_manager" component={product_manager} />
            <Route path="/product_manager_comments" component={product_manager_comments} />
            <Route path="/pm_add_product" component={pm_add_product} />
            <Route path="/pm_delete_product" component={pm_delete_product} />
            <Route path="/pm_edit_product/:id" component={pm_edit_product} exact />
            <Route path="/sm_invoices" component={sm_invoices} />
            <Route path="/sales_manager" component={sales_manager} />
            <Route path="/sm_campaigns" component={sm_campaigns} />
            <Route path="/about_us" component={about_us} />
            <Route path="/Payment" component={Payment} />


            <Route path="/search/:what" component={Search} exact />
            <Route path="/sm_invoice_details/:id" component={sm_invoice_details} exact />
            <Route path="/">
              <Redirect to="/Homepage" />
            </Route>
          </Switch>
       
        </div>
        <PageFooter />
      </Router>
    );
  }
}

export default App;
