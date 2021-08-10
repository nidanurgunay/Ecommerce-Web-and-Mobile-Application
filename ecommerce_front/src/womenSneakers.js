import React, { Component } from "react";
import { Navbar, NavDropdown } from 'react-bootstrap';
import ReactStars from "react-rating-stars-component"

import "./SelectOpt";
import "./Checkbox";

import tracker from "../src/api/tracker";
import { CardLink, Container, Row } from "reactstrap";

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";


class womenSneakers extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
     
    };
  }

  componentDidMount = async () => {
    try {
      const response = await tracker.get("product/gender/female/category/Sneakers");
      const arrayproduct = response.data;
      this.setState({ products: arrayproduct });
      console.log("state", this.state.products);
    } catch (e) {}
  };

 
  handleProducts = () => {
    console.log("handleproduct");
    var product = [];
    if (this.state.products.length !== 0) {
      var productitem;
      for (var i = 0; i < this.state.products.length; i++) {
        console.log(this.state.products[i]);
        const id = this.state.products[i]._id;
        const image = this.state.products[i].image;
        const price = this.state.products[i].price;
        const newprice = this.state.products[i].newprice;
        const name = this.state.products[i].name;
        const rate= this.state.products[i].rate;

        console.log("image", image);
     
        const coni = i;
        productitem = (
            <div className="card" style={{ width: "25vh", height: "60vh", margin: "5vh", justifyContent: "space-around" }}>
            <CardLink
              onClick={() => {
                this.props.history.push("/product/" + id + "/ws" + "/" + coni);
              }}
              style={{ color: "black" }}
            >
              <AliceCarousel
                disableButtonsControls={true}
                mouseTracking={false}
                responsive
                autoPlay
                autoPlayInterval="3000"
                style={{ height: "40vh", marginBottom: "5vh" }}
              >
                <img style={{ width: "25vh", height: "25vh" }} src={image[0]} alt="High Heels" />
                <img style={{ width: "25vh", height: "25vh" }} src={image[1]} alt="High Heels" />
                <img style={{ width: "25vh", height: "25vh" }} src={image[2]} alt="High Heels" />
              </AliceCarousel>
                    <h5>{name}</h5>
                    <div style={{justifyContent:"center", display:"flex"}}>
              <ReactStars
             
                edit={false}
                count={5}
                value={rate}
                size={24}
                isHalf={false}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
              />

</div>
                    <p class="price" style={{ marginBottom: "0px", textDecorationLine: "line-through" }}>${price}</p>
              <p class="price">${newprice}</p>
                    <button>Add to Cart</button>
            </CardLink>
          
              
          
          </div>
        );
        product.push(productitem);
      }

      console.log(product);
      return product;
    }
  };
  handleOrder = async (e,price,val) =>{
    console.log("orderr")
    try {
      const response = await tracker.get("product/gender/female/category/Sneakers/"+price+"/"+val);
      const arrayproduct = response.data;
      console.log("resOrder", response);
      this.setState({ products: arrayproduct });
      console.log("state", this.state.products);
    } catch (e) { }
  }
  render() {
    return (
      <>
        <Container style={{ width: "auto", textAlign: "-webkit-center" }}>
          <div className="card" style={{ width: "auto", marginRight: "1vh", marginLeft: "1vh", maxWidth: "initial" }}>
            <h1 className="mt-5">Woman Sneakers</h1>
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light" {...this.props}>
              <NavDropdown title="Order by" id="collasible-nav-dropdown">
                <NavDropdown.Item onSelect={(e) => this.handleOrder(e,"price","1")}>Price (Ascending)</NavDropdown.Item>
                <NavDropdown.Item onSelect={(e) => this.handleOrder(e,"price","-1")}>Price (Descending)</NavDropdown.Item>
              </NavDropdown>
            </Navbar>
                    <Row style={{ margin: "5vh", justifyContent: "space-around" }}>{this.handleProducts()}</Row>
          </div>
        </Container>
      </>
    );
  }
}
export default womenSneakers;
