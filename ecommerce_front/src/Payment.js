import React, { Component } from "react";
import { Button, Container, CardLink, Input, Row, Col } from 'reactstrap';
import Modal from 'react-awesome-modal';
import Alert from '@material-ui/lab/Alert';
import tracker from '../src/api/tracker';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { LocalSee, LocalSeeTwoTone } from "@material-ui/icons";

class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {

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
            alert: false
        }
    }
    componentDidMount = async () => {
        const loggedin = localStorage.getItem('userId');
        const email = localStorage.getItem('email');
        console.log("userId: ", loggedin);
        console.log("this.props.location", this.props.location)
        console.log("state loggedin", this.state.loggedin)
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
        console.log("email", this.state.Email)
        console.log("address", this.state.address)
    }
    handleInputFocus = (e) => {
        this.setState({ focus: e.target.name });
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;

        this.setState({ [name]: value });
    }
    handlePayment = async (e) => {
        debugger;
        console.log("paymenttayým")
        var adId = await localStorage.getItem("adressId")
        var basId = await localStorage.getItem("basket")
        var mail = await localStorage.getItem('email')
        if (basId) {
            if (this.state.loggedin === true) {
                const response = await tracker.post('/order', {
                    email: mail,
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
            }
            else {
                const response = await tracker.post('/order', {
                    email: mail,
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
            }

        } else {
            await this.setState({ visible: true })
        }
            


    }

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


    render() {
        return (
            < div className="form" >

                < Container className="form-container" >
                    <div id="PaymentForm">
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
                                        maxLength={16}
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

                </Container>
            </div>
        );
    }

}
export default Payment;