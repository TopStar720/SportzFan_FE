import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getCountIsntSeen, getNotificationList, removeNotification, seeNotification } from 'apis/notification'
import { setLoading } from './app'

export const refreshNotifications = createAsyncThunk(
  'Notifications/refreshNotifications',
  async (_data, { dispatch }) => {
    try {
      const data = await getNotificationList(0, 5)
      return data
    } catch (e) {
      return []
    }
  },
)

export const getNotifications = createAsyncThunk(
  'Notifications/getNotifications',
  async ({ skip, take }: { skip: number; take: number }, { dispatch }) => {
    try {
      dispatch(setLoading(true))
      const data = await getNotificationList(skip, take)
      dispatch(setLoading(false))
      return data
    } catch (e) {
      dispatch(setLoading(false))
      return []
    }
  },
)

export const getUnreadCount = createAsyncThunk('Notifications/getCountIsntSeen', async (_data, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const data = await getCountIsntSeen()
    dispatch(setLoading(false))
    return data
  } catch (e) {
    dispatch(setLoading(false))
    return []
  }
})

export const openNotification = createAsyncThunk(
  'Notifications/openNotification',
  async ({ id }: { id: string }, { dispatch }) => {
    try {
      dispatch(setLoading(true))
      const data = await seeNotification(id)
      dispatch(setLoading(false))
      return data
    } catch (e) {
      dispatch(setLoading(false))
      return []
    }
  },
)

export const deleteNotification = createAsyncThunk('Notifications/deleteNotification', async (_data, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const data = await removeNotification()
    dispatch(setLoading(false))
    return data
  } catch (e) {
    dispatch(setLoading(false))
    return { success: false }
  }
})

export const notificationSlice = createSlice({
  name: 'Notification',
  initialState: {
    data: [],
    isntSeen: 0,
    totalCount: 0,
  },
  reducers: {
    addNewNotificaiton: (state, action) => {
      state.isntSeen = state.isntSeen + 1
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNotifications.fulfilled, (state, action) => {
      state.data = state.data.concat(action.payload.data)
      state.totalCount = action.payload.count
    })
    builder.addCase(refreshNotifications.fulfilled, (state, action) => {
      state.data = action.payload.data
      state.totalCount = action.payload.count
    })
    builder.addCase(getUnreadCount.fulfilled, (state, action) => {
      state.isntSeen = action.payload.count
    })
    builder.addCase(openNotification.fulfilled, (state, action) => {
      const temp = [...state.data]
      const idx = temp.findIndex((d) => d.id === action.payload.id)
      if (idx !== -1) {
        temp[idx].isSeen = true
        state.data = temp
      }
      if (action.payload.id) {
        state.isntSeen = state.isntSeen - 1
      }
    })
    builder.addCase(deleteNotification.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.data = []
        state.isntSeen = 0
        state.totalCount = 0
      }
    })
  },
})

export const { addNewNotificaiton } = notificationSlice.actions

export default notificationSlice.reducer
