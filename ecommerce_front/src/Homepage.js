import React, { Component } from 'react';
import './homepage.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Campaign from './campaign1.jpg';
import Campaign2 from './campaign2.jpg';
import Campaign3 from  './campaign3.jpg';
import Campaign4 from './campaign4.jpg';
import Campaign5 from './campaign5.jpg';

import { Button } from 'reactstrap';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import tracker from './api/tracker';


class Homepage extends Component {

    constructor() {
        super();
        this.state = {
            Email: '',
            id1: "5fd524a04fb1787843ee9d2d",
            id2: "5fd5248c4fb1787843ee9d2c",

        }
        this.handlePrice = this.handlePrice.bind(this);
        this.handleClickWomenHeels = this.handleClickWomenHeels.bind(this);
        this.handleClickWomenBoots = this.handleClickWomenBoots.bind(this);
        this.handleClickWomenSneaker= this.handleClickWomenSneaker.bind(this);
        this.handleClickManBoots = this.handleClickManBoots.bind(this);
        this.handleClickManSneaker = this.handleClickManSneaker.bind(this);
        this.handleClickManClassics = this.handleClickManClassics.bind(this);


    }
    handlePrice = async (e) => {

        try {

            const response = await tracker.get('/product/', this.state.id1);
            console.log(response);
            const product = response.data;
            console.log(product);

        } catch (e) {

        }

    }
    handleClickWomenHeels() {
       
        this.props.history.push("/womenHeels");
    }
    handleClickWomenBoots() {
       
        this.props.history.push("/womenBoots");
    }
    handleClickWomenSneaker() {
       
        this.props.history.push("/womenSneakers");
    }
    handleClickManSneaker() {
       
        this.props.history.push("/menSneakers");
    }
    handleClickManBoots() {
       
        this.props.history.push("/menBoots");
    }

    handleClickManClassics() {
       
        this.props.history.push("/menClassics");
    }
    


    render() {
        return (
            <>
                <Container style={{ width: "max-content", opacity: "", marginTop: "5vh" , textAlign: "-webkit-center", marginRight:"0px",paddingRight:"0px", paddingLeft:"0px"}}>
                    <div className="row" style={{width:"auto", marginBottom:"5vh"}}>
                        <AliceCarousel 
                        disableButtonsControls = {true}
                        responsive autoPlay autoPlayInterval="3000" style={{ height: "40vh", marginBottom:"5vh"}}>
                            <img style={{ width: "-webkit-fill-available" }} src={Campaign} className="sliderimg" />
                            <img style={{ width: "-webkit-fill-available" }} src={Campaign2} className="sliderimg" />
                            <img style={{ width: "-webkit-fill-available" }} src={Campaign3} className="sliderimg" />
                            <img style={{ width: "-webkit-fill-available" }} src={Campaign4} className="sliderimg" />
                            <img style={{ width: "-webkit-fill-available" }} src={Campaign5} className="sliderimg" />
                        </AliceCarousel>
                    </div>
                    <Row style={{alignItems:"center"}}>
                        <Col>
                           < Button onClick = {this.handleClickWomenHeels}style={{ width: "auto",height:"auto" }} className="b-login"
                                color="secondary" block >Woman Heels </Button >
                        </Col>
                        <Col>
                            <Button onClick = {this.handleClickManClassics} style={{ width: "auto",height:"auto" }} className="b-login"
                                color="secondary" block >Man Classics</Button >
                        </Col>
                        <Col>
                            < Button onClick = {this.handleClickWomenBoots} style={{ width: "auto",height:"auto" }} className="b-login"
                                color="secondary" block >Woman Boots</Button >
                        </Col>
                        <Col>
                            < Button onClick= {this.handleClickManBoots}  style={{ width: "auto" }} className="b-login"
                                color="secondary" block >Man Boots</Button >
                        </Col>
                        <Col>
                            < Button onClick = {this.handleClickWomenSneaker}style={{ width: "auto",height:"auto" }} className="b-login"
                                color="secondary" block >Woman Sneakers</Button >
                        </Col>
                        <Col>
                            < Button style={{ width: "auto" ,height:"auto"}} className="b-login"
                               onClick= {this.handleClickManSneaker} color="secondary" block >Man Sneakers</Button >
                        </Col>

                    </Row>
                    

                </Container>

            </>

        );
    }

}

export default Homepage;