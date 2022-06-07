<template>
  <div class="w-full flex flex-inline justify-between">
    <div
      :class="[checked ? 'text-gray-400' : 'text-gray-700']"
      class="w-56 cursor-pointer select-none"
      @click="setWorker"
    >
      {{ text }}
      <div v-if="!checked" class="text-gray-400 text-xs">{{ worker }}</div>
    </div>
    <div class="flex place-items-center flex-inline ml-2">
      <input
        class="w-6 h-6 rounded-full accent-green-600 border-0 cursor-pointer"
        type="checkbox"
        :checked="checked"
        @click="toggleTodo"
      />
      <div
        class="ml-2 text-gray-400 text-sm cursor-pointer hover:text-red-600 select-none"
        @click="deleteTodo"
      >
        x
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    boardName: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    checked: {
      type: Boolean,
      default: false,
    },
    index: {
      type: Number,
      default: 0,
    },
    worker: {
      type: String,
      default: '',
    },
  },
  methods: {
    toggleTodo() {
      this.$store.commit('toggleTodo', {
        boardName: this.boardName,
        index: this.index,
      })
    },
    deleteTodo() {
      this.$store.commit('deleteTodo', {
        boardName: this.boardName,
        index: this.index,
      })
    },
    setWorker() {
      if (!this.checked) {
        this.$store.commit('setWorker', {
          boardName: this.boardName,
          index: this.index,
        })
      }
    },
  },
}
</script>
