
import {Container, Form, Row } from 'reactstrap';
import React, { Component } from 'react';
import './App.css';



class about_us extends Component {


    render() {
        return (

            <>
                < div className="form" >

                    < Container className="form-container" >

                        < Row className="form" >
                            <Form>
                <h1 class="code">About Us</h1>
                <h6 class="code">
                    Brands live by their core values and what they add to humanity.
                    <br/>
                    Therefore, in the Shoe World, we aim to be the first brand that comes to mind as the most reliable leading shoe retailer <br/> that creates value with its price and quality, offers the fashion of the day.
                     <br />
                    This is why we stick to our principles:
                     <br />
                    We are people-centered; We don't just sell shoes, we count the satisfaction of our employees and people as a profit.
                     <br />
                    We are sensitive to society and environment; We respect the good of society and respect the nature.
                     <br />
                    We are reliable; We earn by selling more honestly, not more, and we step on the ground.
                     <br />
                    We are innovative; We follow the world, provide services with the latest technologies and create our own fashion.
                     <br />
                    We are friendly to culture, local elements; We take our strength from these lands and walk arm in arm with local producers.

    </h6>

                            </Form >

                        </Row >

                    </Container >

                </div >
            </>

        );

    }
}
    export default about_us;

