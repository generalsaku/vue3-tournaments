import { createApp } from "vue";
import { createPinia } from "pinia";

import Main from "./Main.vue";
import router from "./router";

import './index.css'

const app = createApp(Main);

app.use(createPinia());
app.use(router);

app.mount("#app");
