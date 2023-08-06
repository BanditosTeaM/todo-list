import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Router from './router.js'
import App from './App.vue'
import './style.css'

const app = createApp(App)
const pinia = createPinia()

app.use(Router)
app.use(pinia)

app.mount('#app')
