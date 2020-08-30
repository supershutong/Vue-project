import config from "./config"
import { LIST_TYPE } from "../module/topic/store"

export const init = () => {
  config.regist("language", {
    navs: {
      chinese: {
        [LIST_TYPE.HOT]: "热门",
        [LIST_TYPE.NEW]: "最新",
        [LIST_TYPE.TOP]: "热榜",
        about: "关于我"
      },
      en: {
        [LIST_TYPE.HOT]: "hot",
        [LIST_TYPE.NEW]: "new",
        [LIST_TYPE.TOP]: "top",
        about: "about"
      }
    }
  })
}
