import React, { Component } from 'react';
import './Exercise.css';

class Exercise extends Component {
    constructor (props) {
        super(props);
        
        this.state = {    
        }
      }
   
  render() {

    return (
       <div className="exerciseContainer">
       <div onClick={() => this.props.onSaveExercise(this.props.orderNumber)} className="exerciseSaveContainer">
       <div className="exerciseOrderNumber"> {this.props.orderNumber + 1 } </div> 
       <div className="exerciseSaveButton">Išsaugoti</div>
      </div>
       <div>
         <input placeholder="Pratimo Pavadinimas" onChange={(event) => this.props.handleExerciseNameInput(event.target.value, this.props.orderNumber)} name="exerciseName"
         value={this.props.exerciseName}
          className="exerciseInput" id="inputName" />
          </div>     
       <div>
         <input placeholder="Raumenų Grupė" onChange={(event) => this.props.handleExerciseMuscleGroupInput(event.target.value, this.props.orderNumber)} name="muscleGroup"
         value={this.props.muscleGroup}
          className="exerciseInput" id="inputMuscleGroup" />
          </div>
        <div>
        <input placeholder="Paveikslėlio URL" onChange={(event) => this.props.handleExerciseImageURLInput(event.target.value, this.props.orderNumber)} name="pictureMale"
        value={this.props.pictureMale}
          className="exerciseInput" id="inputPictureMale" />
          </div>
          <div className="exerciseDescription">
          <div className= "exerciseInput-mass">
          <input placeholder="Svoris" onChange={(event) => this.props.handleExerciseMassInput(event.target.value, this.props.orderNumber)} name="mass"
          value={this.props.mass}
          className="exerciseInput" id="inputMass" />
          </div>
          <div className= "exerciseInput-reps">
          <input placeholder="Kartai" onChange={(event) => this.props.handleExerciseRepsInput(event.target.value, this.props.orderNumber)} name="reps"
          value={this.props.reps}
          className="exerciseInput" id="inputReps" />
          </div>
          <div className= "exerciseInput-sets">
          <input placeholder="Setai" onChange={(event) => this.props.handleExerciseSetsInput(event.target.value, this.props.orderNumber)} name="sets"
          value={this.props.sets}
          className="exerciseInput" id="inputSets" />
          </div>
          <div className= "exerciseInput-rest">
          <input placeholder="Ilsėtis" onChange={(event) => this.props.handleExerciseRestInput(event.target.value, this.props.orderNumber)} name="rest"
          value={this.props.rest}
          className="exerciseInput" id="inputRest" />
          </div>
          <div className= "exerciseInput-duration">
          <input placeholder="Trukmė" onChange={(event) => this.props.handleExerciseDurationInput(event.target.value, this.props.orderNumber)} name="rest"
          value={this.props.duration}
          className="exerciseInput" id="inputDuration" />
          </div>
          </div>
          <div>
         <input placeholder="Komentarai" onChange={(event) => this.props.handleExerciseNotesInput(event.target.value, this.props.orderNumber)} name="notes"
         value={this.props.notes}
          className="exerciseInput" id="inputNotes" />
          </div>
          <div>{this.props.errorMessage}</div>
          <div onClick={() => this.props.onDeleteExercise(this.props.orderNumber, this.props.id)} className="exerciseDelete">x</div>
       </div>
    );
}
}

export default Exercise;