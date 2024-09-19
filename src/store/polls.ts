import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getPollList, getPollsByPagination } from 'apis/poll'
import { setLoading } from './app'

export const getPolls = createAsyncThunk('Poll/getPolls', async (_data, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const data = await getPollList()
    dispatch(setLoading(false))
    return data
  } catch (e) {
    dispatch(setLoading(false))
    return []
  }
})

export const getPagePolls = createAsyncThunk(
  'Challenge/getPagePolls',
  async ({ skip, take }: { skip: number; take: number }, { dispatch }) => {
    try {
      dispatch(setLoading(true))
      const data = await getPollsByPagination(skip, take)
      dispatch(setLoading(false))
      return data
    } catch (e) {
      dispatch(setLoading(false))
      return []
    }
  },
)

export const pollSlice = createSlice({
  name: 'Poll',
  initialState: {
    data: [],
    pageData: [],
    totalCount: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPolls.fulfilled, (state, action) => {
      state.data = action.payload
    })
    builder.addCase(getPagePolls.fulfilled, (state, action) => {
      state.pageData = action.payload?.data
      state.totalCount = action.payload?.count
    })
  },
})

export default pollSlice.reducer
