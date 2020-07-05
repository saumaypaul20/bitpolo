import io from 'socket.io-client';
import * as  ENDPOINT from '../api/constants'
const socket = io(ENDPOINT.WEBSOCKET, {
    transports: ['websocket'],
  })

