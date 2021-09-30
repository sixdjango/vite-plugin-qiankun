
console.log('调用生命周期2')
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
console.log('调用生命周期1')
// vite-plugin-qiankun helper
import { renderWithQiankun, qiankunWindow } from "../../../es/helper";

console.log('调用生命周期2')
function render(props: any) {
  const { container } = props;
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    container
      ? container.querySelector("#root")
      : document.getElementById("root")
  );
}
console.log('调用生命周期')
renderWithQiankun({
  mount(props) {
    console.log("viteapp mount");
    render(props);
  },
  bootstrap() {
    console.log("bootstrap");
  },
  unmount(props: any) {
    console.log("viteapp unmount");
    const { container } = props;
    const mountRoot = container?.querySelector("#root");
    ReactDOM.unmountComponentAtNode(
      mountRoot || document.querySelector("#root")
    );
  },
});

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({});
}
