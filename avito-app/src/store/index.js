import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import { lastPostReducer } from './lastPostReducer';
import { postsReducer } from './postsReducer';

const rootReducer = combineReducers({ lastPost: lastPostReducer, addPost: postsReducer })

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))