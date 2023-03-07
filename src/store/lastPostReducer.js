const defaultState = {
    id: 0
}


export const lastPostReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD_URL_ID':
            return {...state, id: action.payload }
        default:
            return state
    }
}