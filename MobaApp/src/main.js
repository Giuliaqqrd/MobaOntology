import { createApp } from 'vue'
import App from '@/App.vue'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

createApp(App).mount('#app')
const app = createApp(App)
app.use(router)
app.mount('#app')
