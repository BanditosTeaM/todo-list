import { createApp } from 'vue'
import Router from './router.js'
import App from './App.vue'
import './style.css'

const app = createApp(App)
app.use(Router)
app.mount('#app')
