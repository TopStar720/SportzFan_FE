import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getProfile } from 'apis/user'
import { getTeam } from 'apis/team'
import { setLoading } from './app'
import { UserData } from 'views/Profile/types'
import { TeamData } from './types'

const initialState: { data: UserData; teamData: TeamData } = {
  data: {
    id: '',
    email: '',
    userName: '',
    firstName: '',
    lastName: '',
    avatar: '',
    tokenId: '',
    stripeCustomerId: '',
    birthday: '',
    phone: '',
    gender: '',
    locationCountry: '',
    locationState: '',
    locationCity: '',
    locationPostcode: '',
    favPlayer: '',
    fanType: '',
    kudosAmount: 0,
    tokenAmount: 0,
  },
  teamData: {
    name: '',
    logo: '',
    price: 0,
    kudosToTire1: 0,
    kudosToTire2: 0,
    kudosToTire3: 0,
    kudosToTire4: 0,
    memberLevelName1: '',
    memberLevelName2: '',
    memberLevelName3: '',
    memberLevelName4: '',
  },
}

export const getUserData = createAsyncThunk('User/getUserData', async (_data, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const data = await getProfile()
    dispatch(setLoading(false))
    return data
  } catch (e) {
    dispatch(setLoading(false))
    return initialState.data
  }
})

export const getTeamData = createAsyncThunk('User/getTeamData', async (_data, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const data = await getTeam()
    dispatch(setLoading(false))
    return data
  } catch (e) {
    dispatch(setLoading(false))
    return initialState.teamData
  }
})

export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.fulfilled, (state, action) => {
        state.data = action.payload
      })
      .addCase(getTeamData.fulfilled, (state, action) => {
        state.teamData = action.payload
      })
  },
})

export default userSlice.reducer
