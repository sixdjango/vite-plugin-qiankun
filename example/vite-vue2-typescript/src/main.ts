import Vue from 'vue';
import VCA, { createApp, h } from '@vue/composition-api';
import router from './router';
import AddModules from './modules/index';
import store from './store';
import App from './App.vue';
import { renderWithQiankun, qiankunWindow } from '../../../es/helper';
import './index.css';

Vue.use(VCA);

AddModules({ app: Vue, store, router });

Vue.config.productionTip = false;

const app = createApp({
  router,
  store,
  render: () => h(App)
});

function render(props) {
  app.mount('#app');
}

console.log('调用生命周期');
renderWithQiankun({
  mount(props) {
    console.log('viteapp mount');
    render(props);
  },
  bootstrap() {
    console.log('bootstrap');
  },
  unmount(props: any) {
    console.log('viteapp unmount');
    const { container } = props;
    app.unmount();
  }
});

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({});
}
