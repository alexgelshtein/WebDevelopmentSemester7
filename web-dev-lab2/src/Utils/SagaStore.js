
import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import templatesReducer from './reducers/templatesReducer';
import contractReducer from './reducers/contractReducer';
import rootSaga from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();
const middlewareList = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  middlewareList.push(logger);
}

const rootReducer = combineReducers({
  templatesState: templatesReducer,
  contractState: contractReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(middlewareList),
);
sagaMiddleware.run(rootSaga);

export default store;