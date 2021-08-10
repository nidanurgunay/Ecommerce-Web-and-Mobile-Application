import './App.css';
import tracker from '../src/api/tracker';
import Table from 'react-bootstrap/Table';
import 'react-pro-sidebar/dist/css/styles.css';
import { FaCheckCircle } from "react-icons/fa";
import { IconContext } from "react-icons";
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Input } from '@material-ui/core';

class sm_campaigns extends Component {
    constructor() {
        super()
        this.state = {
            products: [],
            updated_prices: [],
            price: 0,
            arr: [],
            change:false
        }
    }
    handleItemChanged(i, event) {
        debugger;
        var updated_prices = this.state.updated_prices;
        updated_prices[i] = event.target.value;

        this.setState({
            updated_prices: updated_prices
        });
    }
    componentDidMount = async () => {
        try {
            debugger;
            const response = await tracker.get("product/all");
            const arrayproduct = response.data;
            this.setState({ products: arrayproduct });
            console.log("state", this.state.products);

            var prod = [];
            var arr = [];
            if (this.state.products.length !== 0) {
                console.log(this.state.products);
                var item;
                var parray = [];
                var pricelist = [];
                for (var i = 0; i < this.state.products.length; i++) {
                    const newprice = this.state.products[i].newprice;
                    pricelist.push(newprice);
                }
                await this.setState({ updated_prices: pricelist });

                for (var i = 0; i < this.state.products.length; i++) {
                    console.log(this.state.products[i]);
                    const id = this.state.products[i]._id;
                    const brand = this.state.products[i].brand;
                    const category = this.state.products[i].category;
                    const countInStock = this.state.products[i].countInStock;
                    const size = this.state.products[i].size;
                    const gender = this.state.products[i].gender;
                    const newprice = this.state.products[i].newprice;
                    const price = this.state.products[i].price;
                    const name = this.state.products[i].name;
                    const description = this.state.products[i].description;
                    const rate = this.state.products[i].rate;
                    const img = this.state.products[i].image;
                    var context = this; 
                    const index = i;



                    var update = (< Input type="tel" style={{ color: "white" }} onChange={context.handleItemChanged.bind(context, index)} placeholder={newprice} />)
                    const save = (<IconContext.Provider
                        value={{ color: 'rgba(195, 159, 220, 0.90)', size: '20px', lightingColor: "white" }}
                    ><FaCheckCircle style={{ cursor: "pointer" }} onClick={() => { this.handleUpdate(id, name, size, category, brand, description, gender, newprice, index, rate, price, countInStock, img) }} />   </IconContext.Provider>)
                    const prod = [name, id, brand, category,gender, countInStock, size, price, newprice, update, save]
                    console.log(id);
                    console.log(prod);
                    parray.push(prod);
                };

                var item = (
                    <div style={{ marginTop: "20px" }}>

                       
                            <Table striped responsive bordered hover variant="dark">

                                <thead>
                                    <td>Name</td>
                                    <td>Id</td>
                                    <td>Brand</td>
                                    <td>Category</td>
                                    <td>Gender</td>
                                    <td>Count in Stock</td>
                                    <td>Size</td>
                                    <td>Price</td>
                                    <td>New Price</td>
                                    <td>Update Price</td>
                                    <td>Save</td>
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
               
                    </div>

                );

                arr.push(item);
                await this.setState({ arr: arr });
                await this.setState({ change: true })


            }


        } catch (e) {
            console.log(e);
        }

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


    handleUpdate = async (id, name, size, category, brand, description, gender, newprice, index, rate, price, countInStock, img) => {
        debugger;
        try {
            console.log("handleUpdate");
            console.log("updated:", this.state.updated_prices[index])
            if (this.state.updated_prices[index] !== newprice) {
                const np = this.state.updated_prices[index];
                const response = await tracker.put("product/sm/" + id, {
                    
                    newprice:np,

                })

                console.log(response);
               
            }
            this.reloadPage();
        } catch (e) {
            console.log(e);
        }

    }
  

    render() {
        return (

            <>

                {this.reloadPage()}
                {this.state.change ? this.state.arr : null}
            </>
        );
    }

}
export default sm_campaigns;