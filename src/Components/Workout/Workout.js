import React, { Component } from 'react';
import './Workout.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Exercise from './Exercise';
import fire from '../../Firebase/Fire';
import { connect } from 'react-redux';
import { addExercise, 
        addExerciseName, 
        updateDate, 
        addMuscleGroup, 
        addImageURL,
        addMass,
        addReps,
        addSets,
        addRest,
        addDuration,
        addNotes,
        deleteExercise,
        deselectSavedExercise,
        dateSelected,
        emptyWorkout } from '../../store/actions/index';

class Workout extends Component {
    constructor (props) {
        super(props);
            
        this.state = {
            startDate:new Date(),
            selectedDay:"",
            selectedMonth:"",
            selectedYear:"",
            daySelected:false,
            exercises:[],
            showName:false,
            errorMessage:"",
            scrolldown:'',
        };
        this.handleChange = this.handleChange.bind(this);
      }

    componentDidUpdate = () => {
        this.scrollToBottom();
    }

      onCreateWorkout = () => {
        let workout = {
            'name': this.props.selectedUserName,
            'email': this.props.selectedUserEmail,
            'trainer': "Arvydas",
            'gender': "",
            'workoutCompleted': false,
            'completedCount': 0,
            'dateCreated':Date.now(),
            'dateOfWorkout':this.state.selectedMonth + " " + this.state.selectedDay,
             exercises: this.props.exercises,
        }
        fire.database().ref("workouts").push(workout);
        let savedExercises = this.props.savedExercises;
        for (var i=0 ; i < savedExercises.length; i++) {
            savedExercises[i].isSelected = false;
        }
        this.props.onEmptyWorkout(savedExercises);
    }

      handleChange(date) {
        this.setState({startDate: date});
        this.setState({selectedDay: date.getDate()});
        this.setState({selectedYear: date.getFullYear()});
        let getDate = date.getDate();
        let getMonth = date.getMonth();
        let month;
        if (getMonth===0){this.setState({selectedMonth:"Sausio"});month = "Sausio"}
        if (getMonth===1){this.setState({selectedMonth:"Vasario"});month = "Vasario"}
        if (getMonth===2){this.setState({selectedMonth:"Kovo"});month = "Kovo"}
        if (getMonth===3){this.setState({selectedMonth:"Balandžio"});month = "Balandžio"}
        if (getMonth===4){this.setState({selectedMonth:"Gegužės"});month = "Gegužės"}
        if (getMonth===5){this.setState({selectedMonth:"Birželio"});month = "Birželio"}
        if (getMonth===6){this.setState({selectedMonth:"Liepos"});month = "Liepos"}
        if (getMonth===7){this.setState({selectedMonth:"Rugpjūčio"});month = "Rugpjūčio"}
        if (getMonth===8){this.setState({selectedMonth:"Rugsėjo"});month = "Rugsėjo"}
        if (getMonth===9){this.setState({selectedMonth:"Spalio"});month = "Spalio"}
        if (getMonth===10){this.setState({selectedMonth:"Lapkričio"});month = "Lapkričio"}
        if (getMonth===11){this.setState({selectedMonth:"Gruodžio"});month = "Gruodžio"} 
        let getFullYear = date.getFullYear();
        this.setState({daySelected:true});
        let exercises = this.props.exercises;
        for(var i=0; i< exercises.length; i++ ) {
            exercises[i].dateOfWorkout = month + " " + getDate;
        }
        this.props.onUpdateDate(exercises);
        this.props.onDateSelected();
      }

      onAddExercise = () => {
          let newExercise = {
              "exerciseName":"",
              "muscleGroup":"",
              "mass":"",
              "reps":"",
              "sets":"",
              "rest":"",
              "duration":"",
              "dateCreated":new Date(),
              "completed":false,
              "dateOfWorkout":this.state.selectedMonth + " " + this.state.selectedDay,
              "notes":"",
              "orderNumber":this.props.exercises.length,
              "id":"",
              "pictureFemale":"",
              "pictureMale":"",
          }
         this.props.onAddExercise(newExercise);
      }

    handleExerciseNameInput = (text, orderNumber) => {
        if(text.length > 25 ) {
        this.setState({errorMessage:"Pavadinimas per ilgas"});
        } 
        else {
        let exercises = [...this.props.exercises];
        let exercise = {...exercises[orderNumber]};
        exercise.exerciseName = text;
        exercises[orderNumber] = exercise;
        this.props.onEnterExerciseName(exercises);
        this.setState({errorMessage:""});
        }
    }

    handleExerciseMuscleGroupInput = (text, orderNumber) => {
        if(text.length > 25 ) {
        this.setState({errorMessage:"Raumenų grupės aprašymas per ilgas"});
        } 
        else {
        let exercises = [...this.props.exercises];
        let exercise = {...exercises[orderNumber]};
        exercise.muscleGroup = text;
        exercises[orderNumber] = exercise;
        this.props.onEnterMuscleGroup(exercises);
        this.setState({errorMessage:""});
        }
    }

    handleExerciseImageURLInput = (text, orderNumber) => {
        let exercises = [...this.props.exercises];
        let exercise = {...exercises[orderNumber]};
        exercise.pictureMale = text;
        exercises[orderNumber] = exercise;
        this.props.onEnterImageURL(exercises);
        this.setState({errorMessage:""});
    }

    handleExerciseMassInput = (text, orderNumber) => {
        if (text.length > 7) {
            this.setState({errorMessage:"Per didelis svoris"});
        } else {
            let reg = /^[xX0-9 ]+$/
            if ( reg.test(text) === false && text !== "") {
            this.setState({errorMessage:"Netinkami simboliai"});
            } else {
            let exercises = [...this.props.exercises];
            let exercise = {...exercises[orderNumber]};
            exercise.mass = text;
            exercises[orderNumber] = exercise;
            this.props.onEnterMass(exercises);
            this.setState({errorMessage:""});
            }
        }
    }

    handleExerciseRepsInput = (text, orderNumber) => {
        if(text.length > 3 ) {
        this.setState({errorMessage:"Per daug kartų"});  
        } else {
            let reg = /^[0-9]+$/
            if ( reg.test(text) === false && text !== "") {
            this.setState({errorMessage:"Netinkami simboliai"});      
            } else {
            let exercises = [...this.props.exercises];
            let exercise = {...exercises[orderNumber]};
            exercise.reps = text;
            exercises[orderNumber] = exercise;
            this.props.onEnterReps(exercises);
            this.setState({errorMessage:""});
            }
        }
    }

    handleExerciseSetsInput = (text, orderNumber) => {
        if(text.length > 2 ) {
        this.setState({errorMessage:"Per daug setų"});  
        } else {
            let reg = /^[0-9]+$/
            if ( reg.test(text) === false && text !== "") {
            this.setState({errorMessage:"Netinkami simboliai"});      
            } else {
            let exercises = [...this.props.exercises];
            let exercise = {...exercises[orderNumber]};
            exercise.sets = text;
            exercises[orderNumber] = exercise;
            this.props.onEnterSets(exercises);
            this.setState({errorMessage:""});
            }
        }
    }

    handleExerciseRestInput = (text, orderNumber) => {
        if(text.length > 2 ) {
        this.setState({errorMessage:"Per ilgos pertraukos"});  
        } else {
            let reg = /^[0-9]+$/
            if ( reg.test(text) === false && text !== "") {
            this.setState({errorMessage:"Netinkami simboliai"});      
            } else {
            let exercises = [...this.props.exercises];
            let exercise = {...exercises[orderNumber]};
            exercise.rest = text;
            exercises[orderNumber] = exercise;
            this.props.onEnterRest(exercises);
            this.setState({errorMessage:""});
            }
        }
    }

    handleExerciseDurationInput = (text, orderNumber) => {
        if(text.length > 4 ) {
        this.setState({errorMessage:"Per ilga pratimo trukmė"});  
        } else {
            let reg = /^[0-9:]+$/
            if ( reg.test(text) === false && text !== "") {
            this.setState({errorMessage:"Netinkami simboliai"});      
            } else {
            let exercises = [...this.props.exercises];
            let exercise = {...exercises[orderNumber]};
            exercise.duration = text;
            exercises[orderNumber] = exercise;
            this.props.onEnterDuration(exercises);
            this.setState({errorMessage:""});
            }
        }
    }

    handleExerciseNotesInput = (text, orderNumber) => {
        if(text.length > 63 ) {
        this.setState({errorMessage:"Komentaras per ilgas"});
        }
        else {
        let exercises = [...this.props.exercises];
        let exercise = {...exercises[orderNumber]};
        exercise.notes = text;
        exercises[orderNumber] = exercise;
        this.props.onEnterNotes(exercises);
        this.setState({errorMessage:""});
        }
    }

    onDeleteExercise = (orderNumber, id) => {
        let savedExercises = this.props.savedExercises;
        for (var i=0 ; i < savedExercises.length ; i++) {
            if(savedExercises[i].id === id) {
            savedExercises[i].isSelected = false;
            }
        }
        let deleteExercise = this.props.exercises;
        deleteExercise = deleteExercise.filter((exercise) => { 
            return exercise.orderNumber !== orderNumber 
            });
            for(var i=orderNumber; i < deleteExercise.length; i++ ) {
                deleteExercise[i].orderNumber = deleteExercise[i].orderNumber - 1;       
            }         
            this.props.onDeleteExercise(deleteExercise); 
    }

    onSaveExercise = (orderNumber) => {
       let savedExercise = {
              "exerciseName":this.props.exercises[orderNumber].exerciseName,
              "muscleGroup":this.props.exercises[orderNumber].muscleGroup,
              "mass":this.props.exercises[orderNumber].mass,
              "reps":this.props.exercises[orderNumber].reps,
              "sets":this.props.exercises[orderNumber].sets,
              "rest":this.props.exercises[orderNumber].rest,
              "duration":this.props.exercises[orderNumber].duration,
              "dateCreated":new Date(),
              "completed":false,
              "dateOfWorkout":"",
              "notes":this.props.exercises[orderNumber].notes,
              "orderNumber":"",
              "pictureFemale":"",
              "pictureMale":this.props.exercises[orderNumber].pictureMale,
              "trainerEmail":"altoturas@icloud.com"
        }
        fire.database().ref("savedExercises").push(savedExercise);
    }

    scrollToBottom = () => {
       this.state.scrolldown.scrollIntoView({ behavior: 'smooth' });
       }
    
      
render() {

let createdWorkout;

    if (this.state.daySelected) {
        createdWorkout = <div className="workoutCreatedTitleWrap" >
        <div className="workoutCreatedTitle">{this.props.selectedUserName} {this.state.selectedMonth} {this.state.selectedDay}</div>
    </div>
    }

 let addExercise;
 
    if (this.state.daySelected && this.props.selectedUserName != "") {
        addExercise = <div className="workoutAddExerciseWrap">
        <div className="workoutAddExercise" onClick={() => this.onAddExercise()}>+</div>
    </div>
    }

let createWorkout;

    if (this.props.exercises.length > 0) {
        createWorkout = <div className="workoutCreateWrap">
        <div className="workoutCreate"
         onClick={() => this.onCreateWorkout()}>Sukurti Treniruotę</div>
    </div>
    }

let exercises = this.props.exercises.map(exercise => {
            return <Exercise
            key={exercise.orderNumber}
            exerciseName={exercise.exerciseName}
            dateOfWorkout={exercise.dateOfWorkout}
            orderNumber={exercise.orderNumber}
            muscleGroup={exercise.muscleGroup}
            pictureMale={exercise.pictureMale}
            mass={exercise.mass}
            reps={exercise.reps}
            sets={exercise.sets}
            rest={exercise.rest}
            duration={exercise.duration}
            notes={exercise.notes}
            id={exercise.id}
            errorMessage={this.state.errorMessage}
            onDeleteExercise={this.onDeleteExercise}
            handleExerciseNameInput={this.handleExerciseNameInput}
            handleExerciseMuscleGroupInput={this.handleExerciseMuscleGroupInput}
            handleExerciseImageURLInput={this.handleExerciseImageURLInput}
            handleExerciseMassInput={this.handleExerciseMassInput}
            handleExerciseRepsInput={this.handleExerciseRepsInput}
            handleExerciseSetsInput={this.handleExerciseSetsInput}
            handleExerciseRestInput={this.handleExerciseRestInput}
            handleExerciseDurationInput={this.handleExerciseDurationInput}
            handleExerciseNotesInput={this.handleExerciseNotesInput}
            onSaveExercise={this.onSaveExercise}
            />
});

let datePicker;

        datePicker =  <DatePicker
        inline
        selected={this.state.startDate}
        onChange={this.handleChange}
        dateFormat="MMMM d, yyyy h:mm aa"
    />
 

    return (
        <div className="workoutContainer">
        <div className="workoutTitle">Create New Workout</div>
            {datePicker}
            {createdWorkout}
            {exercises}
            {addExercise}
            {createWorkout}
        <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.state.scrolldown = el; }}>
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
      savedExercises: state.workouts.savedExercises
    };
  };

const mapDispatchToProps = dispatch => {
    return {
      onAddExercise: (newExercise) => dispatch(addExercise(newExercise)),
      onUpdateDate: (newDate) => dispatch(updateDate(newDate)),
      onEnterExerciseName: (exerciseName) => dispatch(addExerciseName(exerciseName)),
      onEnterMuscleGroup: (muscleGroup) => dispatch(addMuscleGroup(muscleGroup)),
      onEnterImageURL: (imageURL) => dispatch(addImageURL(imageURL)),
      onEnterMass: (mass) => dispatch(addMass(mass)),
      onEnterReps: (reps) => dispatch(addReps(reps)),
      onEnterSets: (sets) => dispatch(addSets(sets)),
      onEnterRest: (rest) => dispatch(addRest(rest)),
      onEnterDuration: (duration) => dispatch(addDuration(duration)),
      onEnterNotes: (notes) => dispatch(addNotes(notes)),
      onDeleteExercise: (deletedExercise) => dispatch(deleteExercise(deletedExercise)),
      onDeselectSavedExercise: (savedExercise) => dispatch(deselectSavedExercise(savedExercise)),
      onDateSelected: () => dispatch(dateSelected()),
      onEmptyWorkout: (savedExercises) => dispatch(emptyWorkout(savedExercises))
    }
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(Workout);

