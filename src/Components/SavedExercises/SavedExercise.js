import React, { Component } from 'react';
import './SavedExercise.css';

class SavedExercise extends Component {
    constructor (props) {
        super(props);
        
        this.state = {  

        }
      }

      toggleSavedExerciseSelected = (id) => {
        if (this.props.isSelected) {
            this.props.onSavedExerciseDeselected(id);
        } else {
            this.props.onSavedExerciseSelected(id);
        }
      }

  render() {

    return (
       <div onClick={() => this.toggleSavedExerciseSelected(this.props.id)}
        className={this.props.isSelected ? "savedExerciseContainerSelected" : "savedExerciseContainer"}>
       <div className="savedExerciseText-top">{this.props.exerciseName}</div>
       <div className="savedExerciseText">{this.props.muscleGroup}</div>
          <div className="exerciseDescription">
          <div className="savedExercise-mass">{this.props.mass}</div>
          <div className="savedExercise-reps">{this.props.reps}</div>
          <div className="savedExercise-sets">{this.props.sets}</div>
          <div className="savedExercise-rest">{this.props.rest}</div>
          <div className="savedExercise-duration">{this.props.duration}</div>
          </div>
          <div className="savedExerciseDelete" 
          onClick={() => this.props.onDeleteSavedExercise(this.props.id)}>x</div>
       </div>
    );
}
}

export default SavedExercise;