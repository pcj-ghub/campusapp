<template>
  <div id="app">
      <router-view name="banner"></router-view>
      <router-view></router-view>
      <router-view name="er_nav"></router-view>
  </div>
</template>

<script>
import $ from 'jquery'
import '../node_modules/bootstrap/dist/js/bootstrap'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
export default {
  name: 'App'
}
</script>

<style>

</style>
