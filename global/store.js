import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
// import { createWrapper } from 'next-redux-wrapper';
import RootReducer from './reducer/rootReducer';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';



const persistConfig = {
  timeout: 0,
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, RootReducer);

const store =  createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));

const persistor = persistStore(store);

export { store, persistor }

// export const wrapper = createWrapper(store);
