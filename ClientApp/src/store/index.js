import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import map from './map'
import filter from './filter'
import pagination from './pagination'
import user from './user'

//cream un store care tine toate state-urile pe care le vrem
const reducer = combineReducers({
  filter,
  pagination,
  map,
  user
})
const store = configureStore({
  reducer,
})
export default store;