import React, { Component } from 'react';
import './App.css';
import Table from 'react-bootstrap/Table';
import { BsBoxArrowInRight } from 'react-icons/bs';
import tracker from '../src/api/tracker';

class sm_invoices extends Component {
    constructor() {
        super()
        this.state = {
            orders: [],
            isinvoice: false,
            invoices: []
        }
    }

    componentDidMount = async () => {

        try {
            const response = await tracker.get("order/all");
            const orderarray = response.data;
            this.setState({ orders: orderarray });
            console.log("state", this.state.orders);

            if (this.state.orders.length !== 0) {
                var invoices = [];

                console.log(this.state.orders);
                var item;
                for (var i = 0; i < this.state.orders.length; i++) {
                    console.log(this.state.orders[i]);
                    const email = this.state.orders[i].email;
                    const status = this.state.orders[i].status;
                    const userid = this.state.orders[i].user;
                    const basketid = this.state.orders[i].basket;
                    const id = this.state.orders[i]._id;
                    const date = this.state.orders[i].createdAt;
                    // const res = await tracker.get('/basket/' + basketid);

                    // console.log(res);
                    // const totalprice = res.data.productList.totalprice;


                    console.log(id);
                    item = (
                        <tr>
                            <td>{id}</td>
                            <td>{date}</td>
                            <td>{email}</td>
                            <td>{userid}</td>
                            {/* <td>{totalprice}</td> */}
                            <td>{status}</td>
                            <td><BsBoxArrowInRight onClick={() => {
                                this.props.history.push("/sm_invoice_details/" + id);
                            }} /></td>
                        </tr>

                    );
                    console.log(item);
                    invoices.push(item);
                }

                await this.setState({ invoices: invoices });
                await this.setState({ isinvoice: true });



            }
        } catch (e) {
            console.log(e);
        }

    }
    status(e) {
        this.setState({ status: e.target.value });
        console.log(this.state.status);
    }

    render() {
        return (
            <div >
                <Table responsive striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <td>Invoice ID</td>
                            <td>Invoice Date</td>
                            <td>Email</td>
                            <td>User</td>
                            {/* <td>Total Price</td> */}
                            <td>Status</td>
                            <td>Details</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.isinvoice ? this.state.invoices : null}
                    </tbody>
                </Table>

            </div >


        );
    }
}
export default sm_invoices;