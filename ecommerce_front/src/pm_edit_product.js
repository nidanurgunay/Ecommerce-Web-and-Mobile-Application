import React, { Component } from 'react';
import './App.css';
import tracker from '../src/api/tracker';
import 'react-pro-sidebar/dist/css/styles.css';
import AliceCarousel from "react-alice-carousel";
import Select from 'react-select';
import { Button, Container, Form, Input, Row, Col } from 'reactstrap';

const options = [
    { label: "Boots", value: "Boots" },
    { label: "Sneakers", value: "Sneakers" },
    { label: "Classics", value: "Classics" },
    { label: "Heels", value: "Heels" },
];
const options2 = [
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
const options3 = [
    { label: "female", value: "female" },
    { label: "male", value: "male" }
];

class pm_edit_product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:"",
            name: "",
            brand: "",
            category: "",
            description: "",
            price: 0,
            newprice:0,
            rate: 0,
            image: [],
            countInStock: 0,
            size: [],
            gender: "",
            images: [],
            selectedOption: null,
            selectedOption2: [],
            selectedOption3: null
        }
    }
    componentDidMount = async () => {
        try {
            const id = this.props.match.params.id;
            const response = await tracker.get("product/" + id);
            console.log(response.data)
            if (response.data) {
                await this.setState({
                    name: response.data.name,
                    brand: response.data.brand,
                    category: response.data.category,
                    description: response.data.description,
                    newprice:response.data.newprice,
                    price: response.data.price,
                    rate: response.data.rate,
                    image: response.data.image,
                    countInStock: response.data.countInStock,
                    gender: response.data.gender,
                    images: response.data.image,
                    size: response.data.size,
                    rate:response.data.rate,
                    id:id
                });

                this.setState({ selectedOption: { label: this.state.category, value: this.state.category } })
                this.setState({ selectedOption3: { label: this.state.gender, value: this.state.gender } })
                const sizes = this.state.size;
                var s = [];
                for (var i = 0; i < sizes.length; i++) {
                    var siz = { label: sizes[i], value: sizes[i] }
                    s.push(siz);
                }

                this.setState({ selectedOption2: s })
              
            }

        } catch (e) { console.log(e) }
    }
    handleSubmit = async () => {

        try {
            var pm = localStorage.getItem("isProductManager");
            if (pm === "true") {
                console.log(this.state.selectedOption)
                console.log(this.state.selectedOption2)
                console.log(this.state.selectedOption3)
                const gender=this.state.selectedOption3.label;
                const category=this.state.selectedOption.label;
                var userid = localStorage.getItem("userId");
                const sizes=[];
                for(var i =0; i<this.state.selectedOption2.length ; i++)
                {
                    sizes.push(parseInt(this.state.selectedOption2[i].value));
                }
                console.log("cıs", this.state.countInStock)
                const id= this.state.id;
                const response = await tracker.put("/product/" + id, {
                    productManager: userid,
                    name: this.state.name,
                    brand: this.state.brand,
                    category: category,
                    description: this.state.description,
                    price: this.state.price,
                    newprice:this.state.newprice,
                    countInStock: this.state.countInStock,
                    size: sizes,
                    gender: gender,
                    image:this.state.images,
                    rate:this.state.rate
                })
                console.log(response)
                if(response)
                {
                this.props.history.push("/pm_delete_product");
                }
                
            }


        } catch (e) { console.log("errorr",e); }

    }

    handleName = (e) => {

        this.setState({ name: e.target.value })

    }

    handleBrand = (e) => {
        this.setState({ brand: e.target.value })
    }

    handleDesc = (e) => {
        this.setState({ description: e.target.value })
    }

    handleCount = (e) => {
        this.setState({ countInStock: e.target.value })
    }
    handleChange = selectedOption => {
        this.setState(
            { selectedOption },
            () => console.log(`Option selected:`, this.state.selectedOption)
        );
    };
    handleChange2 = selectedOption2 => {
        this.setState(
            { selectedOption2 },
            () => console.log(`Option selected:`, this.state.selectedOption2)
        );
    };
    handleChange3 = selectedOption3 => {
        this.setState(
            { selectedOption3 },
            () => console.log(`Option selected:`, this.state.selectedOption3)
        );
    };

    render() {
        const { selectedOption, selectedOption2, selectedOption3 } = this.state;

        const name = this.state.name;
        const brand = this.state.brand;
        const category = this.state.category;
        const description = this.state.description;
        const count = this.state.countInStock;
        console.log(category)
        return (
            < div className="form" >

                < Container className="form-container" >

                    < Row className="form" >
                        < Form >
                            < div className="login-check" ><h2>Edit Product</h2></div ><br />
                            <Row>
                                <Col style={{ width: "70vh", height: "60vh", margin: "2vh", textAlign: "-webkit-center", marginBottom: "10vh" }}>
                                    <div className="card" style={{ width: "70vh", height: "60vh", margin: "2vh", textAlign: "-webkit-center" }}>
                                        <AliceCarousel
                                            disableButtonsControls={true}
                                            mouseTracking={false}
                                            responsive
                                            autoPlay
                                            autoPlayInterval="3000"
                                            style={{ height: "70vh", width: "70vh", marginBottom: "5vh" }}
                                        >

                                            <img style={{ width: "45vh", height: "45vh" }} src={this.state.images[0]} alt="product" />
                                            <img style={{ width: "45vh", height: "45vh" }} src={this.state.images[1]} />
                                            <img style={{ width: "45vh", height: "45vh" }} src={this.state.images[2]} />
                                        </AliceCarousel>


                                    </div>
                                </Col>
                            </Row>


                            <Row style={{ textAlign: "-webkit-center" }}>
                                <Col>
                                    < Input className="mb-4" type="text" onChange={(e) => this.handleName(e)} placeholder={name} />
                                    < Input className="mb-4" type="text" onChange={(e) => this.handleBrand(e)} placeholder={brand} />
                                    <Select
                                        defaultInputValue={category}
                                        value={selectedOption}
                                        onChange={this.handleChange}
                                        options={options}
                                    />
                                    <br></br>
                                    <Select


                                        value={selectedOption3}
                                        onChange={this.handleChange3}
                                        options={options3}
                                    />
                                </Col>
                                <Col>

                                    < Input className="mb-4" type="text" onChange={(e) => this.handleDesc(e)} placeholder={description} />

                                 
                                    < Input className="mb-4" type="number" onChange={(e) => this.handleCount(e)} placeholder={count} />

                                    <Select
                                        isMulti={true}
                                        value={selectedOption2}
                                        onChange={this.handleChange2}
                                        options={options2}
                                    />

                                </Col>
                            </Row>

                            <br></br>
                            < Button className="b-login" onClick={this.handleSubmit} color="secondary" block >Update</Button >



                        </Form >

                    </Row >
               
                </Container >

            </div >

        );
    }
}
export default pm_edit_product;