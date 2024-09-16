import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'

import components from './components/ui/index'

const app = createApp(App)

components.forEach(component => {
    app.component(component.name ?? "", component)
})

app
    .use(router)
    .use(store)
    .mount('#app')
