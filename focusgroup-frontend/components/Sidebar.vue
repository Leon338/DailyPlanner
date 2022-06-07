<template>
  <div
    v-if="viewSidebar"
    class="w-96 p-2 bg-white drop-shadow-md border-r m-0 shrink-0"
  >
    <div class="h-full">
      <div class="justify-between flex flex-col h-full">
        <header class="text-lg font-medium text-gray-600 mr-6">
          <div class="flex justify-between">
            Settings
            <span
              class="font-bold text-sm cursor-pointer grid place-items-center text-gray-600"
              @click="disableSidebar"
              >Hide Sidebar</span
            >
          </div>
        </header>

        <div>
          <header class="font-medium text-gray-600">Users</header>
          <main class="mx-6">
            <div
              v-for="user in users"
              :key="user.name"
              class="flex justify-between"
            >
              {{ user.name }}
              <span
                class="text-green-600 font-bold text-sm grid place-items-center"
                >Online</span
              >
            </div>
          </main>
        </div>

        <div>
          <header class="font-medium text-gray-600">Timer</header>
          <main class="mx-6">
            <div class="flex justify-between">
              <div>
                <input
                  v-model="minutes"
                  type="text"
                  value="120"
                  class="w-7 mr-2"
                /><small>minutes</small>
              </div>
              <span
                class="font-bold text-sm cursor-pointer grid place-items-center text-green-600 border border-green-600 px-2 rounded-md"
                @click="startTimer"
                >Start</span
              >
            </div>
          </main>
        </div>

        <div>
          <header class="font-medium text-gray-600">Boards</header>
          <main class="mx-6">
            <div
              v-for="board in boards"
              :key="board.name"
              class="flex justify-between mt-1"
            >
              <input
                type="text"
                :value="board.name"
                @keyup.enter="changeBoardName(board.name, $event.target.value)"
              />
              <span
                class="font-bold text-sm cursor-pointer grid place-items-center text-red-600 border border-red-600 px-2 rounded-md"
                @click="deleteBoard(board.name)"
                >Delete</span
              >
            </div>

            <div class="flex justify-between mt-1">
              <input v-model="boardName" type="text" placeholder="Board Name" />
              <span
                class="font-bold text-sm cursor-pointer grid place-items-center text-green-600 border border-green-600 px-2 rounded-md"
                @click="addBoard(boardName)"
                >Add Board</span
              >
            </div>
          </main>
        </div>

        <!-- <div>
          <header class="font-medium text-gray-600">New Day</header>
          <main class="mx-6">
            <div class="flex justify-between">
              Reset Boards
              <span
                class="font-bold text-sm cursor-pointer grid place-items-center text-red-600 border border-red-600 px-2 rounded-md"
                >Reset</span
              >
            </div>
          </main>
        </div>
        -->

        <div class="mt-auto">
          <!--
          <header class="font-medium text-gray-600">Event Log</header>
          <main class="h-80 w-full border overflow-y-scroll">
            <div class="flex flex-inline gap-2">
              <span>17:41</span>
              Leon has deleted "Read an Article" dsaggds dsggds gdsdsg gds
            </div>
            <div class="flex flex-inline gap-2">
              <span>17:41</span>
              Leon has deleted "Read an Article" dsaggds dsggds gdsdsg gds
            </div>
            <div class="flex flex-inline gap-2">
              <span>17:41</span>
              Leon has finished "Read an Article"
            </div>
          </main>
          -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    boardName: '',
    minutes: 60,
  }),
  computed: {
    viewSidebar() {
      return this.$store.state.sidebar
    },
    users() {
      return this.$store.state.users
    },
    boards() {
      return this.$store.state.boards
    },
  },

  methods: {
    disableSidebar() {
      this.$store.commit('setSidebar', false)
    },
    startTimer() {
      this.$store.commit('startTimer', this.minutes)
    },
    deleteBoard(name) {
      this.$store.commit('deleteBoard', name)
    },
    addBoard() {
      this.$store.commit('addBoard', this.boardName)
      this.boardName = ''
    },
    changeBoardName(boardName, newName) {
      this.$store.commit('changeBoardName', { boardName, newName })
    },
  },
}
</script>
