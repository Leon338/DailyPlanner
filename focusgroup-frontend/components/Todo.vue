<template>
  <div class="w-full px-8">
    <div class="flex flex-wrap gap-4 pt-6">
      <div class="w-full flex flex-inline gap-6">
        <TodoCard v-for="board in boards" :key="board.name" :board="board" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    boards() {
      return this.$store.state.boards
    },
  },
}
</script>
