<template>
  <div class="w-full h-full">
    <div v-if="isConnected" class="flex min-h-full">
      <Sidebar />
      <div class="flex flex-col flex-1 bg-gray-100">
        <Timer />
        <div class="w-full flex">
          <Todo />
        </div>
      </div>
    </div>
    <div v-else>Connection Failed</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      connection: null,
      isConnected: false,
      secondsTillHeartBeat: 10,
    }
  },
  watch: {
    connection: {
      handler() {
        this.secondsTillHeartBeat = 10
      },
    },
    secondsTillHeartBeat: {
      handler(value) {
        if (value < 0) {
          this.heartbeat()
        } else {
          setTimeout(() => {
            this.secondsTillHeartBeat--
          }, 1000)
        }
      },
      immediate: true,
    },
  },
  created() {
    this.connect()
  },
  methods: {
    connect() {
      this.connection = new WebSocket(
        'ws://' + process.env.baseUrl + this.$route.path
      )

      if (!this.connection) {
        console.error("Couldn't establish the Websocket")
        this.isConnected = false
      }

      this.connection.addEventListener('message', ({ data }) => {
        const message = JSON.parse(data)

        switch (message.type) {
          case 'DATA':
            console.log(message.data)
            this.$store.commit('setData', message.data)
            break
          case 'PONG':
            break
          default:
            break
        }
        // console.log(JSON.parse(data))
      })

      this.connection.addEventListener('open', () => {
        console.log(
          'Connected to Websocket: ' +
            'ws://' +
            process.env.baseUrl +
            this.$route.path
        )
        this.isConnected = true

        this.$store.commit('setWebsocket', this.connection)
        this.sendMessage('CONNECT', { username: 'Leon' })
      })

      this.connection.addEventListener('close', () => {
        this.isConnected = false

        this.$store.commit('setWebsocket', null)

        setTimeout(() => {
          this.connect()
        }, 5000)
      })
    },
    heartbeat() {
      if (
        !this.connection ||
        this.connection.readyState !== WebSocket.OPEN ||
        !this.isConnected
      )
        return

      this.sendMessage('PING')
      this.secondsTillHeartBeat = 10
    },
    sendMessage(type, data) {
      if (!this.connection || this.connection.readyState !== WebSocket.OPEN)
        return
      this.connection.send(JSON.stringify({ type, data }))
    },
  },
}
</script>

<style>
html,
body,
#__nuxt,
#__layout {
  font-family: Roboto, ui-sans-serif, system-ui;
  height: 100%;
}
</style>
