import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import React, { Component } from 'react';
import Logo from './mylogo.png';
import { withRouter } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
var header;

class Header extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: navigation.getParam('otherParam', 'A Nested Details Screen'),
        };
    };
    constructor() {
        super();
        this.state = {
            loggedin: false,
            needRerender: false,
            email: "",
            localstorage: "",
            Header: header,
            salesManager: false,
            productManager: false,
            searchPlaceholder: "",
            validSearch: false,
            search: "",

        }
    }
    logout = () => {
        localStorage.clear('email');
        localStorage.clear('isSalesManager');
        localStorage.clear('isProductManager');
        this.props.history.push("/Homepage");
        this.setState({ loggedin: false, email: "", salesManager: false, productManager: false });
    }
    reloadPage = () => {
        // The last "domLoading" Time //
        var currentDocumentTimestamp =
            new Date(performance.timing.domLoading).getTime();
        // Current Time //
        var now = Date.now();
        // Ten Seconds //
        var tenSec = 10 * 1000;
        // Plus Ten Seconds //
        var plusTenSec = currentDocumentTimestamp + tenSec;
        if (now > plusTenSec) {
            window.location.reload();
        } else { }
    }

    componentDidMount = async () => {
        var email = localStorage.getItem('email');
        console.log("email: ", email);

        const loggedin = localStorage.getItem('userId');

        if (loggedin !== null) {
            console.log("Logged in as ", email);
            await this.setState({ loggedin: true, email: email })

        }
        else {

            await this.setState({ loggedin: false })

        }
        const sm = localStorage.getItem('isSalesManager');

        if (sm === "true") {
            await this.setState({ salesManager: true });
            console.log("state sm", this.state.salesManager)
        }
        else {
            await this.setState({ salesManager: false });
        }

        console.log("sm", sm)
        var pm = localStorage.getItem('isProductManager');

        if (pm === "true") {

            await this.setState({ productManager: true });
            if (sm === "true") {
                await this.setState({ salesManager: true });
                console.log("state sm", this.state.salesManager)
            }
            else {
                await this.setState({ salesManager: false });
            }


        };
    }


    handleSearch = async (e) => {
        console.log("handlesearch", e.target.value);
        this.setState({ search: e.target.value });
        console.log(this.state.search)
        if (this.state.search.length < 1) {
            this.setState({ searchPlaceholder: "Please enter at least 2 character" })
            this.setState({ validSearch: false })
            console.log("state", this.state.search)
            console.log("state", this.state.searchPlaceholder)
            console.log("handle valid", this.state.validSearch)
        }

        else {
            this.setState({ validSearch: true })
            console.log("handle valid", this.state.validSearch)
        }

    }
    handleSearchClick = async () => {
        console.log("click", this.state.search)
        console.log("click valid", this.state.validSearch)
        if (this.state.validSearch === true) {
            console.log("searchh");
            this.props.history.push("/search/" + this.state.search);


            var { needRerender } = this.state;

            console.log("reender", needRerender);
            needRerender = !needRerender;
            console.log("reender", needRerender);
            this.setState({ needRerender: needRerender })
        }
        else {
            console.log("else")
        }

    }
    render() {
        return (

            <>
                {this.reloadPage()}
                {!this.state.productManager && !this.state.salesManager ?
                    <>

                        {this.state.loggedin ?
                            <>
                                < Navbar collapseOnSelect expand="lg" bg="light" variant="light" {...this.props}>
                                    <Navbar.Brand href="/Homepage"><img src={Logo} width="48px" heght="36px" /></Navbar.Brand>
                                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                    <Navbar.Collapse id="responsive-navbar-nav">
                                      
                                        <Nav className="mr-auto">  <h6>{"Welcome, "+this.state.email + " "}</h6></Nav>
                                        <Nav>
                                            <form class="form-inline my-2 my-lg-0">
                                                <input class="form-control mr-sm-2" onChange={(e) => this.handleSearch(e)} type="search" placeholder="Search" aria-label="Search" />
                                                <button class="btn btn-outline-success my-2 my-sm-0" onClick={() => this.handleSearchClick()} color="text-warning" type="button" >Search</button>
                                            </form>



                                            <NavDropdown title="Account" id="collasible-nav-dropdown">
                                                <NavDropdown.Item href="/user_info">User Information</NavDropdown.Item>
                                        
                                                <NavDropdown.Item href="/changePassword">Change Password</NavDropdown.Item>
                                                <NavDropdown.Item href="#" onClick={this.logout}>Log Out</NavDropdown.Item>
                                            </NavDropdown>



                                            <Nav.Link href="/basket">Basket</Nav.Link>
                                        </Nav>
                                    </Navbar.Collapse>
                                </Navbar>
                                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                                    <Navbar.Brand href="/Homepage">FRIENDYOL</Navbar.Brand>
                                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                    <Navbar.Collapse id="responsive-navbar-nav">
                                        <Nav className="mr-auto">

                                            <NavDropdown title="Woman" id="collasible-nav-dropdown">
                                                <NavDropdown.Item href="/womenHeels">Heels</NavDropdown.Item>
                                                <NavDropdown.Item href="/womenSneakers">Sneakers</NavDropdown.Item>
                                                <NavDropdown.Item href="/womenBoots">Boots</NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item href="/womenAll">All Products</NavDropdown.Item>
                                            </NavDropdown>
                                            <NavDropdown title="Man" id="collasible-nav-dropdown">
                                                <NavDropdown.Item href="/menClassics">Classics</NavDropdown.Item>
                                                <NavDropdown.Item href="/menSneakers">Sneakers</NavDropdown.Item>
                                                <NavDropdown.Item href="/menBoots">Boots</NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item href="/menAll">All Products</NavDropdown.Item>
                                            </NavDropdown>




                                        </Nav>

                                    </Navbar.Collapse>
                                </Navbar> </> : <>
                                < Navbar collapseOnSelect expand="lg" bg="light" variant="light" {...this.props}>
                                    <Navbar.Brand href="/Homepage"><img src={Logo} width="48px" heght="36px" /></Navbar.Brand>
                                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                    <Navbar.Collapse id="responsive-navbar-nav">
                                        <Nav className="mr-auto">
                                            <Nav.Link href="/Login">Login</Nav.Link>
                                            <Nav.Link href="/register">Register</Nav.Link>

                                        </Nav>
                                        <Nav >
                                            <form class="form-inline my-2 my-lg-0">
                                                <input class="form-control mr-sm-2" onChange={(e) => this.handleSearch(e)} type="search" placeholder="Search" aria-label="Search" />
                                                <button class="btn btn-outline-success my-2 my-sm-0" onClick={() => this.handleSearchClick()} color="text-warning" type="button" >Search</button>
                                            </form>



                                            <NavDropdown title="Account" id="collasible-nav-dropdown">  <NavDropdown.Item href="/Login">Login</NavDropdown.Item>
                                                <NavDropdown.Item href="/register">Register</NavDropdown.Item> </NavDropdown>





                                            <Nav.Link href="/basket">Basket</Nav.Link>
                                        </Nav>
                                    </Navbar.Collapse>
                                </Navbar>
                                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                                    <Navbar.Brand href="/Homepage">FRIENDYOL</Navbar.Brand>
                                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                    <Navbar.Collapse id="responsive-navbar-nav">
                                        <Nav className="mr-auto" >

                                            <NavDropdown title="Woman" id="collasible-nav-dropdown">
                                                <NavDropdown.Item href="/womenHeels">Heels</NavDropdown.Item>
                                                <NavDropdown.Item href="/womenSneakers">Sneakers</NavDropdown.Item>
                                                <NavDropdown.Item href="/womenBoots">Boots</NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item href="/womenAll">All Products</NavDropdown.Item>
                                            </NavDropdown>
                                            <NavDropdown title="Man" id="collasible-nav-dropdown">
                                                <NavDropdown.Item href="/menClassics">Classics</NavDropdown.Item>
                                                <NavDropdown.Item href="/menSneakers">Sneakers</NavDropdown.Item>
                                                <NavDropdown.Item href="/menBoots">Boots</NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item href="/menAll">All Products</NavDropdown.Item>
                                            </NavDropdown>




                                        </Nav>

                                    </Navbar.Collapse>
                                </Navbar> </>}
                    </> : <></>}
                {this.state.productManager ?
                    <>
                        < Navbar collapseOnSelect expand="lg" bg="light" variant="light" {...this.props}>
                            <Navbar.Brand href="/Homepage"><img src={Logo} width="48px" heght="36px" /></Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="mr-auto">

                                    <NavDropdown title="Account" id="collasible-nav-dropdown">
                                        <NavDropdown.Item href="/user_info">User Information</NavDropdown.Item>
                                        <NavDropdown.Item href="/changePassword">Change Password</NavDropdown.Item>
                                        <NavDropdown.Item href="#" onClick={this.logout}>Log Out</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="/pm_add_product">Add Product</NavDropdown.Item >
                                        <NavDropdown.Item href="/pm_delete_product">Edit Product</NavDropdown.Item>
                                        <NavDropdown.Item href="/product_manager_comments">Comments</NavDropdown.Item>
                                    </NavDropdown>


                                    <Nav.Link href="/basket">Basket</Nav.Link>
                                </Nav>
                                <Nav className="mr-auto">

                                    <form class="form-inline my-2 my-lg-0">
                                        <input class="form-control mr-sm-2" onChange={(e) => this.handleSearch(e)} type="search" placeholder="Search" aria-label="Search" />
                                        <button class="btn btn-outline-success my-2 my-sm-0" onClick={() => this.handleSearchClick()} color="text-warning" type="button" >Search</button>
                                    </form>
                                </Nav>


                                <Nav class="ml-auto">  <h6>{"Product Manager: " + this.state.email + "     "}</h6></Nav>
                            </Navbar.Collapse>
                        </Navbar>
                        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                            <Navbar.Brand href="/Homepage">FRIENDYOL</Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="mr-auto">

                                    <NavDropdown title="Woman" id="collasible-nav-dropdown">
                                        <NavDropdown.Item href="/womenHeels">Heels</NavDropdown.Item>
                                        <NavDropdown.Item href="/womenSneakers">Sneakers</NavDropdown.Item>
                                        <NavDropdown.Item href="/womenBoots">Boots</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="/womenAll">All Products</NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown title="Man" id="collasible-nav-dropdown">
                                        <NavDropdown.Item href="/menClassics">Classics</NavDropdown.Item>
                                        <NavDropdown.Item href="/menSneakers">Sneakers</NavDropdown.Item>
                                        <NavDropdown.Item href="/menBoots">Boots</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="/menAll">All Products</NavDropdown.Item>
                                    </NavDropdown>




                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </> : <></>
                }
                {
                    this.state.salesManager ?
                        <>
                            < Navbar collapseOnSelect expand="lg" bg="light" variant="light" {...this.props}>
                                <Navbar.Brand href="/Homepage"><img src={Logo} width="48px" heght="36px" /></Navbar.Brand>
                                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                <Navbar.Collapse id="responsive-navbar-nav">



                                    <Nav className="mr-auto">


                                        <NavDropdown title="Account" id="collasible-nav-dropdown">
                                            <NavDropdown.Item href="/user_info">User Information</NavDropdown.Item>
                                            <NavDropdown.Item href="/changePassword">Change Password</NavDropdown.Item>
                                            <NavDropdown.Item href="#" onClick={this.logout}>Log Out</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="/sales_manager">Sale Charts</NavDropdown.Item >
                                            <NavDropdown.Item href="/sm_campaigns">Campaigns</NavDropdown.Item>

                                            <NavDropdown.Item href="/sm_invoices">All Invoices</NavDropdown.Item>
                                        </NavDropdown>


                                        <Nav.Link href="/basket">Basket</Nav.Link>
                                    </Nav>
                                    <Nav className="mr-auto">
                                        <form class="form-inline my-2 my-lg-0">
                                            <input class="form-control mr-sm-2" onChange={(e) => this.handleSearch(e)} type="search" placeholder="Search" aria-label="Search" />
                                            <button class="btn btn-outline-success my-2 my-sm-0" onClick={() => this.handleSearchClick()} color="text-warning" type="button" >Search</button>
                                        </form>
                                    </Nav>
                                    <Nav class="ml-auto">  <h6>{"Sales Manager: " + this.state.email + "     "}</h6></Nav>
                                </Navbar.Collapse>
                            </Navbar>
                            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                                <Navbar.Brand href="/Homepage">FRIENDYOL</Navbar.Brand>
                                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                <Navbar.Collapse id="responsive-navbar-nav">
                                    <Nav className="mr-auto">

                                        <NavDropdown title="Woman" id="collasible-nav-dropdown">
                                            <NavDropdown.Item href="/womenHeels">Heels</NavDropdown.Item>
                                            <NavDropdown.Item href="/womenSneakers">Sneakers</NavDropdown.Item>
                                            <NavDropdown.Item href="/womenBoots">Boots</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="/womenAll">All Products</NavDropdown.Item>
                                        </NavDropdown>
                                        <NavDropdown title="Man" id="collasible-nav-dropdown">
                                            <NavDropdown.Item href="/menClassics">Classics</NavDropdown.Item>
                                            <NavDropdown.Item href="/menSneakers">Sneakers</NavDropdown.Item>
                                            <NavDropdown.Item href="/menBoots">Boots</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="/menAll">All Products</NavDropdown.Item>
                                        </NavDropdown>




                                    </Nav>

                                </Navbar.Collapse>
                            </Navbar>
                        </> : <></>





                }

            </>
        );

    }
}

export default withRouter(Header);