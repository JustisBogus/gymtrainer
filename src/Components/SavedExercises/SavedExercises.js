import React, { Component } from 'react';
import fire from '../../Firebase/Fire';
import './SavedExercises.css';
import { connect } from 'react-redux';
import { addSavedExercise, deleteExercise, addSavedExercises, deleteSavedExercise } from '../../store/actions/index';
import SavedExercise from './SavedExercise';

class SavedExercises extends Component {
    constructor (props) {
        super(props);
        this.state = {
            savedExercises:[],
        }
      }

componentWillMount = () => {

    let userRef = fire.database().ref("savedExercises").orderByKey().limitToLast(100);
    userRef.on('child_added', snapshot => {
      let exercises = {
          exerciseName: snapshot.val().exerciseName,
          muscleGroup: snapshot.val().muscleGroup,
          orderNumber: snapshot.val().orderNumber,
          completed: snapshot.val().completed,
          dateOfWorkout: snapshot.val().dateOfWorkout,
          mass: snapshot.val().mass,
          reps: snapshot.val().reps,
          sets: snapshot.val().sets,
          rest: snapshot.val().rest,
          duration: snapshot.val().duration,
          pictureFemale: snapshot.val().pictureFemale,
          pictureMale: snapshot.val().pictureMale,
          notes: snapshot.val().notes,
          trainerEmail: snapshot.val().trainerEmail,
          id: snapshot.key,
          isSelected:false };
          if (exercises.trainerEmail==="altoturas@icloud.com") {
          this.props.onAddSavedExercises(exercises);
          }
      });
    
}

onSavedExerciseSelected = (id) => {
  let savedExercises = this.props.savedExercises;
    for (var i=0; i < savedExercises.length; i++ ) {
        if (savedExercises[i].id===id) {
            savedExercises[i].orderNumber = this.props.exercises.length;
            savedExercises[i].isSelected = true;
            console.log(savedExercises[i]);
            console.log(this.props.exercises);
            this.props.onAddSavedExercise(savedExercises[i]);
        }
    }
}

onSavedExerciseDeselected = (id) => {
    let exercises = this.props.exercises;
    for (var i=0; i < exercises.length; i++) {
        if (exercises[i].id===id) {
            exercises[i].isSelected = false;
            let orderNumber = exercises[i].orderNumber;
            let deleteExercise = this.props.exercises;
            deleteExercise = deleteExercise.filter((exercise) => { 
            return exercise.id !== id 
            });
            for(var i=orderNumber; i < deleteExercise.length; i++ ) {
                deleteExercise[i].orderNumber = deleteExercise[i].orderNumber - 1;       
            }         
            this.props.onDeleteExercise(deleteExercise);
        }
    }
}

onDeleteSavedExercise = (id) => {
    let deleteExercise = this.props.savedExercises;
    deleteExercise = deleteExercise.filter((exercise) => { 
        return exercise.id !== id
        });
        this.props.onDeleteSavedExercise(deleteExercise);
        return fire.database().ref('savedExercises').child(id).remove();   
}


  render() {
 
let savedExercises = this.props.savedExercises.map(exercises => {
    return  <SavedExercise key={exercises.id}
                    exerciseName={exercises.exerciseName}
                    muscleGroup={exercises.muscleGroup}
                    mass={exercises.mass}
                    reps={exercises.reps}
                    sets={exercises.sets}
                    rest={exercises.rest}
                    duration={exercises.duration}
                    id={exercises.id}
                    isSelected={exercises.isSelected}
                    onSavedExerciseSelected={this.onSavedExerciseSelected}
                    onSavedExerciseDeselected={this.onSavedExerciseDeselected}
                    onDeleteSavedExercise={this.onDeleteSavedExercise}
                    />
});

    return (
        <div>
        <div className="usersTitle">Saved Exercises</div>
        <div className={(this.props.selectedUserName!=="" && this.props.dateSelected) ?
         "savedExercisesActive" : "savedExercisesInactive" }>
        {savedExercises}
      </div>
       </div>
    );
}
}

const mapStateToProps = state => {
  return {
  selectedUserName: state.workouts.selectedUserName,
  selectedUserEmail: state.workouts.selectedUserEmail,
  exercises: state.workouts.exercises,
  savedExercises: state.workouts.savedExercises,
  dateSelected: state.workouts.dateSelected
  };
};

const mapDispatchToProps = dispatch => {
  return {
  onAddSavedExercise: (selectedExercise) => dispatch(addSavedExercise(selectedExercise)),
  onDeleteExercise: (deletedExercise) => dispatch(deleteExercise(deletedExercise)),
  onAddSavedExercises: (exercises) => dispatch(addSavedExercises(exercises)),
  onDeleteSavedExercise: (deleteExercise) => dispatch(deleteSavedExercise(deleteExercise))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedExercises);