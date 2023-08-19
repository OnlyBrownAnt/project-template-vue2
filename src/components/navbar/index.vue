<!--
控制数据源主要是vue-router route.meta，包括导航栏标题和左右导航栏显示效果
次要控制数据源是vuex store，主要是协助实现标题栏标题的实时替换和标题栏的显示控制
在路由钩子beforeEach中，将route.meta的需要实时修改的变量，实时赋给vuex store进行保存
route只有对象的最表层支持响应式监听，所以需要vuex store协助进行显示控制
-->
<template>
  <div v-if="navShow" class="container_nav" :style="navStyleTypes[navStyleType].containerStyle">
    <van-nav-bar
      :border="navStyleTypes[navStyleType].border"
      :fixed="navStyleTypes[navStyleType].fixed"
      :placeholder="navStyleTypes[navStyleType].placeholder"
      :style="navStyleTypes[navStyleType].style"
      :safe-area-inset-top="true"
      @click-left="onClickLeft"
      @click-right="onClickRight">
      <template #left v-if="$route.meta.navLeft === undefined ? true : $route.meta.navLeft">
        <div class="left flex-row-center">
          <img :src="require('@/assets/images/navbar/icon_navbar_01.png')" alt="">
        </div>
      </template>
      <template #title>
        <div class="title">
          {{ navTitle }}
        </div>
      </template>
      <template #right v-if="$route.meta.navRight">
        <div class="right flex-row-center">
          <img :src="require('@/assets/images/navbar/icon_navbar_02.png')" alt="">
        </div>
      </template>
    </van-nav-bar>
  </div>
</template>
<script>
import {NavBar, Icon} from "vant";
import {isNull} from "@/utils/common";

export default {
  name: 'NavbarIndex',
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon
  },
  data() {
    return {
      navStyleTypes: [
        {
          fixed: false,
          placeholder: true,
          border: true,
          style: {'background-color': '#fffff', 'border-bottom': '1 px solid #eeeeee', 'position': 'fixed'},
          containerStyle: {'height': '46px'}  // 参考vant导航栏默认高度
        },
        {
          fixed: false,
          placeholder: false,
          border: false,
          style: {'background-color': 'rgba(255,0,0,0)', 'border-bottom': 'none', 'position': 'fixed'},
          containerStyle: {}
        },
        {
          fixed: false,
          placeholder: false,
          border: false,
          style: {'border-bottom': 'none'},
          containerStyle: {}
        }
      ]
    }
  },
  created() {

  },
  mounted() {

  },
  computed: {
    /**
     * 0 置顶，背景不透明
     * 1 置顶，背景透明
     * 2 不置换顶，背景不透明
     * @returns {any}
     */
    navStyleType() {
      return this.$route.meta.navStyleType ? this.$route.meta.navStyleType : 0;
    },
    navShow() {
      return (this.$store.state.common.isHeaderShow &&
        (this.$route.meta.navShow === undefined ? true : this.$route.meta.navShow));
    },
    navTitle() {
      return this.$store.state.common.navTitle;
    }
  },
  watch: {},
  methods: {
    /**
     * 左边按钮响应
     * 优先判断navLeftOperate参数
     * { type, value }
     * type = 1, replace(value)
     * type = 2, go(value)
     */
    onClickLeft() {
      const navLeftOperateType = this.$route.meta.navLeftOperateType;
      if (!isNull(navLeftOperateType)) {
        const navLeftOperateValue = this.$route.meta.navLeftOperateValue;
        if (navLeftOperateType == 1) {
          this.$router.replace(navLeftOperateValue);
        } else if (navLeftOperateType == 2) {
          this.$router.go(parseInt(navLeftOperateValue));
        }
      } else {
        this.$router.go(-1);
      }
    },
    onClickRight() {
      this.$router.replace('/');
    },
  }
}
</script>
<style lang="less" scoped>
* {
  box-sizing: border-box;
}

.container_nav {
  width: 100vw;

  ::v-deep .van-nav-bar__placeholder {
    width: 100vw;
  }

  ::v-deep .van-nav-bar {
    width: 100vw;
  }

  ::v-deep .van-nav-bar__content {
    .van-nav-bar__left {
      padding: 0 16px;

      .left {
        width: 100%;
        height: 100%;

        img {
          width: 12px;
          height: 20px;
        }
      }
    ;
    }

    .van-nav-bar__title {
      .title {
        width: 100%;
        height: 100%;
        font-size: 18px;
      }
    ;
    }

    .van-nav-bar__right {
      padding: 0 16px;

      .right {
        width: 100%;
        height: 100%;

        img {
          width: 24px;
          height: 24px;
        }
      }
    ;
    }
  }
}
</style>
