import React, { Component} from "react";
import "./SelectOpt";
import "./Checkbox";
import { CardLink, Container, Row } from "reactstrap";
import tracker from "./api/tracker";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Navbar, NavDropdown } from 'react-bootstrap';
import ReactStars from "react-rating-stars-component"

class menBoots extends Component {
  constructor() {
    super();
    this.state = {
      products: [],

    };
  }

  componentDidMount = async () => {
    try {
      const response = await tracker.get("product/gender/male/category/Boots");
      const arrayproduct = response.data;
      console.log("res", response);
      this.setState({ products: arrayproduct });
      console.log("state", this.state.products);
    } catch (e) { }
  };

  handleBasket = async (id, price) => {
    var basket = localStorage.getItem('basket');
    console.log("basket", basket);
    if (basket === null) {
      console.log("ifdeyim")
      try {
        const response = await tracker.post("/basket", {
          productList: {
            totalprice: "",
            productArray: [
              {
                quantity: 1,
                price: price,
                product: id
              }
            ]
          }
        });
        console.log(response);
        const basketid = response.data._id;
        localStorage.setItem('basket', basketid);


      } catch (e) {
        console.log(e);
      }
    }
    else {
      try {
        const basketresponse = await tracker.get("basket/" + basket);
        const obj = { quantity: 1, price: price, product: id };
        console.log("basket response: ", basketresponse);
        var includes = false;
        const array = basketresponse.data.productList.productArray;
        console.log("array: ", array);
        for (var i = 0; i < array.length; i++) {
          console.log("array[i].product: ", array[i].product);
          if (array[i].product === id) {
            includes = true;
            break;
          }
          else
            includes = false;
        }

        if (includes === false) {
          const response = await tracker.put("basket/" + basket, obj);
          console.log("baskette ayn� �r�n yok, response: ", response);
        }
        else if (includes === true) {

          console.log("baskette ayn� �r�n var 1 ekle");

          const response = await tracker.put("basket/byOne/" + basket, {
            product: id
          });
          console.log("add_one response", response);

        }

      } catch (e) {
        console.log(e);
      }
    }

  }


  handleProducts = () => {
    console.log("handleproduct");
    var product = [];
    if (this.state.products.length !== 0) {
      console.log(this.state.products);
      var productitem;

      for (var i = 0; i < this.state.products.length; i++) {
        console.log(this.state.products[i]);
        const id = this.state.products[i]._id;
        var image = this.state.products[i].image;
        const newprice = this.state.products[i].newprice;
        const price = this.state.products[i].price;
        const name = this.state.products[i].name;
        const rate= this.state.products[i].rate;

        console.log("image", image);



        console.log("images", this.state.products[i].image[0]);
        const coni = i;

        productitem = (
          <div className="card" style={{ width: "25vh", height: "60vh", margin: "5vh", justifyContent: "space-around" }}>

            <CardLink
              onClick={() => {
                this.props.history.push("/product/" + id + "/mb" + "/" + coni, {
                  images: image
                });
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
  handleOrder = async (e, price, val) => {
    console.log("orderr")
    try {
      const response = await tracker.get("product/gender/male/category/Boots/" + price + "/" + val);
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
            <h1 className="mt-5">Man Boots</h1>
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light" {...this.props}>
              <NavDropdown title="Order by" id="collasible-nav-dropdown">
                <NavDropdown.Item onSelect={(e) => this.handleOrder(e, "price", "1")}>Price (Ascending)</NavDropdown.Item>
                <NavDropdown.Item onSelect={(e) => this.handleOrder(e, "price", "-1")}>Price (Descending)</NavDropdown.Item>
               
              </NavDropdown>
            </Navbar>
            <Row style={{ margin: "5vh", justifyContent: "space-around" }}>{this.handleProducts()}</Row>
          </div>
        </Container>
      </>
    );
  }
}
export default menBoots;
