<template>
  <div id="app">
    <Navbar/>
    <transition>
      <keep-alive :include="keepAliveList">
        <router-view v-wechat-title="navTitle"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import Navbar from "@/components/navbar/index.vue";
import {isAlipayOrWeChat, isMobile} from "@/utils/common";

;
export default {
  name: 'App',
  components: {
    Navbar
  },
  computed: {
    keepAliveList() {
      return this.$store.state.common.keepAliveList;
    },
    keepAliveSet() {
      return this.$store.state.common.keepAliveSet;
    },
    navTitle() { // TODO 与自带标题栏标题一致
      return this.$store.state.common.navTitle;
    }
  },
  watch: {
    /**
     * 监听处理keepalive缓存。
     * 如果是返回到首页就清理所有的keepalive，否则只处理未在keepaliveList中的组件。
     * @param to
     * @param from
     */
    '$route': function (to, from) {
      if (/^\/$/.test(to.path)) {
        this.$store.commit('common/removeFromKeepAliveAll');
        this.clearCacheIfNecessary();
      } else {
        this.clearCacheIfNecessary();
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    /**
     * 清理未在keepaliveList中的组件缓存。
     */
    clearCacheIfNecessary() {
      if (this.$refs.keepAlive) {
        this.$nextTick(() => {
          const cachedComponents = this.$refs.keepAlive.$children;
          cachedComponents.forEach((component) => {
            if (!this.keepAliveSet.has(component.constructor.name)) {
              component.$destroy();
            }
          });
        });
      }
    },
    init() {
      // 标题栏显示初始化
      if (isAlipayOrWeChat()) {
        this.$store.commit('common/setIsHeaderShow', false);
      } else {
        this.$store.commit('common/setIsHeaderShow', true);
      }

      // 非首页回到首页
      // TODO 只要刷新也强制回到首页
      if (isMobile()) {
        this.$router.replace('/');
      }
    }
  },
  created() {
    this.init();
  }
}
</script>

<style lang="less">
#app {
  min-width: 100%;
  min-height: 100%;
  background-color: #f9f9fb;
}
</style>
