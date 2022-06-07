export const state = () => ({
  username: 'Leon',
  websocket: null,
  sidebar: true,
  timer: null,
  users: [
    { name: 'Leon', online: true },
    { name: 'Dirk', online: false },
  ],
  boards: [
    {
      name: 'Leon',
      todos: [
        { text: 'Hallo', checked: false, worker: '' },
        { text: 'Hallo2', checked: false, worker: '' },
        { text: 'Hallo3', checked: false, worker: '' },
      ],
    },
    { name: 'x', todos: [] },
  ],
  logs: [],
})

export const mutations = {
  setWebsocket(state, socket) {
    state.websocket = socket
  },
  setData(state, data) {
    if (data.users) state.users = data.users
    if (data.timer) state.timer = data.timer
    if (data.boards) state.boards = data.boards
    if (data.logs) state.logs = data.logs

    sendMessage(state, 'Received')
  },

  setSidebar(state, bool) {
    state.sidebar = bool
  },

  startTimer(state, minutes) {
    state.timer = minutes
  },

  addBoard(state, boardName) {
    // exit if name is empty
    if (boardName === undefined || boardName.length < 1) {
      return
    }

    // exit if name exists
    if (getIndexByName(state, boardName) !== -1) {
      return
    }

    sendMessage(state, 'ADD_BOARD', { name: boardName })
  },

  deleteBoard(state, boardName) {
    sendMessage(state, 'DELETE_BOARD', { name: boardName })
  },

  changeBoardName(state, params) {
    const { boardName, newName } = params
    sendMessage(state, 'CHANGE_BOARD_NAME', { name: boardName, newName })
  },

  addTodo(state, props) {
    const { boardName, text } = props
    sendMessage(state, 'ADD_TODO', { board: boardName, text })
  },

  deleteTodo(state, props) {
    const { boardName, index } = props
    sendMessage(state, 'DELETE_TODO', { board: boardName, index })
  },

  toggleTodo(state, props) {
    const { boardName, index } = props
    sendMessage(state, 'TOGGLE_TODO', { board: boardName, index })
  },
  setWorker(state, props) {
    const { boardName, index } = props
    sendMessage(state, 'TOGGLE_WORKER', { board: boardName, index })
  },
}

function sendMessage(state, type, data) {
  if (!state.websocket || state.websocket.readyState !== WebSocket.OPEN) return
  state.websocket.send(JSON.stringify({ type, data }))
}

function getIndexByName(state, name) {
  if (name !== undefined && name.length > 0) {
    for (let i = 0; i < state.boards.length; i++) {
      if (state.boards[i].name.toLowerCase() === name.toLowerCase()) {
        return i
      }
    }
  }
  return -1
}
