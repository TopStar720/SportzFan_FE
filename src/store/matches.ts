import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getUpcomingMatchList } from 'apis/match'
import { setLoading } from './app'

export const getMatches = createAsyncThunk('Match/getMatches', async (_data, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const data = await getUpcomingMatchList()
    dispatch(setLoading(false))
    return data
  } catch (e) {
    dispatch(setLoading(false))
    return []
  }
})

export const matchSlice = createSlice({
  name: 'Match',
  initialState: {
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMatches.fulfilled, (state, action) => {
      state.data = action.payload
    })
  },
})

export default matchSlice.reducer
