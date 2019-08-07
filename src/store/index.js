// 生命一个常量 用来当作 这个 sessionStorage 的 key 值
// sessionStorage 是本地存储，用来存储数据 setItem是设置  getItem是获取

// window.sessionStorage.setItem(键, 值)
// sessionStorage 不能保持 对象等复杂数据类型，只能保存字符串
// 这里 因为后面需要用到 对象形式，所以需要用 json 方式存储
const KEY = 'hm-toutiao-user'

export default {
  setUser (user) {
    window.sessionStorage.setItem(KEY, JSON.stringify(user))
  },
  // 获取
  getUser () {
    //  JSON.parse 转成对象
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  },
  clearUser () {
    window.sessionStorage.removeItem(KEY)
  }
}
