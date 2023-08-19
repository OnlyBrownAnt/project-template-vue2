<template>
  <div class="container flex-column-center">
    Hello Home Page
    <div @click="() => {this.$router.push('demo')}" style="border: 1px solid red; padding: 10px; margin-top: 20px">to
      Demo Page
    </div>
    <div @click="mockRequest" style="border: 1px solid red; padding: 10px; margin-top: 20px">Request Demo</div>
  </div>
</template>

<script>
import {mockApi001} from "@/api/mock";
import {defaultErrorToast} from "@/utils/common";

export default {
  name: 'HomeIndex',
  components: {},
  data() {
    return {}
  },
  computed: {},
  created() {
  },
  mounted() {
  },
  methods: {
    mockRequest() {
      mockApi001({data: {}}).then(res => {
        console.log('success!');
      }).catch(err => {
        defaultErrorToast(err.message);
        throw new Error(err.message);
      })
    }
  }
}
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
}

.container {
  width: 100vw;
  box-sizing: border-box;
  padding-top: 50px;
  padding-bottom: 50px;
}
</style>
