<template>
  <div class="container flex-column-center">
    Hello Demo Page
    <div @click="() => {this.$router.go(-1)}" style="border: 1px solid red; padding: 10px; margin-top: 20px">back Home
      Page
    </div>
  </div>
</template>

<script>
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
  methods: {}
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
