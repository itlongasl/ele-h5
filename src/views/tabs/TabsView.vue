<script setup lang="ts">
import { Tabbar, TabbarItem } from 'vant';
import { RouterView, useRoute, useRouter } from 'vue-router';
import { ref, watch } from 'vue';

// 拿到路由
const route = useRoute();
// 拿到路由器
const router = useRouter();
// 将路由与tab栏绑定
const active = ref(route.name as string);

// Vue3 watch 第一个参数：监听对象   第二个参数：事件回调
// 对路由进行监听，路由改变就跳转
watch(active, (newValue) => {
  router.push({
    name: newValue
  });
});
</script>

<template>
  <div class="tabbar">
    <RouterView></RouterView>
    <Tabbar v-model="active">
      <TabbarItem name="Home" icon="home-o">首页</TabbarItem>
      <TabbarItem name="Order" icon="bars">订单</TabbarItem>
      <TabbarItem name="Me" icon="contact">我的</TabbarItem>
    </Tabbar>
  </div>
</template>

<style scoped></style>
