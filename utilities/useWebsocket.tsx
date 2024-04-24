export const websocketobj = () => {
  const socket = new WebSocket(`ws://192.168.122.212:8000/`)
  return socket
}
