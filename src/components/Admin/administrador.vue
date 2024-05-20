<script setup>
import { RouterLink, useRouter } from 'vue-router'
import {sweetalert} from '../../composables/sweetAlert';
import {User} from '../../stores/login';
import {Doc} from '../../stores/doc';
import Header from '../header.vue';
import { onMounted } from 'vue';
import { ref } from 'vue';

const swal = sweetalert();
const router = useRouter()
const docStore = Doc();

const Docus = ref([]);

const showCreateForm = ref(false);
const showDocumentList = ref(false);

const showCreate = () => {
    showCreateForm.value = true;
    showDocumentList.value = false; // Oculta la lista de documentos cuando se muestra el formulario de creación
};

const showDocuments = () => {
    showDocumentList.value = true;
    showCreateForm.value = false; // Oculta el formulario de creación cuando se muestra la lista de documentos
    Docus.value = docStore.documentos;
};

//aqui empieza la logica de documentos
const documento = ref({
    id: '',
    nombre: '',
    archivo: '',
    descripcion: ''
});
const submitForm = async () => {
    console.log(documento.value);
    if (!documento.value.nombre || !documento.value.archivo || !documento.value.descripcion) {
        swal.errorAlert('Error de credenciales', 'Por favor, complete los campos')
        return;
    }else{
        try {
            documento.value.id = docStore.documentos.length + 1;
            const response = await docStore.addDoc(documento.value);
            if (response == true ) {
                swal.successAlert('Documento creado', 'El documento se ha creado correctamente');
                console.log(docStore.documentos);
                clearForm();
            }else {
                swal.errorAlert('Error al crear documento', 'Por favor, intente nuevamente')
                console.log(response);
            }
        } catch (error) {
            
        }
    }
};

const clearForm = () => {
    documento.value.nombre = '';
    documento.value.archivo = '';
    documento.value.descripcion = '';
};

</script>
<template>
    <Header/>
    <div class="body_vue">
        <div class="row contenedor">
            <div class="row justify-content-center">
                <div class="col">
                    <!-- Botones para mostrar/ocultar el formulario de creación y la lista de documentos -->
                    <div class="d-flex justify-content-center">
                        <button class="btn btn-primary me-3" @click="showDocuments">Ver Documentos</button>
                        <button class="btn btn-primary me-3" @click="showCreate">Crear Documento</button>
                    </div>
                </div>
            </div>
            
            <!-- Formulario de creación de documentos -->
            <div class="row mt-3" v-if="showCreateForm">
                <div class="col">
                    <div class="d-flex justify-content-center">
                        <form class="shadow p-3 mb-5 bg-body rounded formu" @submit.prevent="submitForm">
                            <h2 class="text-center mb-4">Crear Documento</h2>
                            <div class="mb-3">
                                <label for="nombre" class="form-label">Nombre</label>
                                <input type="text" class="form-control" id="nombre" placeholder="Ingrese el nombre" v-model="documento.nombre">
                            </div>
                            <div class="mb-3">
                                <label for="archivo" class="form-label">Subir Archivo</label>
                                <input type="file" class="form-control" id="archivo" @change="documento.archivo = $event.target.files[0]">
                            </div>
                            <div class="mb-3">
                                <label for="descripcion" class="form-label">Descripción</label>
                                <textarea class="form-control" id="descripcion" rows="3" placeholder="Ingrese una descripción" v-model="documento.descripcion"></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary me-3">Enviar</button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="row mt-3" v-if="showDocumentList">
                <div class="col">
                    <div class="d-flex justify-content-center">
                        <ul class="list-group">
                            <li class="list-group-item" v-for="documento in Docus" :key="documento.id">
                                {{ documento.nombre }}
                            </li>
                            <li class="list-group-item aviso" v-if="docStore.documentos.length == 0">
                                <h3 class="text-center">¡Cree un documento primero!</h3>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>
.aviso{
    background: none;
    border: none;
    color: #f8b0e9;
}
.contenedor {
    margin-top: 20px;
    height: 89vh;
    width: 100%;
}
  .shadow {
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
  }
  .formu {
    background: #8c5d9d !important;
    color:white
  }
  .formu a {
    background: #8c5d9d !important;
    color:white
  }
</style>