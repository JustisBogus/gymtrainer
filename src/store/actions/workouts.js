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
        EMPTY_WORKOUT } from './actionTypes';

export const selectUser = (selectedUserName, selectedUserEmail) => {
    return {
        type: SELECT_USER,
        selectedUserName: selectedUserName,
        selectedUserEmail: selectedUserEmail
    };
};

export const addExercise = (newExercise) => {
    return {
        type: ADD_EXERCISE,
        newExercise: newExercise
    };
};

export const addExerciseName = (exerciseName) => {
    return {
        type: ADD_EXERCISE_NAME,
        exerciseName: exerciseName
    };
};

export const updateDate = (newDate) => {
    return {
        type: UPDATE_DATE,
        newDate: newDate
    };
};

export const addMuscleGroup = (muscleGroup) => {
    return {
        type: ADD_MUSCLE_GROUP,
        muscleGroup: muscleGroup
    };
};

export const addImageURL = (imageURL) => {
    return {
        type: ADD_IMAGE_URL,
        imageURL: imageURL
    };
};

export const addMass = (mass) => {
    return {
        type: ADD_MASS,
        mass: mass
    };
};

export const addReps = (reps) => {
    return {
        type: ADD_REPS,
        reps: reps
    };
};

export const addSets = (sets) => {
    return {
        type: ADD_SETS,
        sets: sets
    };
};

export const addRest = (rest) => {
    return {
        type: ADD_REST,
        rest: rest
    };
};

export const addDuration = (duration) => {
    return {
        type: ADD_DURATION,
        duration: duration
    };
};

export const addNotes = (notes) => {
    return {
        type: ADD_NOTES,
        notes: notes
    };
};

export const deleteExercise = (deletedExercise) => {
    return { 
        type: DELETE_EXERCISE,
        deletedExercise : deletedExercise
    };
};

export const addSavedExercise = (selectedExercise) => {
    return {
        type: ADD_SAVED_EXERCISE,
        selectedExercise: selectedExercise
    };
};

export const addSavedExercises = (exercises) => {
    return {
        type: ADD_SAVED_EXERCISES,
        exercises: exercises
    };
};

export const deselectSavedExercise = (savedExercise) => {
    return {
        type: DESELECT_SAVED_EXERCISE,
        savedExercise: savedExercise
    };
};

export const deleteSavedExercise = (deleteExercise) => {
    return {
        type: DELETE_SAVED_EXERCISE,
        deleteExercise: deleteExercise
    };
};

export const dateSelected = () => {
    return {
        type: DATE_SELECTED
    };
};

export const emptyWorkout = (savedExercises) => {
    return {
        type: EMPTY_WORKOUT,
        savedExercises: savedExercises
    }
}
