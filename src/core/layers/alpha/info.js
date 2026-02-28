import { Layer } from "@/core/layer";

export default {
  first: {
    title: "TMT Rewritten",
    text: "Welcome to The Modding Tree Rewritten!<br>There is the first Layer - Alpha.<br><br>欢迎来到模组树重制版！<br>这里是第一层——阿尔法。"
  },
  newLetter: {
    title: "Beta",
    text: "You have unlocked the second layer. New upgrades are provided!<br><br>你已解锁第二层。现在出现了新升级！",
    isUnlocked: () => Layer.beta.milestones[0].isReached
  }
};