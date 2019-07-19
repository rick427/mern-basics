import React, { Component } from 'react';
import axios from 'axios';

class CreateUser extends Component {
    state = {
        username: ''
    }

    handleChange = e => {
        this.setState({username: e.target.value});
    }

    handleSubmit = async e => {
        e.preventDefault();
        const newUser = {username: this.state.username};

        axios.post('http://localhost:5000/api/users/add', newUser)
           .then(res => console.log(res.data));

        this.setState({username: ''});
    }

    render() {
        return (
            <div className="container mt-3">
                <h3>Create New User</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input 
                            type="text" 
                            onChange={this.handleChange} 
                            value={this.state.username} 
                            className="form-control"
                            required
                        />
                        <div className="form-group mt-3">
                            <input type="submit" value="Create User" className="btn btn-primary"/>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
export default CreateUser;
