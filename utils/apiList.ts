export type dataType<T> = Record<string, T>
export type methodType = 'POST' | 'GET' | 'DELETE'

export interface urlProps {
  url: string
  method: methodType
}

const data: dataType<urlProps> = {
  /**
   *  @demo (demo)
   */
  demo: {
    url: 'http://t.weather.sojson.com/api/weather/city/101030100',
    method: 'GET',
  },

  // 登录
  // POST /app/login
  // 接口ID：264493377
  // 接口地址：https://app.apifox.com/link/project/5905439/apis/api-264493377
  login: {
    url: '/app/login',
    method: 'POST',
  },

  // 发送邮箱验证码
  // POST /app/sendEmailVerification
  // 接口ID：264288081
  // 接口地址：https://app.apifox.com/link/project/5905439/apis/api-264288081
  sendEmailVerification: {
    url: '/app/sendEmailVerification',
    method: 'POST',
  },

  // 用户注册
  // POST /app/register
  // 接口ID：264784811
  // 接口地址：https://app.apifox.com/link/project/5905439/apis/api-264784811
  register: {
    url: '/app/register',
    method: 'POST',
  },

  // 获取用户信息
  // POST /app/infoAccount
  // 接口ID：264860342
  // 接口地址：https://app.apifox.com/link/project/5905439/apis/api-264860342
  infoAccount: {
    url: '/app/infoAccount',
    method: 'POST',
  },

  // 获取商品列表
  // POST /app/listGoods
  // 接口ID：268137927
  // 接口地址：https://app.apifox.com/link/project/5905439/apis/api-268137927
  listGoods: {
    url: '/app/listGoods',
    method: 'POST',
  },

  // 商品详情
  // POST /app/infoGoods
  // 接口ID：268485006
  // 接口地址：https://app.apifox.com/link/project/5905439/apis/api-268485006
  infoGoods: {
    url: '/app/infoGoods',
    method: 'POST',
  },

  // 订单列表（购买NFT）
  // POST /app/listOrder
  // 接口ID：270313132
  // 接口地址：https://app.apifox.com/link/project/5905439/apis/api-270313132
  listOrder: {
    url: '/app/listOrder',
    method: 'POST',
  },

  // 订单详情
  // POST /app/infoOrder
  // 接口ID：270455320
  // 接口地址：https://app.apifox.com/link/project/5905439/apis/api-270455320
  infoOrder: {
    url: '/app/infoOrder',
    method: 'POST',
  },

  // 已购买NFT列表
  // POST /app/listNFT
  // 接口ID：270538947
  // 接口地址：https://app.apifox.com/link/project/5905439/apis/api-270538947
  listNFT: {
    url: '/app/listNFT',
    method: 'POST',
  },
}
export default data
