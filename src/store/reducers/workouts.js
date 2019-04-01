import { SELECT_USER, 
        ADD_EXERCISE, 
        ADD_EXERCISE_NAME, 
        UPDATE_DATE, 
        ADD_MUSCLE_GROUP,
        ADD_IMAGE_URL,
        ADD_MASS,
        ADD_REPS,
        ADD_SETS,
        ADD_REST,
        ADD_DURATION,
        ADD_NOTES,
        DELETE_EXERCISE,
        ADD_SAVED_EXERCISE,
        ADD_SAVED_EXERCISES,
        DESELECT_SAVED_EXERCISE,
        DELETE_SAVED_EXERCISE, 
        DATE_SELECTED,
        EMPTY_WORKOUT} from '../actions/actionTypes'

const initialState = {
    selectedUserName:"",
    selectedUserEmail:"",
    exercises:[],
    savedExercises:[],
    dateSelected: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case SELECT_USER :
        return {
            ...state,
            selectedUserName:action.selectedUserName,
            selectedUserEmail:action.selectedUserEmail
        };
        case ADD_EXERCISE :
        return {
            ...state,
            exercises: state.exercises.concat(action.newExercise)
        };
        case ADD_EXERCISE_NAME :
        return {
            ...state,
            exercises: action.exerciseName
        };
        case UPDATE_DATE :
        return {
            ...state,
            exercises: action.newDate
        };
        case ADD_MUSCLE_GROUP :
        return {
            ...state,
            exercises: action.muscleGroup
        };
        case ADD_IMAGE_URL :
        return {
            ...state,
            exercises: action.imageURL
        };
        case ADD_MASS :
        return {
            ...state,
            exercises: action.mass
        };
        case ADD_REPS :
        return {
            ...state,
            exercises: action.reps
        };
        case ADD_SETS :
        return {
            ...state,
            exercises: action.sets
        };
        case ADD_REST :
        return {
            ...state,
            exercises: action.rest
        };
        case ADD_DURATION :
        return {
            ...state,
            exercises: action.duration
        };
        case ADD_NOTES :
        return {
            ...state,
            exercises: action.notes
        };
        case DELETE_EXERCISE :
        return {
            ...state,
            exercises: action.deletedExercise
        };
        case ADD_SAVED_EXERCISE :
        return {
            ...state,
            exercises: state.exercises.concat(action.selectedExercise)
        };
        case ADD_SAVED_EXERCISES :
        return {
            ...state,
            savedExercises: [action.exercises].concat(state.savedExercises),
        };
        case DESELECT_SAVED_EXERCISE : 
        return {
            ...state,
            savedExercises: action.savedExercise
        };
        
        case DELETE_SAVED_EXERCISE : 
        return {
            ...state,
            savedExercises: action.deleteExercise
        };
     
        case DATE_SELECTED :
        return {
            ...state,
            dateSelected: true
        };
        case EMPTY_WORKOUT :
        return {
            ...state,
            exercises: [],
            savedExercises: action.savedExercises,
            selectedUserName:"",
            selectedUserEmail:""
        }

        default:
            return state;
    }
};

export default reducer;