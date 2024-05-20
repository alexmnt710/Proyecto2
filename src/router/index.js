import { createRouter, createWebHistory } from 'vue-router';
import login from '../components/login.vue';
import administrador from '../components/Admin/administrador.vue';
const router = createRouter({
    history: createWebHistory('/CamilaIntriago/'), 
    routes: [
        {
            path: '/',
            name: 'login',
            component: login,
            meta: { requiresAuth: false } // Marca la ruta como no requiere autenticación
      
        },
        {
            path: '/administrador',
            name: 'administrador',
            component: administrador,
            meta: { requiresAuth: true } // Marca la ruta como que requiere autenticación
        }

    ]
  });
export default router;