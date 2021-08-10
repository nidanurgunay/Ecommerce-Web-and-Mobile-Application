import React, { Component } from 'react';
import './App.css';
import { Button, Container, Form, Input, Row, Col } from 'reactstrap';
import tracker from '../src/api/tracker';
import 'react-pro-sidebar/dist/css/styles.css';
import Select from 'react-select';
const options = [
    { label: "36", value: "36" },
    { label: "37", value: "37" },
    { label: "38", value: "38" },
    { label: "39", value: "39" },
    { label: "40", value: "40" },
    { label: "41", value: "41" },
    { label: "42", value: "42" },
    { label: "43", value: "43" },
    { label: "44", value: "44" },
    { label: "45", value: "45" },
];
const options2 = [
    { label: "female", value: "female" },
    { label: "male", value: "male" },
  
];
class pm_add_product extends Component {
    constructor() {
        super();
        this.state = {
            productManager: "",
            id: "",
            name: "",
            brand: "",
            category: "",
            description: "",
            price: 0,
            value: [],
            countInStock: 0,
            size: [],
            gender: "",
            selectedOption: null,
        }
    }
    handleSubmit = async () => {

        try {
            var pm = localStorage.getItem("isProductManager");
            if (pm === "true") {
                var userid = localStorage.getItem("userId");
                console.log(this.state.selectedOption)
                console.log(this.state.selectedOption2)
                const gender=this.state.selectedOption2.label;
                console.log("gender", gender)
                const sizes=[];
                for(var i =0; i<this.state.selectedOption.length ; i++)
                {
                    sizes.push(parseInt(this.state.selectedOption[i].value));
                }
                for(var i =0; i<sizes.length ; i++)
                {
                    console.log(sizes[i] );
                    console.log(typeof sizes[i]);
                }
                console.log(this.state.name)
                console.log(this.state.brand)
                console.log( this.state.category)

                console.log(this.state.description)
                console.log(this.state.price)

                console.log(this.state.countInStock)

                const response = await tracker.post("/product", {
                    productManager: userid, //product manager id al�nacak
                    name: this.state.name,
                    brand: this.state.brand,
                    category: this.state.category,
                    description: this.state.description,
                    price: this.state.price,
                    newprice:this.state.price,
                    countInStock: this.state.countInStock,
                    size: sizes, //array olmal�
                    gender: gender,


                })
            }


        } catch (e) { console.log("errorr",e); }



    }
    handleSize = (event) => {
        //this.setState({value: event.option});
        this.setState({ size: Array.from(event.target.selectedOptions, (item) => item.value) });
        console.log(this.state.size)
    }

    handleName = (e) => {
        this.setState(
            {name: e.target.value}
        );
    };   
    handledesc = (e) => {
        this.setState(
            {description: e.target.value}
        );
    };  
    handlebrand = (e) => {
        this.setState(
            {brand: e.target.value}
        );
    };  
    handlecat = (e) => {
        this.setState(
            {category: e.target.value}
        );
    };  
    handleprice = (e) => {
        this.setState(
            {price: e.target.value}
        );
    };  
    handlecount = (e) => {
        this.setState(
            {countInStock: e.target.value}
        );
    };  
    handleChange = selectedOption => {
        this.setState(
            { selectedOption },
            () => console.log(`Option selected:`, this.state.selectedOption)
        );
    };
    handleChange2 = selectedOption2 => {
        this.setState(
            { selectedOption2},
            () => console.log(`Option selected:`, this.state.selectedOption2)
        );
    };
    render() {
        const { selectedOption, selectedOption2 } = this.state;
        return (
            <>
               
                < div className="form" >

                    < Container className="form-container" >

                        < Row className="form" >
                            < Form >
                                < div className="login-check" >Add New Product</div ><br />
                                <Row><Col>
                                    {/* < Input className="mb-4" type="text" onChange={this.state.id} placeholder="Enter product id" /> */}
                                    <Select
                                            
                                            value={selectedOption2}
                                            onChange={this.handleChange2}
                                            options={options2}
                                        />
                                    < Input className="mb-4" style={{marginTop:"25px"}}type="text" onChange={ (e) => this.handleName(e)} placeholder="Enter product name" />
                                    < Input className="mb-4" type="text" onChange={ (e) => this.handlebrand(e)}  placeholder="Enter brand" /> 

                                   

                                      </Col><Col>
                                        < Input className="mb-4" type="text" onChange={ (e) => this.handledesc(e)}  placeholder="Enter description" />
                                        < Input className="mb-4" type="tel" onChange={ (e) => this.handleprice(e)}  placeholder="Enter price" /> </Col><Col>
                                        <Select
                                            isMulti={true}
                                            value={selectedOption}
                                            onChange={this.handleChange}
                                            options={options}
                                        />
                                        < Input className="mb-4"style={{marginTop:"25px"}} type="tel" onChange={ (e) => this.handlecount(e)}  placeholder="Enter count in stock" />
                                        < Input className="mb-4" type="text" onChange={ (e) => this.handlecat(e)}  placeholder="Enter category" />

                                      

                                    </Col>  </Row>
                                < Button className="b-login" style={{marginTop:"40px"}} onClick={this.handleSubmit} color="secondary" block >Add</Button >



                            </Form >

                        </Row >

                    </Container >

                </div >
            </>

        );
    }
}
export default pm_add_product;