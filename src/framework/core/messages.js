import { createI18n } from 'vue-i18n'

const messages = {
  zh: {
    youHaveX: "你拥有 {amount} {name}。",
    secondShort: "秒",
    fps: "当前帧率：{frames} 帧/秒",
    reset: "重置以获得 {value}",
    nextAt: "下一个需要：{value}",
    currently: "当前：{value}",
    cost: "价格：{value}",
    clickHint: "点击任意处继续",
    hardReset: "重置游戏",
    hardResetMessage: "输入“{value}”以继续。"
  },
  en: {
    youHaveX: "You have {amount} {name}.",
    secondShort: "sec",
    fps: "Current FPS: {frames} frame/sec|Current FPS: {frames} frames/sec",
    reset: "Reset for +{value}",
    nextAt: "Next at: {value}",
    currently: "Currently: {value}",
    cost: "Cost: {value}",
    clickHint: "Click to continue",
    hardReset: "Hard Reset",
    hardResetMessage: "Input \"{value}\" to continue."
  }
}

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages,
  legacy: false
})

export default i18n;