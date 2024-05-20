<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router'
import {sweetalert} from '../composables/sweetAlert';
import {User} from '../stores/login';
import {ref} from 'vue';
import { onMounted } from 'vue';


const swal = sweetalert();
const router = useRouter()
const userStore = User();

const email = ref('');
const password = ref('');

onMounted(() => {
    console.log(userStore.admin)
});


const login = async () => {
    if (!email.value || !password.value) {
        swal.errorAlert('Error de credenciales', 'Por favor, complete los campos')
      return;
    }else{
        try {
            const response = await userStore.login(email.value, password.value);
            
            if (response == true ) {
                swal.successAlert('Inicio de sesión exitoso', 'Bienvenido a la plataforma de administración');
                router.push('/administrador');
            }else {
                swal.errorAlert('Error de credenciales', 'Correo o contraseña incorrectos')
            }
        } catch (error) {
            
        }
    }
};
const recuperarContraseña = async () => {
  try {
    swal.inputAlert('Recuperar contraseña', 'Ingrese su correo electrónico', 'email').then(async (result) => {
      if (result) {
        let user =await userStore.findEmail(result);
        if (user) {
        swal.inputAlert('Correo Encontrado', 'Ingrese su nueva contraseña', 'password').then((result) => {
          if (result) {
            userStore.updatePassword(result);
            swal.successAlert('Contraseña actualizada', 'Su contraseña ha sido actualizada correctamente');
          }else{
            throw new Error('Cancelado');
          }
        });
      }else{
        swal.errorAlert('Error', 'Correo electrónico no encontrado');
      }
      }else{
        throw new Error('Cancelado');
      }
    });
  } catch (error) {
    if (error.message !== 'Cancelado') {
      console.error('Error inesperado:', error);
    }
  }
};

</script>

<template>
  <div class="body_vue"> 
    <div class="row justify-content-center align-items-center contenedor">
      <div class="col-md-4">
        <form @submit.prevent="login" class="shadow p-3 mb-5 bg-body rounded formu">
          <h2 class="text-center mb-4">Iniciar sesión</h2>
          <div class="mb-3">
            <label for="email" class="form-label">Correo electrónico o usuario</label>
            <input type="text" class="form-control" v-model="email" id="email">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Contraseña</label>
            <input type="password" class="form-control" v-model="password" id="password">
          </div>
          <div class="text-right mt-3">
              <a href="/forgot-password" class="text-decoration-none" @click.submit.prevent="recuperarContraseña">¿Olvidaste tu contraseña?</a>
            </div>
          <div class="d-flex justify-content-center mt-3">
            <button type="submit" class="btn btn-primary boton">Iniciar sesión</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contenedor {
    height: 100vh;
    width: 100%;
}
  .shadow {
    box-shadow: 0px 0px 10px 0px rgb(38, 218, 227);
  }
  .formu {
    background: #8c5d9d !important;
    color:white
  }
  .formu a {
    background: #8c5d9d !important;
    color:white
  }
  .boton {
    background: #d583d6;
    color:white;
    border: none
  }
  .boton:hover {
    background: white;
    color:#d583d6;
    border: none
  }

</style>