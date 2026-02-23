import eruda from "eruda";
import { init } from "./game";

function isLocalEnvironment() {
  const href = window.location.href;
  return href.includes("file") || href.includes("127.0.0.1") || href.includes("localhost") || href.includes("8080");
}

if (isLocalEnvironment()) {
  eruda.init();
}
init();