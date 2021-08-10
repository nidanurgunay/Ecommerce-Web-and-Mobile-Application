import React, { Component } from 'react';
import './App.css';
import { CardLink, Button, Container, Form, Input, Row, Col } from 'reactstrap';
import tracker from '../src/api/tracker';
import { BiTrash } from 'react-icons/bi';
import Modal from 'react-awesome-modal';
import { Table } from 'react-bootstrap';


class user_info extends Component {
    constructor(props) {

        super(props);


        this.state = {
            email: "",
            address: "",
            hasAddress: true,
            loggedin: false,
            userId: "",
            visible: false,
            arr:[],
            prev:false,
        }
    }
    componentDidMount = async () => {
        var loggedin = localStorage.getItem('userId');
        var adressId = localStorage.getItem('adressId');
        this.setState({ email: localStorage.getItem('email') });
        this.setState({ userId: loggedin });
        console.log("userId: ", loggedin);
        console.log("adress ", adressId);

        try {

            if (adressId) {
                const response = await tracker.get("adress/" + adressId);

                if (response) {
                    console.log("res", response)
                    await this.setState({ hasAddress: true });
                    await this.setState({ address: response.data.adress });
                    await this.setState({ email: localStorage.getItem('email') });
                    await this.setState({ loggedin: true })

                }
                else {
                    await this.setState({ hasAddress: true });
                }

            }
            else {
                await this.setState({ hasAddress: false });

            }
        } catch (e) {
            console.log(e);
        }
    }

    handleDeleteAddress = async () => {

        var loggedin = localStorage.getItem('adressId');

        console.log("adressId,", loggedin, " userID", this.state.userId)
        const response = await tracker.delete('adress/' + loggedin + "/" + this.state.userId);
        console.log("handleDeleteAddress: ", response);

        await localStorage.removeItem("adressId");
        await this.setState({ hasAddress: false });
    }

    handleEditAddress = async () => {
   

        var adressId = localStorage.getItem('adressId');
        console.log(this.state.address)
        const response = await tracker.put('adress/' + adressId, { newadress: this.state.address });
        console.log("handleAddAddress: ", response);
        this.setState({ EditClicked: false });

    }

    handleaddAddress = async () => {
        console.log("adress", this.state.address)
        const response = await tracker.post('adress/', {
            user: this.state.userId,
            adress: this.state.address
        });
        console.log("handleaddAddress: ", response);
        localStorage.setItem("adressId", response.data._id)

        this.setState({ hasAddress: true })
    }

    handleAddress = async (e) => {
        console.log("e", e.target.value)
        this.setState({ address: e.target.value })
        console.log("adress state", this.state.address)
    }
    closeModal = () => {
        this.setState({
            visible: false
        });
    }

    handleprevOrder = async (e) => {
        var userId = localStorage.getItem("userId")
        console.log("userId", userId)
        const response = await tracker.get('/order/user/' + userId);
        console.log("responsee", response)
        var arr = [];
        if (response) {
            console.log("responsee", response)
            /////////////gelen arrayproducta göre görünüm ayarla

            for (var i = 0; i < response.data.length; i++) {
                console.log(response.data[i].basket)
                const res = await tracker.get('/basket/' + response.data[i].basket);
                console.log(res);
                const totalprice = res.data.productList.totalprice;
                var parray = [];
                for (var j = 0; j < res.data.productList.productArray.length; j++) {
                    const name = res.data.productList.productArray[j].name;
                    const price = res.data.productList.productArray[j].price;
                    const size = res.data.productList.productArray[j].size;
                    const q = res.data.productList.productArray[j].quantity;
                    const prod = [name, price, size, q]
                    console.log("q", q)
                    parray.push(prod);
                    console.log("prod", prod)

                };


                var item =
                    <div style={{marginTop:"20px"}}><Row><h3 >Your previous order {i+1} </h3></Row>
                        <Row><h4>Your have shopped ${totalprice} shoes in Friendyol</h4></Row>
                        <Row>
                        <Table striped responsive bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>name</th>
                                    <th>price</th>
                                    <th>size</th>
                                    <th>quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    parray.map((numList, i) => (
                                        <tr key={i}>
                                            {
                                                numList.map((num, j) =>
                                                    <td key={j}>{num}</td>
                                                )
                                            }
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                        </Row>
                    </div>



                arr.push(item);
            }
           
            await this.setState({arr:arr});
            await this.setState({prev:true});

        }
        else {

        }
    }
    render() {
        return (
            <>
                < div className="form" style={{ height: "max-content" }} >
                    < Container className="form-container" style={{ height: "max-content" }} >

                        < Row className="form" >
                            < Form >
                                <Row><h3>Adress: </h3></Row>
                                <Row><h5>Your email address: </h5>{this.state.email}</Row>

                                <Row>{this.state.hasAddress ?
                                    <div>
                                        <Col>


                                            <Row><h5>Your address: </h5>{this.state.address}</Row>
                                            <Row style={{ display: "block" }}><BiTrash onClick={this.handleDeleteAddress} /><CardLink onClick={(e) => this.setState({ visible: true })}>Edit</CardLink></Row>
                                            <Modal
                                                visible={this.state.visible}
                                                width="750"
                                                height="300"
                                                effect="fadeInUp"
                                                onClickAway={() => this.closeModal()}
                                            >
                                                <div >
                                                    <h1 style={{ justifyContent: "center", marginBottom: "20px", marginTop: "20px" }}>Please Enter your new address!</h1>
                                                    < Input type="textarea" onChange={(e) => this.handleAddress(e)} placeholder="Enter Your Address Here" />
                                                    <div className="row" style={{ justifyContent: "center", marginBottom: "10px" }}>
                                                        < Button style={{ width: "auto", marginTop: "20px", marginBottom: "10px" }} className="b-login"
                                                            onClick={this.handleEditAddress} color="secondary" block >Edit your address!</Button >
                                                    </div>
                                                    <a href="javascript:void(0);" onClick={() => this.closeModal()}>Close</a>
                                                </div>
                                            </Modal>

                                        </Col>
                                    </div>
                                    : <div>
                                        <Col>
                                            <Row><label style={{ justifyContent: "center" }}>You don't have any address!</label></Row>

                                            < Input type="textarea" style={{ padding: "3rem", margin: "0.5rem", justifyContent: "space-around" }} onChange={(e) => this.handleAddress(e)} placeholder="Enter Your Address Here" />
                                            <div className="row" style={{ justifyContent: "center" }}>
                                                < Button style={{ width: "auto" }} className="b-login"
                                                    onClick={this.handleaddAddress} color="secondary" block >Add an address!</Button >
                                            </div>
                                        </Col>
                                    </div>}</Row>

                                <Row><h3>Orders: </h3></Row>
                                < Button style={{ width: "auto" }} className="b-login"
                                    onClick={this.handleprevOrder} color="secondary" block >Check your previous invoices!</Button >
                        <div style={{marginTop:"10px"}}>
                           {
                                        this.state.prev? this.state.arr:null
                                    }
                                    </div>
                            </Form >
                                   
                        </Row >

                    </Container >

                </div >
            </>

        );
    }
}
export default user_info;