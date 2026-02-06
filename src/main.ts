import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import 'primeicons/primeicons.css';
import '@/assets/styles/main.scss';
import App from './App.vue';

const app = createApp(App);
const pinia = createPinia();

app.config.errorHandler = (error, instance, info) => {
  console.error('[Vue error]', {
    error,
    instance,
    info,
  });
};

window.addEventListener('error', event => {
  console.error('[Global error]', event.error);
});

app
  .use(pinia)
  .use(PrimeVue, {
    theme: {
      preset: Aura,
      options: {
        darkModeSelector: 'system',
      }
    }
  })
  .mount('#app');
