import React, { Component } from 'react';
import './App.css';
import { Button, Container, Form, Input, Row } from 'reactstrap';
import tracker from '../src/api/tracker'


class changePassword extends Component {
    constructor() {

        super();


        this.state = {

            old_password: '',
            new_password: '',
            new_password_again: '',
            invalidpassword: false,
            same: true,
            too_small: false,
            invalid: false,
            
        }
    }
    old_password = (e) => {
        this.setState({ old_password: e.target.value })
    }
    new_password = (e) => {
        this.setState({ new_password: e.target.value })
    }
    new_password_again = (e) => {
        this.setState({ new_password_again: e.target.value })
    }
    handleSubmit = async () => {
        if (this.state.new_password !== this.state.new_password_again) {
            this.setState({ same: false, invalid: true });
        }
         if (this.state.new_password !== this.state.new_password_again) {
            this.setState({ same: false, invalid: true });
        }
        else {
            try {
                var user = localStorage.getItem('token');
                console.log(this.state.old_password)
                const response = await tracker.post('/changePassword', {
                    token: user,
                    newpassword: this.state.new_password,
                    oldpassword: this.state.old_password,
                    email: localStorage.getItem('email')
                });
                console.log(response)

                if (response.data.status === "error") {
                    if (response.data.error === "Invalid Oldpassword") {
                        this.setState({ invalidpassword: true, invalid: true });
                    }
                    else if (response.data.error === "Password too small. Should be atleast 7 characters") {
                        this.setState({ too_small: true, invalid: true });
                    }
                }
                else if (response.data.status === "passwordChanged" ) {
                    this.setState({ same: true, invalidpassword: false, too_small: false, invalid: false })
                    localStorage.setItem('token',response.data.token)
                    this.props.history.push("/Homepage");

                }


            } catch (e) { }
        }

    }

    render() {
        return (
            < div className="form" >

                < Container className="form-container" >

                    < Row className="form" >
                        < Form >
                            < div class="row" className="mb-2 pageheading" >
                                < div className="login-check" > Change Password</div >
                            </div >

                            < Input className="mb-2" type="password" onChange={this.old_password} placeholder="Old Password" />
                            {this.state.invalidpassword ? <div className="row" style={{ color: "#c29fdc", justifyContent: "space-evenly" }}><p>Invalid password! Please rewrite your old password</p></div> : null}

                            < Input className="mb-2" type="password" onChange={this.new_password} placeholder="New Password" />
                            {this.state.too_small ? <div className="row" style={{ color: "#c29fdc", justifyContent: "space-evenly" }}><p>Password need to be at least 7 character</p></div> : null}
                            < Input className="mb-2" type="password" onChange={this.new_password_again} placeholder="New Password Again" />
                            {this.state.same ? null : <div className="row" style={{ color: "#c29fdc", justifyContent: "space-evenly" }}><p>Passwords should be the same</p></div>}

                            <div className="row" style={{ justifyContent: "center" }}>
                                < Button style={{ width: "auto" }} className="b-login"
                                    onClick={this.handleSubmit} color="secondary" block >Change Password {!this.state.invalid}</Button >

                            </div>

                        </Form >

                    </Row >

                </Container >

            </div >

        );
    }
}
export default changePassword;