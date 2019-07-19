import React, { Component } from 'react';
import Exercise from './Exercise';
import axios from 'axios';

class ExerciseList extends Component {
    state = {
      exercises: []
    }

    componentDidMount(){
        axios.get("http://localhost:5000/api/exercises/").then(res => {
            this.setState({exercises: res.data})
        })
        .catch(err => console.log(err));
    }

    
    deleteExercise = id => {
      axios.delete("http://localhost:5000/api/exercises/"+ id)
        .then(res => console.log(res.data))

        this.setState({
            exercises: this.state.exercises.filter(ex => ex._id !== id)
        })
    } 

    exerciseList = () => {
        return this.state.exercises.map(curr => {
            return (
                <Exercise 
                   exercise={curr}
                   deleteExercise={this.deleteExercise}
                   key={curr._id} 
                />
            )
        })
    }

    render() {
        return (
            <div>
                <h3 className="text-muted my-5">Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.exerciseList()}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default ExerciseList;
