import React, { Component } from "react";
import { Button, Container, Input, Row} from 'reactstrap';
import Modal from 'react-awesome-modal';
import tracker from '../src/api/tracker';
import 'react-credit-cards/es/styles-compiled.css';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import Payment from "./Payment";

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total_price: props.location.data,
            Email: "",
            hasemail: false,
            hasadress: false,
            loggedin: false,
            address: "",
            userId: "",
            cvc: '',
            expiry: '',
            focus: '',
            name: '',
            number: '',
            adressadded: false,
            payment: false,
            visible: false,
            visibleadress: false,
            Tabkey: "Address",
            alert: false,

            adres_id: "",
            newaddress:""
        };

        this.newaddress = this.newaddress.bind(this);
    }
    componentDidMount = async () => {
        const loggedin = localStorage.getItem('userId');
        const email = localStorage.getItem('email');
        console.log("userId: ", loggedin);
        console.log("this.props.location", this.props.location)
        console.log("state loggedin", this.state.loggedin)

        console.log("state total_price", this.state.total_price)
        //debugger;
        if (loggedin !== null && email !== null) {
            console.log("Logged in");
            await this.setState({ Email: email });
            await this.setState({ hasemail: true });
            await this.setState({ loggedin: true });
            await this.setState({ userId: loggedin })
            console.log(this.state.hasemail);
            console.log(this.state.loggedin);

            console.log(this.state.Email)

        }
        else if (loggedin === null && email !== null) {
            await this.setState({ Email: email })
            await this.setState({ hasemail: true })
            await this.setState({ loggedin: false })

        } else if (loggedin !== null && email === null) {
            await this.setState({ userId: loggedin })
            await this.setState({ hasemail: false })
            await this.setState({ loggedin: true })

        }
        else {
            await this.setState({ hasemail: false })
            await this.setState({ loggedin: false })
        }
        try {

            var address = localStorage.getItem("adressId");
            console.log("adress", address)
            if (address!=="null") {
                const response = await tracker.get("adress/" + address);
                if (response) {
                    console.log("res", response)
                    var ad = response.data.adress;
                    await this.setState({ hasadress: true });
                    await this.setState({ address: ad });

                }
                else {
                    await this.setState({ hasadress: false });
                }
            }
            else {
                await this.setState({ hasadress: false });
            }
        } catch (e) {
            console.log(e);
        }
        console.log("hasemail", this.state.hasemail)
        console.log("email", this.state.Email)
        console.log("hasaddress", this.state.hasadress)
        console.log("address", this.state.address)
    }


    handleInputFocus = (e) => {
        this.setState({ focus: e.target.name });
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;

        this.setState({ [name]: value });
    }

    handleAddress = async (e) => {
       // debugger;
        await this.setState({ address: e.target.value })

        var loggedin = localStorage.getItem('userId');
        var adressId = localStorage.getItem('adressId');
        console.log("handleaddress: ", this.state.address)
        console.log("ls_loggedin", loggedin);
        if (loggedin !== null) {
            const response = await tracker.put('/adress/' + adressId, { newadress: this.state.address });
        }
        /*else {
            const response = await tracker.post('/adress/', {

                adress: this.state.address
            });
            console.log("resp", response);
            const id = response.data._id;
            await this.setState({ adres_id: id });
            localStorage.setItem("adressId", this.state.adres_id);
        }
        */
        this.setState({ EditClicked: false });
       
    }
    handleAddressButton = async (e) => {
        const response = await tracker.post('adress/', {
            user: this.state.userId,
            adress: this.state.address
        });
        localStorage.setItem("adressId", response.data._id)
        this.setState({ adressadded: true })
        var result;
        // if (response) {
        //     result =
        //         <Alert severity="info">This is an info alert — check it out!</Alert>

        // }
        // return result;
    }
    handlePayment = async (e) => {

        console.log("paymenttayım")
        var adId = await localStorage.getItem("adressId")
        var basId = await localStorage.getItem("basket")
        if (basId) {

            const response = await tracker.post('/order', {
                email: this.state.Email,
                user: this.state.userId,
                address: adId,
                status: "ordered",
                basket: basId,
                creditCardNo: this.state.number,
                cvv: this.state.cvc,
                creditExpirationDate: this.state.expiry

            }, { headers: { "Content-Type": "application/json" } });
            console.log(response)
            if (response.data.message === "Order Email has been send") {
                //debugger;
                await localStorage.removeItem("basket")
                await this.setState({ payment: true })
                await this.setState({ visible: true })
            }
        } else {
            await this.setState({ visible: true })
        }


    }
    handleEmail = (e) => {
        this.setState({ email: e.target.value });

    }
    newaddress(event) {
        this.setState({ newaddress: event.target.value })
}
    handleChangeTab = async () => {
        debugger;
        localStorage.setItem("email", this.state.email);
        if (this.state.email !== "" && this.state.address !== "")
            this.props.history.push({
                pathname: "/Payment",
                data: this.state.total_price,
            });
        // this.setState({ Tabkey: "Payment" })
        else if (this.state.email !== "" && this.state.newaddress !== "") {
           
                const response = await tracker.post('/adress/', {

                    adress: this.state.newaddress
                });
                console.log("resp", response);
                const id = response.data._id;
                await this.setState({ adres_id: id });
                localStorage.setItem("adressId", this.state.adres_id);
          
            this.setState({ EditClicked: false });
       /*     this.props.history.push({
                pathname: "/Payment",
                data: this.state.total_price,
            });
            */
            < Switch >

                < Route path='/Payment' component={Payment} />

            </Switch >
        }
        else {

            this.setState({ alert: true })
        }

    }
    /*
    closeModal = () => {
        this.setState({
            visible: false
        });
    }
    closeModaladress = () => {
        this.setState({
            visibleadress: false
        });
    }
    */
    handleEditAddress = async () => {

        var loggedin = localStorage.getItem('userId');
        var adressId = localStorage.getItem('adressId');
        console.log(this.state.address)
        const response = await tracker.put('adress/' + adressId, { newadress: this.state.address });
        console.log("handleAddAddress: ", response);

    }

    render() {

       // const { data } = this.props.location;

        return (
            < div className="form" >

                < Container className="form-container" >

                
                            <div>Total Cost: ${this.state.total_price}</div>
                            {this.state.loggedin === true && this.state.hasemail === true && this.state.hasadress === true ?
                                <div>
                                    <Row style={{ justifyContent: "center", marginTop: "50px" }}><h5>Your email address:  {this.state.Email}</h5></Row>
                                    <Row style={{ justifyContent: "center" }}><h5>Your address:   </h5>{this.state.address}
                                    </Row> <Row style={{ justifyContent: "center" }}> < Button style={{ width: "auto", marginTop: "20px", marginBottom: "10px" }} className="b-login"
                                        onClick={(e) => this.setState({ visibleadress: true })} color="secondary" block >Edit your address!</Button ></Row>
                                    <Row style={{ justifyContent: "center" }}>< Button style={{ width: "auto", marginTop: "20px", marginBottom: "10px" }} className="b-login"
                                        onClick={this.handleChangeTab} color="secondary" block >Go To Payment</Button ></Row>


                                    <Modal
                                        visible={this.state.visibleadress}
                                        width="750"
                                        height="300"
                                        effect="fadeInUp"
                                        onClickAway={() => this.closeModaladress()}
                                    >
                                        <div >
                                            <h1 style={{ justifyContent: "center", marginBottom: "20px", marginTop: "20px" }}>Please Enter your new address!</h1>
                                            < Input type="textarea" onChange={(e) => this.handleAddress(e)} placeholder="Enter Your Address Here" />
                                            <div className="row" style={{ justifyContent: "center", marginBottom: "10px" }}>
                                                < Button style={{ width: "auto", marginTop: "20px", marginBottom: "10px" }} className="b-login"
                                                    onClick={this.handleEditAddress} color="secondary" block >Edit your address!</Button >
                                            </div>
                                            <a href="javascript:void(0);" onClick={() => this.closeModaladress()}>Close</a>
                                        </div>
                                    </Modal>
                                </div>
                                : null
                            }
                            {this.state.loggedin === true && this.state.hasemail === true && this.state.hasadress === false ?
                                <div>
                                    <Row><h5>Your email address </h5>{this.state.Email}</Row>
                                    < Input type="textarea" onChange={(e) => this.handleAddress(e)} placeholder="Enter Your Address Here" />
                                    < Button style={{ width: "auto", marginTop: "20px", marginBottom: "10px" }} className="b-login"
                                        onClick={this.handleAddressButton} color="secondary" block >Add your address!</Button >
                                    <Row style={{ justifyContent: "center" }}>< Button style={{ width: "auto", marginTop: "20px", marginBottom: "10px" }} className="b-login"
                                        onClick={this.handleChangeTab} color="secondary" block >Go To Payment</Button ></Row>
                                </div>
                                : null
                            }
                            {this.state.loggedin === false ?
                                <div>
                                    <Row><h5 style={{ marginLeft: "20px" }}>Please enter your email address </h5></Row>
                                    < Input style={{ marginBottom: "20px" }} type="text" onChange={(e) => this.handleEmail(e)} placeholder="Enter Your Email Here" />
                                    <Row><h5 style={{ marginLeft: "20px" }}>Please enter your address </h5></Row>

                            < Input type="text" style={{ marginBottom: "20px" }} value={this.state.newaddress} onChange={this.newaddress} placeholder="Enter Your Address Here" />
                                    < Button style={{ width: "auto", marginTop: "20px", marginBottom: "10px" }} className="b-login"
                                        onClick={this.handleChangeTab} color="secondary" block >Go To Payment</Button >
                                    {this.state.alert ? <div className="row" style={{ color: "#c29fdc", justifyContent: "space-evenly" }}><p>Please enter your email and/or your address</p></div> : null}
                                </div>
                                : null
                            }
         
                            {/* <Container>
                                <div id="PaymentForm">
                                    <div>Total Cost: ${data}</div>
                                    <Row style={{ padding: "2rem" }}>
                                        <Col>
                                            <Cards
                                                cvc={this.state.cvc}
                                                expiry={this.state.expiry}
                                                focused={this.state.focus}
                                                name={this.state.name}
                                                number={this.state.number}
                                            />
                                        </Col>
                                        <Col>
                                            <form>
                                                <input className="mb-4"
                                                    type="string"
                                                    name="name"
                                                    placeholder="Card Holder"
                                                    onChange={this.handleInputChange}
                                                    onFocus={this.handleInputFocus}
                                                />

                                                <input className="mb-4"
                                                    type="tel"
                                                    name="number"
                                                    placeholder="Card Number"
                                                    onChange={this.handleInputChange}
                                                    onFocus={this.handleInputFocus}
                                                />

                                                <input className="mb-4"
                                                    maxLength={4}
                                                    type="tel"
                                                    name="expiry"
                                                    placeholder="Expiry Date"
                                                    onChange={this.handleInputChange}
                                                    onFocus={this.handleInputFocus}
                                                />

                                                <input className="mb-4"
                                                    maxLength={3}
                                                    type="tel"
                                                    name="cvc"
                                                    placeholder="CVC"
                                                    onChange={this.handleInputChange}
                                                    onFocus={this.handleInputFocus}
                                                />

                                            </form>
                                        </Col>
                                    </Row>
                                    <CardLink > <Button onClick={(e) => this.handlePayment(e)} >Proceed Payment</Button > </CardLink>

                                    <Modal
                                        visible={this.state.visible}
                                        width="750"
                                        height="250"
                                        effect="fadeInUp"
                                        onClickAway={() => this.closeModal()}
                                    >
                                        <div >
                                            {this.state.payment === true ?
                                                <h1 style={{ justifyContent: "center", marginBottom: "50px", marginTop: "50px" }}>Your order has been recieved! <br></br>You can check your email for invoice!</h1>
                                                : <h1 style={{ justifyContent: "center", marginBottom: "20px", marginTop: "50px" }}>You haven't create a Basket!</h1>}
                                            <a href="javascript:void(0);" onClick={() => this.closeModal()}>Close</a>
                                        </div>
                                    </Modal>
                                </div>

                            </Container> */}

                </Container >
            </div >
        );
    }

}
export default Checkout;