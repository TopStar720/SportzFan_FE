import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAssetList, getMyAssetList } from 'apis/asset'
import { setLoading } from './app'

export const getAssets = createAsyncThunk('Asset/getAssets', async (_data, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const data = await getAssetList()
    dispatch(setLoading(false))
    return data
  } catch (e) {
    dispatch(setLoading(false))
    return { count: 0, data: [] }
  }
})

export const getMyAssets = createAsyncThunk('Asset/getMyAssets', async (_data, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const data = await getMyAssetList()
    dispatch(setLoading(false))
    return data
  } catch (e) {
    dispatch(setLoading(false))
    return { count: 0, data: [] }
  }
})

export const assetSlice = createSlice({
  name: 'Asset',
  initialState: {
    assets: { count: 0, data: [] },
    myAssets: { count: 0, data: [] },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAssets.fulfilled, (state, action) => {
        state.assets = action.payload
      })
      .addCase(getMyAssets.fulfilled, (state, action) => {
        state.myAssets = action.payload
      })
  },
})

export default assetSlice.reducer
