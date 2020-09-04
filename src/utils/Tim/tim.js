import TIM from 'tim-js-sdk'
import COSSDK from 'cos-js-sdk-v5'

// 初始化 SDK 实例
const mytim = TIM.create({
  SDKAppID: 1400351872
})

window.setLogLevel = mytim.setLogLevel

// 无日志级别
mytim.setLogLevel(0)

// 注册 cos
mytim.registerPlugin({'cos-js-sdk':COSSDK})
export default mytim
