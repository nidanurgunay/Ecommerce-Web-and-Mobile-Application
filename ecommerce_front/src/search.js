import React, {Component} from "react";
import "./SelectOpt";
import "./Checkbox";
import { Container, Row, CardLink} from "reactstrap";
import tracker from "./api/tracker";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";


class Search extends Component {
    constructor() {
        super();
        this.state = {
            products: [],
            images: [],
        };
    }

    componentDidMount = async () => {
        this.handleProducts();

    };

    componentDidUpdate = async () => {
        this.handleProducts();

    };
    handleProducts = async () => {
        try {
            const what = this.props.match.params.what;
            const response = await tracker.get("product/all/search/" + what);

            console.log("response", response);
            let arrayproducts = response.data;
            console.log("arrayproducts", arrayproducts);


            if (arrayproducts.length !== 0) {
                
                arrayproducts = arrayproducts.map(arrayproduct => {
                    return <div className="card"
                                style={{width: "25vh", height: "60vh", margin: "2vh", justifyContent: "space-around"}}>
                        <CardLink
                            onClick={() => {
                                this.props.history.push("/product/" + arrayproduct._id + "/ms" + "/" + 1);
                            }}
                            style={{color: "black"}}
                        >
                            <AliceCarousel
                                disableButtonsControls={true}
                                mouseTracking={false}
                                responsive
                                autoPlay
                                autoPlayInterval="3000"
                                style={{height: "40vh", marginBottom: "5vh"}}
                            >
                                <img style={{width: "25vh", height: "25vh"}} src={arrayproduct.image[0]} alt="High Heels"/>
                                <img style={{width: "25vh", height: "25vh"}} src={arrayproduct.image[1]} alt="High Heels"/>
                                <img style={{width: "25vh", height: "25vh"}} src={arrayproduct.image[2]} alt="High Heels"/>
                            </AliceCarousel>
                            <h5>{arrayproduct.name}</h5>
                            <p className="price" style={{
                                marginBottom: "0px",
                                textDecorationLine: "line-through"
                            }}>${arrayproduct.price}</p>
                            <p className="price">${arrayproduct.newprice}</p>
                            <button>Add to Cart</button>
                        </CardLink>

                    </div>
                });

                console.log("arrayproducts: ", arrayproducts);
                this.setState({products: arrayproducts});
            }

        } catch (e) {
            console.log("error", e)
        };
    };


    render() {
        return (
            <>
                <Container style={{width: "auto", textAlign: "-webkit-center"}}>
                    <div className="card"
                         style={{width: "auto", marginRight: "1vh", marginLeft: "1vh", maxWidth: "initial"}}>
                        <h1 className="mt-5">Your Search Results</h1>
                       
                        <Row style={{margin: "5vh", justifyContent: "space-around"}}>{this.state.products}</Row>
                    </div>
                </Container>
            </>
        );
    }
}

export default Search;
