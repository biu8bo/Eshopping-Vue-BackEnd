<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import {initWebSokcet} from "@/utils/webSocket"
export default {
  name: 'App',
  created(){
    initWebSokcet();
  }
}
</script>
