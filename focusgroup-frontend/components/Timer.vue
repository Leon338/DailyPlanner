<template>
  <div class="w-full mt-2 flex">
    <span
      v-if="!viewSidebar"
      class="absolute font-bold text-sm cursor-pointer text-gray-600 ml-2"
      @click="enableSidebar"
      >Open Sidebar</span
    >
    <div v-if="timer" class="justify-center flex w-full">
      <div class="text-gray-700 text-lg">
        Next Break in <b>{{ timer.minutes }} minutes</b>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    viewSidebar() {
      return this.$store.state.sidebar
    },
    timer() {
      return this.$store.state.timer
    },
  },
  methods: {
    enableSidebar() {
      this.$store.commit('setSidebar', true)
    },
  },
}
</script>
