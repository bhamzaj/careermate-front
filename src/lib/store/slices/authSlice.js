import { createSlice } from '@reduxjs/toolkit'
import storage from 'reduxjs-toolkit-persist/lib/storage'
import { persistReducer } from 'reduxjs-toolkit-persist'

const persistConfig = {
  key: 'auth',
  storage,
}

const initialState = {
  value: { token: null, user: {} },
  employeeAppliedJobs: [],
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value = action.payload
    },
    logout: (state) => {
      state.value = { token: null, user: {} };
    },
    setEmployeeAppliedJobs: (state, action) => {
      let updatedList = state.employeeAppliedJobs;
      const hasJob = updatedList.some((e) => e._id === action.payload._id)
     
      if (hasJob) {
        updatedList = state.employeeAppliedJobs.filter(e => e._id !== action.payload._id)
      } else {
        updatedList.push(action.payload)
      }
      console.log(updatedList)

      state.employeeAppliedJobs = updatedList
    },
  },
})

export const { login, logout, setEmployeeAppliedJobs, removeEmployeeAppliedJob } = authSlice.actions
export default persistReducer(persistConfig, authSlice.reducer)