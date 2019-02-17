import {NEXT_STEP, PREV_STEP, SKIP_STEP} from "../actions/action-types";

const initialState = {
    stepState: 0
};

const importStepsReducer = (state = initialState, action) => {
    switch (action.type) {
        case NEXT_STEP:
            return{
                ...state,
                stepState: state.stepState += 1
            };
        case PREV_STEP:
            return{
                ...state,
                stepState: state.stepState -= 1
            };
        case SKIP_STEP:
            return{
                ...state,
                stepState: this.state.stepState + action.payload
            };
        default:
            return state;
    }
};

export default importStepsReducer;