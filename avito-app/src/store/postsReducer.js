const defaultState = {
    postArr: []
}

export const postsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD_POSTS':
            return {...state, postArr: action.payload }
            // case 'GET_CUSTOMER':
            //     return {...state, cash: state.cash - action.payload }
        default:
            return state
    }
}