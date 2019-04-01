import React, { Component } from 'react';
import fire from '../Firebase/Fire';
import './Gym.css';
import Users from './Users/Users';
import Workout from '../Components/Workout/Workout';
import SavedExercises from './SavedExercises/SavedExercises';

class Gym extends Component {
    constructor (props) {
        super(props);
        
        this.state = {
          name:"",
          email:"",
          trainer:"",
          gender: "",
          exercises : [ ],
          exerciseName:"",
          dateCreated:"",
          dateOfWorkout:"",  
          orderNumber: "",
          muscleGroup: "",
          mass: "",
          reps: "",
          sets: "",
          rest: "",
          duration: "",
          pictureMale: "",
          pictureFemale: "",
          notes:"",
          newsMessage:"",
        }
      }

      onAddExercise = () => {
        const exercise = {
          exerciseName:this.state.exerciseName,
          dateCreated:this.state.dateCreated,
          dateOfWorkout:this.state.dateOfWorkout,  
          orderNumber:this.state.orderNumber,
          muscleGroup:this.state.muscleGroup,
          mass:this.state.mass,
          reps:this.state.reps,
          sets:this.state.sets,
          rest:this.state.rest,
          duration:this.state.duration,
          pictureMale:this.state.pictureMale,
          pictureFemale:this.state.pictureFemale,
          completed:false,
          notes:this.state.notes,
        }
        this.setState({ exercises: this.state.exercises.concat(exercise) }); 
      }

      sendExercisesHandler = () => {
        let workout = {
            'name': this.state.name,
            'email': this.state.email,
            'trainer': this.state.trainer,
            'gender': this.state.gender,
            'workoutCompleted': false,
            'completedCount': 0,
            'dateCreated':Date.now(),
            'dateOfWorkout':this.state.dateOfWorkout,
             exercises: this.state.exercises,
        }
        fire.database().ref("workouts").push(workout);
      }

      onAddNewsMessage = () => {
          let newsMessage = {
              'newsMessage': this.state.newsMessage,
              'dateCreated':Date.now(),
              'author': 'Arvydas'
          }
          fire.database().ref("news").push(newsMessage);
      }

  render() {
    return (
        <div className="gymContainer">
    <div className="usersContainer">
        <Users/>
    </div>
    <div className="createWorkoutContainer">
         <Workout/>
    </div>
    <div className="savedWorkoutsContainer">
        <SavedExercises/>
    </div>
      </div>
    );
  }
}

export default Gym;