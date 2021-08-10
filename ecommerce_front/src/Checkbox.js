import React, { Component } from 'react';

class Indeterminate extends Component {
    constructor() {
        super();
        this.state = {
            i_agree: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ i_agree: !this.state.i_agree });
    }

    handleSubmit(event) {
        console.log(this.state);
        event.preventDefault();
    }

    render() {
        return (
            <div>
               
                <form onSubmit={this.handleSubmit}>

                    <label>
                        <input
                            type="checkbox"
                            style={{ height:"2rem", width:"2rem" }}
                            defaultChecked={this.state.i_agree}
                            onChange={this.handleChange}
                        /> 
          </label>

                    
                </form>
            </div>
        );
    }
}


export default Indeterminate;