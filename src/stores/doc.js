import { defineStore } from 'pinia'
export const Doc = defineStore('docStore',{
    state: ()=>(
        {
            documentos:[],
        }
    ),
    actions:{
        async addDoc(doc){
            this.documentos.push(doc)
            return true;
        },
        async deleteDoc(doc){
            console.log(doc)
            return true;
        },
    },
})