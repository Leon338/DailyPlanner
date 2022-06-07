<template>
  <div class="flex min-h-full">
    <Sidebar />
    <div class="flex flex-col flex-1 bg-gray-100">
      <Timer />
      <div class="w-full flex">
        <Todo />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
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
