import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

class CreateExercise extends Component {
    state = {
        usrename: '',
        description: '',
        duration: '',
        date: new Date(),
        users: []
    }

    componentDidMount(){
        axios.get('http://localhost:5000/api/users/')
          .then(res => {
              if(res.data.length > 0){
                  this.setState({
                      users: res.data.map(user => user.username),
                      username: res.data[0].username  
                  })
              }
          })
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    dateChange = (date) => {
      this.setState({
          date
      })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const {username, description, duration, date} = this.state;

        const newExercise = {username,description, duration,date};

        console.log(newExercise);
        axios.post('http://localhost:5000/api/exercises/add', newExercise)
           .then(res => console.log(res.data));
        
        setTimeout(() => {
            window.location = "/";
        },2500)
    }

    render() {
        return (
            <div className="container mt-3">
                <h3>Create new Exercise Log</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select 
                            name="username" 
                            onChange={this.handleChange} 
                            value={this.state.username} 
                            ref="userinput" 
                            required 
                            className="form-control"
                        >
                          {this.state.users.map(user => {
                              return (
                                  <option key={user} value={user}>
                                      {user}
                                  </option>
                              )
                          })}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Description: </label>
                        <input 
                           type="text" 
                           className="form-control" 
                           name="description" 
                           value={this.state.description}
                           onChange={this.handleChange}
                           required
                        />
                    </div>

                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input 
                           type="text" 
                           className="form-control" 
                           name="duration" 
                           value={this.state.duration}
                           onChange={this.handleChange}
                           required
                        />
                    </div>

                    <div className="form-group">
                        <label>Date: </label>
                        <DatePicker selected={this.state.date} onChange={this.dateChange}/>
                    </div>

                    <div className="form-group">
                        <input 
                           type="submit" 
                           className="btn btn-primary" 
                           name="description" 
                           value="Create Exercise Log"
                        />
                    </div>
                </form>
            </div>
        )
    }
}
export default CreateExercise;