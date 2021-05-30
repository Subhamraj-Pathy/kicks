import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createWrapper } from 'next-redux-wrapper';
import RootReducer from './reducer/rootReducer';

const middleware = [thunk];

const store = () => createStore(RootReducer, compose(applyMiddleware(...middleware)))

export const wrapper = createWrapper(store);
