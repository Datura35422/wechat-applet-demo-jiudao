// 定义classic中组件的公用属性和数据、方法、生命周期函数,behavior为构造器
let classicBeh = Behavior({
  properties: {
    img: String,
    content: String,
    hidden: Boolean
  }
})

export {
  classicBeh
}