import React, { Component } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./SelectOpt";
import "./Checkbox";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { CardLink, Col, Container, Form, Row } from "reactstrap";

import ReactStars from "react-rating-stars-component"
import tracker from "../src/api/tracker";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";


var size = [];
var image = [];
class product extends Component {

    constructor(props) {
        super(props);
        console.log("props", props)
        this.state = {
            notloggedin: true,
            rating: 0,
            avg_rate: 3,
            txt: "Type your comment here!",
            Comments: [],
            commentId: "",
            product: "",
            im: "",
            num: "",
            qnt: 1,
            size: [],
            newprice: "",
            oldprice: "",
            userId: "",
            basketId: "",
            selectedsize: "",
            countInStock: "",
            images: [],
            desc:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  ",
            name: "",


        }
    }
    componentDidMount = async () => {
        try {
            const id = this.props.match.params.id;
            const im = this.props.match.params.ar;
            const num = this.props.match.params.num;

            console.log(num);
            const response = await tracker.get("product/" + id);
            console.log("res", response.data);
            await this.setState({ product: response.data, name: response.data.name, im: im, num: num, oldprice: response.data.price, newprice: response.data.newprice, desc: response.data.description, rating: response.data.rate });
            await this.setState({ avg_rate: response.data.rate });
            console.log("avg_rate", this.state.avg_rate);
            await this.setState({ size: [...this.state.size, ...response.data.size], images: [...this.state.images, ...response.data.image] });
            size = response.data.size;
            image = response.data.image;

            console.log("size", this.state.size);
            console.log("price", this.state.newprice);
            console.log(response.data.commentId);
            if (typeof response.data.commentId !== 'undefined') {

                await this.setState({ commentId: response.data.commentId });
            }
            if (this.state.commentId !== "") {
                try {
                    const commentresponse = await tracker.get("comment/" + this.state.commentId);

                    console.log("commentresponse:", commentresponse);
                    const arraycomments = commentresponse.data.comments;
                    await this.setState({ Comments: arraycomments });
                    console.log("state", this.state.Comments);

                } catch (e) {
                    console.log(e);
                }
            }
            console.log("commentid:", this.state.commentId);
            var loggedin = localStorage.getItem('userId');
            console.log("userId: ", loggedin);
            if (loggedin === null) {
                this.setState({ notloggedin: true });

            }
            else {
                await this.setState({ notloggedin: false });
            }

        } catch (e) { }
    };
    handleChangeSize = (e) => {
        console.log(this.state.images)
        this.setState({ selectedsize: e.target.value });
    };
    handleChangeQuantity = (e) => {
        this.setState({ qnt: e.target.value });
    };

    handleMenuItem = () => {
        var menuitem = "";
        if (this.state.im == "mb") {
        }
        return menuitem;
    };
    handleValue = (e) => {
        this.setState({ txt: e.target.value });
    }
    handleRating = (e) => {
        console.log("handlerating: ", e)
        this.setState({ rating: e });
    }
    handleComment = async () => {

        const id = this.state.commentId;

        console.log("handleComment id:", id);
        if (!this.state.notloggedin) {
            try {


                const userid = await localStorage.getItem("userId");
                if (!id) {
                    console.log("rating: ", this.state.rating);
                    console.log("text: ", this.state.txt);
                    console.log("product: ", this.state.product._id);
                    console.log("rating:", this.state.rating);
                    console.log("user:", localStorage.getItem("userId"));
                    const user = localStorage.getItem("userId");
                    const response = await tracker.post("/comment",
                        {

                            totalRate: this.state.rating,
                            product: this.state.product._id,
                            comments: [
                                {
                                    user: user,
                                    rating: this.state.rating,
                                    text: this.state.txt
                                },
                            ],

                        });
                    console.log(response);
                    console.log("comment is posted");
                }
                else {
                    console.log("else");
                    const putresponse = await tracker.put("/comment/" + id,
                        {
                            user: userid, 
                            rating: this.state.rating,
                            text: this.state.txt
                        });

                    console.log("resputt", putresponse.data);
                }


            } catch (e) {
                console.log(e);
            }
        }

    };
    getOtherReviews = async () => {

        console.log("comıd", this.state.commentId)
        if (this.state.commentId !== "") {
            try {
                const commentresponse = await tracker.get("/comment" + this.state.commentId);

                console.log("commentresponse:", commentresponse);
                const arraycomments = commentresponse.data.comments;
                this.setState({ Comments: arraycomments });
                console.log("state", this.state.Comments);

            } catch (e) {
                console.log(e);
            }
        }
    }
    otherReviews = () => {

        console.log("otherReviews", this.state.Comments);
        console.log("otherReviews ll ", this.state.Comments.length);
        var com_array = [];


        try {

            if (typeof this.state.Comments !== 'undefined') {
                var commentitem;
                console.log("otherReviews ll2 ", this.state.Comments.length);
                for (var i = 0; i < this.state.Comments.length; i++) {
                    console.log("fordayımmmm", this.state.Comments[i]);
                    console.log("for", this.state.Comments[i].isValid);

                    if (this.state.Comments[i].isValid === true) {
                        const commentid = this.state.Comments[i]._id;
                        const user = this.state.Comments[i].user;
                        const rating = this.state.Comments[i].rating;
                        const text = this.state.Comments[i].text;
                        console.log("rating", rating);
                        commentitem = (
                            <Row>
                                <div>
                                    <ReactStars
                                        edit={false}
                                        count={5}
                                        value={rating}
                                        disableButtonsControls={true}
                                        size={24}
                                        isHalf={false}
                                        emptyIcon={<i className="far fa-star"></i>}
                                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                                        fullIcon={<i className="fa fa-star"></i>}
                                        activeColor="#ffd700"
                                    />
                                    <p>{text}</p>
                                </div>
                            </Row>
                        );
                        com_array.push(commentitem);

                    }

                }


            }
            return (com_array);
        } catch (e) { }



    }

    handleBasket = async () => {
        console.log("handlebaskett")
        var basket = localStorage.getItem("basket");

        const id = this.state.product._id;
        var userId = localStorage.getItem("userId");
        this.setState({ userId: userId });
        console.log("basketıd", basket)
        if (basket === null) {

            console.log(userId);
            if (userId === null) {

                try {
                    var tprice = this.state.newprice * this.state.qnt;
                    const response = await tracker.post("/basket", {
                        productList: {
                            totalprice: tprice,
                            productArray: [
                                {
                                    size: this.state.selectedsize,
                                    name: this.state.name,
                                    quantity: this.state.qnt,
                                    price: this.state.newprice,
                                    product: id,
                                    image: [this.state.images[0], this.state.images[1], this.state.images[2]]
                                },
                            ],
                        },
                    });

                    console.log("cart", response);
                    const basketid = response.data._id;
                    localStorage.setItem("basket", basketid);
                } catch (e) { }
            }
            else {
                console.log("elsedeyimm")
                try {
                    var tprice = this.state.newprice * this.state.qnt;
                    console.log("im", this.state.images[0])
                    const response = await tracker.post("/basket", {
                        user: userId,
                        productList: {
                            totalprice: tprice,
                            productArray: [
                                {
                                    size: this.state.selectedsize,
                                    name: this.state.name,
                                    quantity: this.state.qnt,
                                    price: this.state.newprice,
                                    product: id,
                                    image: [this.state.images[0], this.state.images[1], this.state.images[2]]
                                },
                            ],
                        },
                    });

                    console.log("cart", response);
                    const basketid = response.data._id;
                    localStorage.setItem("basket", basketid);
                } catch (e) { }
            }
        }
        else {

            try {

                const basketresponse = await tracker.get("basket/" + basket);
                const sel_size = this.state.selectedsize;
                const qua = this.state.qnt;
                const price = this.state.newprice;
                const p_name = this.state.name;
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
                var tprice = this.state.price * this.state.qnt;
                if (includes === false) {
                    console.log("size:", sel_size);
                    console.log("quantity:", qua);
                    console.log("price:", price);
                    console.log("name:", p_name);
                    console.log("imm", this.state.images[0])
                    const response = await tracker.put("basket/" + basket,
                        {
                            size: this.state.selectedsize,
                            name: this.state.name,
                            quantity: this.state.qnt,
                            price: this.state.newprice,
                            product: id,
                            image: [this.state.images[0], this.state.images[1], this.state.images[2]]
                        },


                    );
                    console.log("baskette aynı ürün yok, response: ", response);
                }
                else if (includes === true) {

                    console.log("baskette aynı ürün var 1 ekle");
                    for (var i = 0; i < this.state.qnt; i++) {
                        const response = await tracker.put("basket/byOne/" + basket, {
                            product: id
                        });
                        console.log("add_one response", response);
                    }
                }
            }
            catch { }
        };
    }


    handleOptions = () => {
        var opts = [];

        for (var i = 0; i < this.state.size.length; i++) {
            var opti = <option value={this.state.size[i]}>{this.state.size[i]}</option>;
            opts.push(opti);
        }

        return opts;
    };

    handleLogin = () => {
        var loggedin = localStorage.getItem('token');
        console.log("token: ", loggedin);
        if (loggedin === null) {
            this.setState({ notloggedin: true });
        }
        else {
            this.setState({ notloggedin: false });
        }
    }


    render() {
        const a = this.state.avg_rate;
        return (
            <>
                <Tabs defaultActiveKey="Product">
                    <Tab eventKey="Product" title="Product">
                        <Container style={{ width: "max-content", opacity: "", marginTop: "5vh", textAlign: "-webkit-center" }}>

                            <div className="card" style={{ width: "100%", marginRight: "1vh", marginLeft: "1vh", maxWidth: "initial" }}>
                                <Row style={{ margin: "5vh", justifyContent: "space-around" }}>
                                    <Col>

                                        <div className="card" style={{ width: "60vh", height: "60vh", margin: "2vh", marginLeft: "5vh" }}>
                                            <AliceCarousel
                                                disableButtonsControls={true}
                                                mouseTracking={false}
                                                responsive
                                                autoPlay
                                                autoPlayInterval="3000"
                                                style={{ height: "60vh", width: "40vh", marginBottom: "5vh" }}
                                            >

                                                <img style={{ width: "35vh", height: "35vh" }} src={this.state.images[0]} alt="product" />
                                                <img style={{ width: "35vh", height: "35vh" }} src={this.state.images[1]} />
                                                <img style={{ width: "35vh", height: "35vh" }} src={this.state.images[2]} />
                                            </AliceCarousel>


                                        </div>
                                        <div style={{ justifyContent: "center", display: "flex" }}>
                                            <ReactStars

                                                edit={false}
                                                count={5}
                                                value={a}
                                                size={24}
                                                isHalf={false}
                                                emptyIcon={<i className="far fa-star"></i>}
                                                halfIcon={<i className="fa fa-star-half-alt"></i>}
                                                fullIcon={<i className="fa fa-star"></i>}
                                                activeColor="#ffd700"
                                            />

                                        </div>
                                    </Col>
                                    <Col style={{ marginLeft: "15vh" }}>
                                        <h1 style={{ marginTop: "3vh" }}>{this.state.product.name}</h1>
                                        <Row>
                                            <h3 style={{ margin: "3vh" }}>{this.state.desc}</h3>
                                        </Row>
                                        <h3 style={{ margin: "3vh" }}> Stock: {this.state.product.countInStock}</h3>

                                        <h1 style={{ margin: "3vh" }} class="price">
                                            <p class="price" style={{ marginBottom: "0px", textDecorationLine: "line-through" }}>${this.state.oldprice}</p>
                                            <p class="price" style={{ marginTop: "5px" }}>${this.state.newprice}</p>
                                        </h1>

                                        <div className="row" style={{ justifyContent: "center" }}>
                                            <label>
                                                Sizes
                                             <select value={this.state.value} onChange={this.handleChangeSize}>
                                                    {this.handleOptions()}
                                                </select>
                                            </label>
                                        </div>
                                        <div className="row" style={{ marginTop: "5vh", justifyContent: "center" }}>
                                            <InputLabel id="quantity" style={{ marginRight: "3vh", marginTop: "1vh" }}>
                                                Quantity{" "}
                                            </InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={this.state.qnt}
                                                onChange={this.handleChangeQuantity}
                                            >
                                                <MenuItem value={1}>1</MenuItem>
                                                <MenuItem value={2}>2</MenuItem>
                                                <MenuItem value={3}>3</MenuItem>
                                                <MenuItem value={4}>4</MenuItem>
                                                <MenuItem value={5}>5</MenuItem>
                                                <MenuItem value={6}>6</MenuItem>

                                                {this.handleMenuItem}
                                            </Select>
                                        </div>
                                        <CardLink
                                            onClick={() => {
                                                this.handleBasket();
                                            }}
                                        >
                                            <button style={{ marginTop: "5vh" }}>Add to Cart</button>
                                        </CardLink>
                                    </Col>
                                </Row>
                            </div>
                        </Container>
                    </Tab>
                    <Tab eventKey="Reviews" title="Reviews" >
                        < div className="form" >
                            < Container className="form-container" >

                                < Row className="form" >
                                    < Form >
                                        <div className="login-check">Rate the product</div>
                                        <ReactStars
                                            count={5}
                                            value={this.state.rating}
                                            onChange={this.handleRating}
                                            size={24}
                                            isHalf={false}
                                            emptyIcon={<i className="far fa-star"></i>}
                                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                                            fullIcon={<i className="fa fa-star"></i>}
                                            activeColor="#ffd700"
                                        />
                                        <div>Add a comment</div>
                                        <div>
                                            <input
                                                style={{ width: "300px", height: "100px", size: "relative", margin: "2rem" }}
                                                type="text"
                                                onChange={this.handleValue}
                                            />
                                            <br />
                                            {this.state.notloggedin ? <div className="row" style={{ color: "#c29fdc", justifyContent: "space-evenly" }}><p>Only subscribed users can comment!</p><button disabled="true" onClick={(e) => this.handleComment(e)}>Send</button></div> : <div className="card"><button className="b-login" onClick={this.handleComment}>Send</button></div>}


                                        </div>

                                        <div>
                                            <div style={{ margin: "5vh", justifyContent: "center", display: "inline-block" }}>{this.otherReviews()}</div>
                                        </div>
                                    </Form >

                                </Row >

                            </Container >
                        </div>
                    </Tab>
                </Tabs>
               
            </>
        );
    }
}

export default product;