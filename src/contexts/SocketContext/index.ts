import React from 'react'
import { io, Socket } from 'socket.io-client'

import { API_BASE_URL } from 'config'

export const socket: Socket = io(API_BASE_URL)
export const SocketContext = React.createContext(null)
