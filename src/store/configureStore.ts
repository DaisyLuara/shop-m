import { createStore, applyMiddleware, combineReducers } from 'redux'
// 持久化
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import authReducer from '../reducers/authReducer'
import logger from 'redux-logger'
const persistConfig = {
  key: 'root',
  storage
}
const authConfig = {
  key: 'auth',
  storage
}
const rootReducer = combineReducers({
  auth: persistReducer(authConfig, authReducer)
})
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = createStore(persistedReducer, applyMiddleware(logger))
export const persistor = persistStore(store)
