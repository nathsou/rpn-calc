import {
    createStore
} from 'redux';
import {
    reducer
} from './reducers';
import {
    loadState,
    saveState
} from './persistState';
import throttle from 'lodash.throttle';

const configureStore = () => {
    const store = createStore(
        reducer,
        loadState(),
        //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    store.subscribe(throttle(() => {
        saveState(store.getState());
    }, 1000));

    return store;
};

export default configureStore;