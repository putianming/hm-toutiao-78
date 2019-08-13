import myBread from '@/components/my-bread'
import mychannel from '@/components/my-channel'
import myimage from '@/components/my-image'

export default {
  install (Vue) {
    Vue.component(myBread.name, myBread)
    Vue.component(mychannel.name, mychannel)
    Vue.component(myimage.name, myimage)
  }
}
