import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getGameList, getGamesByPagination } from 'apis/game'
import { setLoading } from './app'

export const getGames = createAsyncThunk('Game/getGames', async (_data, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const data = await getGameList()
    dispatch(setLoading(false))
    return data
  } catch (e) {
    dispatch(setLoading(false))
    return []
  }
})

export const getPageGames = createAsyncThunk(
  'Challenge/getPageGames',
  async ({ skip, take }: { skip: number; take: number }, { dispatch }) => {
    try {
      dispatch(setLoading(true))
      const data = await getGamesByPagination(skip, take)
      dispatch(setLoading(false))
      return data
    } catch (e) {
      dispatch(setLoading(false))
      return []
    }
  },
)

export const gameSlice = createSlice({
  name: 'Game',
  initialState: {
    data: [],
    pageData: [],
    totalCount: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGames.fulfilled, (state, action) => {
      state.data = action.payload
    })
    builder.addCase(getPageGames.fulfilled, (state, action) => {
      state.pageData = action.payload?.data
      state.totalCount = action.payload?.count
    })
  },
})

export default gameSlice.reducer
