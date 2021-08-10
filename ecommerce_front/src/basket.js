import React, { Component } from "react";
import "./SelectOpt";
import "./Checkbox";
import { Container, Row, Button, CardLink} from "reactstrap";
import tracker from "./api/tracker";
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from "react-alice-carousel";

class basket extends Component {
    constructor() {
        super();
        this.state = {
            products: [],
            total_price: 0

        };
    }
    handleStates = (arrayproduct, total) => {
        if (this.state.products !== arrayproduct || this.state.total_price !== total) {
            this.setState({ products: arrayproduct });
            this.setState({ total_price: total });
        }

    }
    componentDidMount = async () => {
        var basket = localStorage.getItem('basket');
        console.log("basket", basket);
        try {
            if (basket === null) {
                console.log("Empty basket");
            }
            else {
                const response = await tracker.get("basket/" + basket);
                const arrayproduct = response.data.productList.productArray;
                const total = response.data.productList.totalprice;
                console.log("res", response);
                console.log("arrayproduct", arrayproduct);
                this.setState({ products: arrayproduct });
                this.setState({ total_price: total });
                
                // const resimage=  await tracker.get("product/" + product);
            }
        } catch (e) {
            console.log(e);
        }
    }
  /*  componentDidUpdate = async () => {
        var basket = localStorage.getItem('basket');
        console.log("basket", basket);
        try {
            if (basket === null) {
                console.log("Empty basket");
            }
            else {
                const response = await tracker.get("basket/" + basket);
                const arrayproduct = response.data.productList.productArray;
                const total = response.data.productList.totalprice;
                console.log("res", response);
                console.log("arrayproduct", arrayproduct);
                this.handleStates(arrayproduct, total);
            }
        } catch (e) {
            console.log(e);
        }
    }
    */
    handle_add_one = async (id, quantity) => {
        var basket = localStorage.getItem('basket');
        console.log("handle_add_one icindeyim");
        try {
            const response = await tracker.put("basket/byOne/" + basket, {
                product: id
            });
            console.log("handle_add_one response", response);
            window.location.reload(false);
            return quantity + 1;
        } catch (e) {
            console.log(e);
        }
    }
    handle_delete_one = async (id, quantity) => {
        var basket = localStorage.getItem('basket');
        console.log("handle_delete_one icindeyim");
        console.log("id", id, " q ", quantity)
        try {
            const response = await tracker.put("basket/delete/byOne/" + basket, {
                product: id
            });
            console.log("handle_delete_one response ", response);
            if ((quantity - 1) === 0) {
                const del_response = await tracker.put("basket/delete/" + basket, {
                    product: id
                });
                console.log("quantity=0 ", del_response);
            }
            window.location.reload(false);
        } catch (e) {
            console.log(e);
        }
    }
    handle_delete = async (id) => {
        try {
            var basket = localStorage.getItem('basket');
            const del_all_response = await tracker.put("basket/delete/" + basket, {
                product: id
            });
            window.location.reload(false);
            console.log("x bas�ld� ", del_all_response);
        } catch (e) {

            console.log(e);
        }
        
    }
    handleProductName = async (id) => {
        try {
            const response = await tracker.get("product/" + id)
            console.log("handleProductName response", response);
            const product_name = response.data.name;
            console.log("product name:", product_name);
            return product_name;
        } catch (e) { }


    }
    handleClickCheckout = () => {
        console.log("handleClickCheckout: ",this.state.total_price);
        if (this.state.total_price > 0) {
            this.props.history.push(
                {
                    pathname: "/Checkout",
                    data: this.state.total_price,
                });
        }
        
    }
    handleProducts =  () => {
        console.log("handleproduct");
        var basketproducts = [];
        if (this.state.products.length !== 0) {
          




            console.log("prod statee",this.state.products)
            var productitem;

            for (var i = 0; i < this.state.products.length; i++) {
                console.log(this.state.products[i])
                const size = this.state.products[i].size;
                const price = this.state.products[i].price;
                const product = this.state.products[i].product;
                const images= this.state.products[i].image;
                console.log("product", product);
               
                const quantity = this.state.products[i].quantity;
               
                // const resimage= await  tracker.get("product/" + product);
                // console.log("resimage", resimage);
                // const images= resimage.data.image;
                productitem = (
                    <div className="cards" style={{ width: "25vh", height: "50vh", margin: "2vh" }}>
                        <CardLink style={{ objectPosition: "upper-right" , marginBottom:"10px"}} onClick={() => { this.handle_delete(product) }}><button>X</button>
                        </CardLink>
                        <AliceCarousel
                disableButtonsControls={true}
                mouseTracking={false}
                responsive
                autoPlay
                autoPlayInterval="3000"
                style={{ height: "40vh", marginBottom: "5vh" }}
              >

               
                <img style={{ width: "25vh", height: "25vh" }} src={images[0]} alt="High Heels" />
                <img style={{ width: "25vh", height: "25vh" }} src={images[1]} alt="High Heels" />
                <img style={{ width: "25vh", height: "25vh" }} src={images[2]} alt="High Heels" />

              </AliceCarousel>
                        <h3>{this.state.products[i].name}</h3> 
                        <p class="price">${price}</p>
                      
                        <p class="price">{"Size: "+size}</p>
                        <Row style={{ position: "relative", justifyContent: "space-around" }}> <CardLink onClick={() => { this.handle_add_one(product, quantity) }}><button>+</button>
                        </CardLink>
                            <h6 class="quantity" style={{ padding: "1rem" }}>{quantity}</h6>
                            <CardLink onClick={() => { this.handle_delete_one(product, quantity) }}><button>-</button>
                            </CardLink></Row>

                    </div >

                );
                basketproducts.push(productitem);
            }
            console.log(basketproducts);
            return basketproducts;
        }
    }
    render() {
        return (
            < div className="form" >

                < Container className="form-container" >

                    < Row className="form" >

                        <div className="card" style={{ width: "auto", marginRight: "1vh", marginLeft: "1vh", maxWidth: "initial" }}>
                            <h1 className="mt-5">Basket</h1>
                            <p class="price">{"Total Price: $" + this.state.total_price} </p>
                            <Row style={{ margin: "5vh", justifyContent: "space-around" }}>{this.handleProducts()}</Row>
                            <Row style={{ margin: "5vh", justifyContent: "space-around" }}></Row>
                            <CardLink > < Button style={{ marginTop: "10vh" }} onClick={this.handleClickCheckout} >Checkout</Button > </CardLink>
                        </div>


                    </Row >

                </Container >

            </div >

        );
    }

}
export default basket;