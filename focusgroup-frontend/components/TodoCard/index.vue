<template>
  <div class="todocard w-96 px-12 py-6 h-min">
    <header class="font-bold text-xl text-gray-600">{{ board.name }}</header>

    <main>
      <TodoItem
        v-for="(todo, index) in board.todos"
        :key="index"
        class="mt-4"
        :text="todo.text"
        :board-name="board.name"
        :checked="todo.checked"
        :index="index"
        :worker="todo.worker"
      />

      <input
        v-model="newTodo"
        type="text"
        class="border rounded-md border-gray-400 mt-4"
        @keyup.enter="addTodo(board.name)"
      />
    </main>

    <footer class="w-full flex justify-center mt-8">
      <div
        class="w-10 h-10 rounded-full absolute text-white bg-green-600 text-center place-items-center grid drop-shadow-lg text-3xl cursor-pointer"
        @click="addTodo(board.name)"
      >
        +
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    board: {
      type: Object,
      default: () => ({ text: '', checked: false }),
    },
  },
  data: () => ({
    newTodo: '',
  }),
  computed: {
    boards() {
      return this.$store.state.boards
    },
  },
  methods: {
    addTodo(boardName) {
      this.$store.commit('addTodo', { boardName, text: this.newTodo })
      this.newTodo = ''
    },
  },
}
</script>

<style scoped>
.todocard {
  background-color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
}
</style>
