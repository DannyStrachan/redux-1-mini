// 1
import { createStore } from 'redux'
// 2   initial state object
const initialState = {
    currentValue: 0,
    // 20
    futureValues: [],
    previousValues: []
}

// 10   action types
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
// 19
export const UNDO = 'UNDO';
export const REDO = 'REDO';

// 3
// reducer function
function counter(state = initialState, action) {
    console.log('state in counter /n', state);
    // 11
    let { type } = action
    // 12
    switch(type) {
        // 13
        case INCREMENT:
            return {
                currentValue: state.currentValue + action.amount,
                // 30
                futureValues: [],
                previousValues: [state.currentValue, ...state.previousValues]
            }
            // 14
            case DECREMENT:
                return {
                    currentValue: state.currentValue - action.amount,
                    // 31
                    futureValues: [],
                    previousValues: [state.currentValue, ...state.previousValues]
                }
                // 32
                case UNDO:
                return {
                    currentValue: state.previousValues[0],
                    futureValues: [state.currentValue, ...state.futureValues],
                        previousValues: state.previousValues.slice(1)
                    }
                    // 33
                case REDO:
                    return {
                        currentValue: state.futureValues[0],
                        futureValues: state.futureValues.slice(1),
                        previousValues: [state.currentValue, ...state.previousValues]
                    }
        default:
            return state;
    }
    // 4
}
// 5      18 copy address after counter
export default createStore(counter, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
// invoke function inside createStore