import { createStore, combineReducers } from 'redux';

import workoutsReducer from './reducers/workouts';

const rootReducer = combineReducers({
    workouts: workoutsReducer
});

const configureStore = () => {
    return createStore(rootReducer);
};

export default configureStore;