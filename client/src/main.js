import { createPinia } from 'pinia'
import { createApp, markRaw } from 'vue'
import vue3GoogleLogin from 'vue3-google-login'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(vue3GoogleLogin, {
  clientId: '69712922364-va91sq6k9i5p3fon4fc409isrbrcdsc6.apps.googleusercontent.com'
})

const pinia = createPinia()
pinia.use(({ store }) => {
  store.router = markRaw(router)
})

app.use(pinia)
app.use(router)

app.mount('#app')