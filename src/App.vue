<template>
  <div id="main-con">
   <div >
    <router-view  v-slot="{ Component }">
      <keep-alive>
        <component v-if="$route.meta.keepAlive" :is="Component" :key="$route.name"></component>
      </keep-alive>
      <component v-if="!$route.meta.keepAlive" :is="Component" :key="$route.name"></component>
    </router-view>
   </div>
 
    
  </div>
</template>

<script setup>

</script>

<style scoped>
  @import './styles/common.css';
</style>