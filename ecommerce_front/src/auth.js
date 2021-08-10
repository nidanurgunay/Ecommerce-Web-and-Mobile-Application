import React, { Component } from 'react';

import './SelectOpt';
import './Checkbox';
import { Button, Container, Form, Input, Modal, Row } from 'reactstrap';

import tracker from '../src/api/tracker'

class auth extends Component {
    constructor() {
        super();
        this.state = {
            token: "",
            invalid: false,
            passcode:"",
        }

        this.handlePasscode = this.handlePasscode.bind(this);
    }
    handlePasscode(e) {
        this.setState({ passcode: e.target.value });
    }

    handleSubmit = async () => {

            const passcode=localStorage.getItem('passcode');
            if (passcode === this.state.passcode){
                try {
            const response = await tracker.post('/activateEmail', {
                token: localStorage.getItem('token'),
                passcode:this.state.passcode
            });
            console.log(response)
            if (response.data.status === "error" && response.data.error === "Incorrect or expired link") {
                this.setState({ invalid: true, isexist:false })
            }
           
            if (response.data.message === "verified" && response.status === 200 && response.statusText === "OK") {
                this.setState({ token: response.data.token });
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('email', response.data.email);
                localStorage.setItem('userId',response.data.id);
                localStorage.setItem('isProductManager', response.data.isProductManager);
                localStorage.setItem('isSalesManager', response.data.isSalesManager);
                this.props.history.push("/Homepage");
            }
        }catch (e) {
            console.log(e.message);
        } 
        }else{
            this.setState({ invalid: true})
        }
    }
   
    render() {
        return (
            <>
            < div className="form" style={{ height: "50vh" }} >

                < Container className="form-container" style={{ width: "70vh" }} >
                    < Row className="form" >
                        < Form>
                            < div class="row" className="mb-2 pageheading" >
                                < div className="login-check" > Please enter the 6 Digit Number that has been sent into your email! </div >
                            </div >
                            < Input className="mb-2" type="text" onChange={this.handlePasscode} placeholder="Enter Token" />
                            {this.state.invalid ? <div className="row" style={{ color: "#c29fdc", justifyContent: "space-evenly" }}><p>Invalid or expired passcode! Please check your email or register again.</p></div> : null}

                            <div className="row" style={{ justifyContent: "center" }}>
                                < Button style={{ width: "auto" }} className="b-login"
                                    onClick={this.handleSubmit} color="secondary" block >Create Account {this.state.invalid}</Button >
                            </div>
                        </ Form>
                    </ Row>

                </Container>
            </ div>
            </>
        );

    }

}

export default auth;