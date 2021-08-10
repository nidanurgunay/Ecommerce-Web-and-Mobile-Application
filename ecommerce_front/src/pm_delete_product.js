import React, { Component } from 'react';
import './App.css';
import { Button } from 'reactstrap';
import tracker from '../src/api/tracker';
import 'react-pro-sidebar/dist/css/styles.css';
import { BiPencil } from "react-icons/bi";
import Table from 'react-bootstrap/Table';

class pm_delete_product extends Component {
    constructor() {
        super()
        this.state = {
            products:[],
            needRerender:true
        }
    }
    componentDidMount = async () => {
        try {
            const response = await tracker.get("product/all");
            const arrayproduct = response.data;
            this.setState({ products: arrayproduct });
            console.log("state", this.state.products);
            this.handleProducts();

        } catch (e) {
            console.log(e);
        }

    }


    handleDelete = async (id) => {

        const response = await tracker.delete("product/" + id);
        console.log("delete response:", response);
        this.forceUpdate();
        var {needRerender} = this.state;
        console.log("reender", needRerender);
        needRerender=!needRerender;
        this.setState({needRerender:needRerender})
        this.handleProducts();
    }
    handleProducts = () => {
        var prod = [];
        if (this.state.products.length !== 0) {
            console.log(this.state.products);
            var item;

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
                console.log(id);
                item = (
                    <tr>
                        <td>{name}</td>
                        <td>{id}</td>
                        <td>{brand}</td>
                        <td>{category}</td>
                        <td>{gender}</td>
                        <td>{countInStock}</td>
                        <td>{size}</td>
                        <td>{price}</td>
                        <td>{newprice}</td>
                        <td className='notify' for='cb'><Button onClick={() => this.handleDelete(id)}>X</Button></td>
                        <td className='notify' for='cb'><Button onClick={() => {
                            this.props.history.push( "/pm_edit_product/"+ id);
                        }}><BiPencil/></Button></td>
                    </tr>

                );
                console.log(item);
                prod.push(item);

            }

            return prod;
        }
    }
    render() {
        return (
            <>
                <div>
                  
                    <Table responsive striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <td>Name</td>
                                <td>Id</td>
                                <td>Brand</td>
                                <td>Category</td>
                                <td>Gender</td>
                                <td>Count in Stock</td>
                                <td>Size</td>
                                <td>Price</td>
                                <td>New Price</td>
                                <td>Delete</td>
                                <td>Edit</td>
                            </tr>
                        </thead>
                        <tbody>

                            {this.handleProducts()}
                        </tbody>
                    </Table>

                    </div>
            </>
            );
    }

}
export default pm_delete_product;