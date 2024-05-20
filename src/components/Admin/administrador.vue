<script setup>
import { RouterLink, useRouter } from 'vue-router'
import {sweetalert} from '../../composables/sweetAlert';
import {User} from '../../stores/login';
import {Doc} from '../../stores/doc';
import Header from '../header.vue';
import { onMounted } from 'vue';
import { ref, computed } from 'vue';

const swal = sweetalert();
const router = useRouter()
const docStore = Doc();

const Docus = ref([]);
const get_document = () => {
    const documentKeys = Object.keys(localStorage).filter(key => key.startsWith('uploadedFile'));
    return documentKeys.map(key => localStorage.getItem(key));
};

const showCreateForm = ref(true);
const showDocumentList = ref(false);

const showCreate = () => {
    showCreateForm.value = true;
    showDocumentList.value = false;
     // Oculta la lista de documentos cuando se muestra el formulario de creación
};

const showDocuments = () => {
    showDocumentList.value = true;
    showCreateForm.value = false; // Oculta el formulario de creación cuando se muestra la lista de documentos
    Docus.value = get_document();
};

//aqui empieza la logica de documentos
const documento = ref({
    id: '',
    nombre: '',
    archivo: '',
    descripcion: ''
});

const fileSaved = ref(false);
const selectedFile = ref(null);
const previewUrl = ref('');
const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
        selectedFile.value = file;
        previewUrl.value = URL.createObjectURL(file);
    }
};

const saveFileLocally = () => {
    if (!selectedFile.value) {
        swal.errorAlert('Error','Por favor Seleccione un archivo');
        return;
    }

    const reader = new FileReader();
    
    reader.onload = (e) => {
        const uniqueKey = `uploadedFile_${Date.now()}`;
        localStorage.setItem(uniqueKey, e.target.result);
        swal.successAlert('Exito','Documento Guardado');
        fileSaved.value = true;  // Indica que el archivo se guardó
        clearForm();
    };

    reader.onerror = (e) => {
        swal.errorAlert('Error','Error al guardar el archivo');
        fileSaved.value = false;  // Indica que hubo un error al guardar
    };

    reader.readAsDataURL(selectedFile.value);
};
const clearForm = () => {
    documento.value.nombre = '';
    documento.value.archivo = '';
    documento.value.descripcion = '';
};
const isPDF = (document) => {
    return document.startsWith('data:application/pdf');
};

// Función para verificar si el documento es una imagen (puedes ajustarla según los tipos de imagen que manejas)
const isImage = (document) => {
    return document.startsWith('data:image/');
};

const downloadDocument = (doc) => {
    const link = document.createElement('a');
    link.href = doc;
    link.download = 'document.pdf';  // Puedes cambiar el nombre del archivo descargado
    link.click();
    swal.successAlert('Exito','Documento Descargado');
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
            <div class="row mt-3" v-if="showCreateForm">
                <div class="col">
                    <div class="d-flex justify-content-center">
                        <form class="shadow p-3 mb-5 bg-body rounded formu" @submit.prevent="saveFileLocally">
                            <h2 class="text-center mb-4">Crear Documento</h2>
                            <div class="mb-3">
                                <label for="nombre" class="form-label">Nombre</label>
                                <input type="text" class="form-control" id="nombre" placeholder="Ingrese el nombre" v-model="documento.nombre">
                            </div>
                            <div class="mb-3">
                                <label for="archivo" class="form-label">Subir Archivo</label>
                                <input type="file" class="form-control" id="archivo" @change="handleFileChange">
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
                        <table class="table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col" class="text-center p-2">#</th>
                                    <th scope="col" class="text-center p-2">Documento</th>
                                    <th scope="col" class="text-center p-2 ">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(doc, index) in Docus" :key="index">
                                    <td class="text-center  p-2">{{ index + 1 }}</td>
                                    <td class="text-center  p-2">
                                        <span v-if="isPDF(doc)">
                                            <i class="bi bi-file-pdf text-danger"></i> PDF
                                        </span>
                                        <span v-else-if="isImage(doc)">
                                            <i class="bi bi-file-image text-success"></i> Imagen
                                        </span>
                                        <span v-else>
                                            <i class="bi bi-file text-secondary"></i> Otro
                                        </span>
                                    </td>
                                    <td class="text-center  p-2">
                                        <button @click="downloadDocument(doc)" class="btn btn-primary btn-sm me-2">
                                            <i class="bi bi-download"></i>
                                        </button>
                                        <button @click="deleteDoc(doc)" class="btn btn-danger btn-sm">
                                            <i class="bi bi-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                                <tr v-if="Docus.length === 0">
                                    <td colspan="3" class="text-center">¡No hay documentos disponibles!</td>
                                </tr>
                            </tbody>
                        </table>
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
  
  .bi-file-pdf {
    color: red;
    }

    .bi-file-image {
        color: green;
    }

    .bi-file {
        color: gray;
    }
  .table-hover {
    width: 50%;
    border-radius: 5px;
    max-width: 80%;
    margin-top: 20px;
    color: white !important;
    background:#8c5d9d !important;
}
</style>