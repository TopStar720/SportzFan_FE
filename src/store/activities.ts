import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getActivityList } from 'apis/activity'
import { setLoading } from './app'

export const getActivities = createAsyncThunk('Activity/getActivities', async (_data, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const data = await getActivityList()
    dispatch(setLoading(false))
    return data
  } catch (e) {
    dispatch(setLoading(false))
    return []
  }
})

export const activitySlice = createSlice({
  name: 'Activity',
  initialState: {
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getActivities.fulfilled, (state, action) => {
      state.data = action.payload
    })
  },
})

export default activitySlice.reducer
