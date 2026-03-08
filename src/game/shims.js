import eruda from "eruda";
import * as customComponents from "./components/tabs";
import * as defaultComponents from "@framework/components/tabs";
import { LayerData, LayerLayout, LayerConnections } from "./layers";
import { registerLayer } from "@framework/core/layer";
import { registerCustomComponents } from "@framework/core/ui";

function isLocalEnvironment() {
  const href = window.location.href;
  return href.includes("file") || href.includes("127.0.0.1") || href.includes("localhost") || href.includes("192.168");
}

if (isLocalEnvironment()) {
  eruda.init();
}

registerLayer({
  layers: LayerData,
  layout: LayerLayout,
  connections: LayerConnections
});

registerCustomComponents({
  ...defaultComponents,
  ...customComponents
});