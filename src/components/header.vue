<script setup>
import { RouterLink, useRouter, useRoute } from 'vue-router'
import {sweetalert} from '../composables/sweetAlert';
import {User} from '../stores/login';
import { computed } from 'vue';

const swal = sweetalert();
const router = useRouter()
const userStore = User();

const logout = async () => {
    try {
        const response = await userStore.logout();
        if (response == true ) {
            swal.successAlert('Cierre de sesión exitoso', 'Hasta luego');
            router.push('/');
        }else {
            swal.errorAlert('Error al cerrar sesión', 'Por favor, intente nuevamente')
        }
    } catch (error) {
        
    }
};
const route = useRoute();
const isBasePath = computed(() => route.path == '/admin');
</script>
<template>
    <nav class="navbar bg-body-tertiary header_base">
        <div class="container-fluid">
            <a class="navbar-brand logo" href="#" @click="router.push('/administrador')">
                FACCI
            </a>
            <div class="d-flex">
                <div class="btn-group">
                    <button type="button" class="btn dropdown-toggle boton" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="bi bi-gear-fill"></i>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end hovet_ul">
                        <li><a class="dropdown-item" @click="logout">Cerrar Sesión</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>
<style scoped>
.logo{
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
}
.text_none{
    text-decoration: none;
    color: black;
}
.header_base{
    border-bottom: 0.1mm solid rgb(154, 149, 149);
    background: #8c5d9d !important;

}
.dropdown-menu{
    background: #8c5d9d !important;
}
.dropdown-item{
    color: white !important;
}
.hovet_ul li :hover{
    background: #d583d6;
    color: white !important;
    cursor: pointer;
}
.boton{
    background: #e885ba!important;
    color: white;
    border: none;
}
.boton:hover{
    background: #e885ba!important;
    color: white;
    border: none;
}

</style>