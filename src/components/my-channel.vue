<template>
  <el-select :value="value" clearable placeholder="请选择" @change="fn">
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {

      channelOptions: []
    }
  },
  // watch: {
  //   myValue: function (newVall, oldVall) {
  //     if (newVall === '') {
  //       this.myValue = null
  //     }
  //   }
  // },
  created () {
    this.getchannelOptions()
  },
  methods: {

    fn (val) {
      if (val === '')val = null
      this.$emit('input', val)
    },
    async getchannelOptions () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.channelOptions = data.channels
    }
  }
}
</script>

<style scoped lang='less'></style>
