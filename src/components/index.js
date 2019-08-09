import myBread from '@/components/my-bread'
import mychannel from '@/components/my-channel'

export default {
  install (Vue) {
    Vue.component(myBread.name, myBread)
    Vue.component(mychannel.name, mychannel)
  }
}
