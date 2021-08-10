import React, { Component } from 'react';
import './App.css';
import Table from 'react-bootstrap/Table';
import tracker from '../src/api/tracker';
import { Row, CardLink } from 'reactstrap';
class sm_invoice_details extends Component {
    constructor() {
        super()
        this.state = {
            id: "",
            arr: [],
            oldstatus: "",
            details: false,
            newstatus:""
        }
        this.newstatus = this.newstatus.bind(this);
    }

    newstatus(event) {
        this.setState({ newstatus: event.target.value });
       
    }
    handleChange = async (id) => {

        const oldstatus = this.state.oldstatus;
        const newstatus = this.state.newstatus;
        console.log("newstatus: ", newstatus);
        console.log("oldstatus: ", oldstatus);
        if (oldstatus !== newstatus) {
            if (newstatus === "Cancelled") {
                const response = await tracker.delete("order/" + id);
                console.log("delete response:", response);
                this.props.history.push("/sm_invoices");
            }
            else {
                const response = await tracker.put("order/" + id, {
                    status: newstatus,
                });
                console.log("status update response:", response);
                window.location.reload(false);
            }

            
        }
        else {

        }
    

    }

    componentDidMount = async (e) => {
        var id = this.props.match.params.id;
        this.setState({ id: id });
        const response = await tracker.get('/order/' + id);
        console.log("responsee", response)
        const email = response.data.email;
        const status = response.data.status;
        await this.setState({ oldstatus: status, newstatus:status });
        const userid = response.data.user;
        const address = response.data.address;
        const date = response.data.createdAt;
        var arr=[];
        if (response) {
            console.log("responsee", response)

            console.log(response.data)
            console.log(response.data.basket)
            const res = await tracker.get('/basket/' + response.data.basket);
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


            var item = (
                <div style={{ marginTop: "20px" }}>

                    <Row>
                        <Table striped responsive bordered hover variant="dark">
                            
                            <thead>
                                <tr><p>Invoice ID #{this.state.id}</p></tr>
                                <tr><p>User: {userid}</p></tr>
                                <tr><p>Date: {date} </p></tr>
                                <tr><p>Total Price: ${totalprice} </p></tr>
                                <tr><p>Email: {email} </p></tr>
                                <tr><p>Address: {address} </p></tr>
                                <tr>Status: <div className='Selectopt'>
                                    <select value={this.state.newstatus}  onChange={this.newstatus} className='Selectopt'>
                                        <option disabled value="Default">Update Status</option>
                                        <option value="Cancelled">Cancelled</option>
                                        <option value="ordered">Ordered</option>
                                        <option value="on the way">On the way</option>
                                        <option value="shipped">Shipped</option>
                                    </select>
                                </div></tr>
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
                    <CardLink
                        style={{ margin: "2vh", justifyContent: "center" }}
                    >   <button class="mb-4" onClick={() => { this.handleChange(id) }}>Save</button></CardLink>
                </div>
                
                );
              
            arr.push(item);
            await this.setState({ arr: arr });
            await this.setState({details: true})
         


        }
        else {

        }
    }

    render() {
        return (
            <>
                {this.state.details ? this.state.arr : null}
                </>
            
            );
    }
}
export default sm_invoice_details;