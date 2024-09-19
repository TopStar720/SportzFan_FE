import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getChallengeByPagination, getChallengeList } from 'apis/challenge'
import { setLoading } from './app'

export const getChallenges = createAsyncThunk('Challenge/getChallenge', async (_data, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const data = await getChallengeList()
    dispatch(setLoading(false))
    return data
  } catch (e) {
    dispatch(setLoading(false))
    return []
  }
})

export const getPageChallenges = createAsyncThunk(
  'Challenge/getPageChallenge',
  async ({ skip, take }: { skip: number; take: number }, { dispatch }) => {
    try {
      dispatch(setLoading(true))
      const data = await getChallengeByPagination(skip, take)
      dispatch(setLoading(false))
      return data
    } catch (e) {
      dispatch(setLoading(false))
      return []
    }
  },
)

export const challengeSlice = createSlice({
  name: 'Challenge',
  initialState: {
    data: [],
    pageData: [],
    totalCount: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getChallenges.fulfilled, (state, action) => {
      state.data = action.payload
    })
    builder.addCase(getPageChallenges.fulfilled, (state, action) => {
      state.pageData = action.payload?.data
      state.totalCount = action.payload?.count
    })
  },
})

export default challengeSlice.reducer
