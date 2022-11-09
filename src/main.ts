import { createApp } from "vue";
import { createPinia } from "pinia";

import Main from "./Main.vue";
import createRouter from "./router";

import "./index.css";

const app = createApp(Main);

app.use(createPinia());
app.use(createRouter());

app.mount("#app");
