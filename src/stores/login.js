import { defineStore } from 'pinia'
export const User = defineStore('userStore',{
    state: ()=>(
        {
            user:[
                {
                    nombre : 'admin',
                    type : 'admin',
                    email : 'admin@gmail.com',
                    password: 'admin',
                }
            ],
            sessionAdmin: false,
        }
    ),
    actions:{
        async login(user,pass){
            if((user == this.user[0].nombre && pass == this.user[0].password)){
                this.sessionAdmin = true
                return true
            }else if(user == this.user[0].correo && pass == this.user[0].password){
                this.sessionAdmin = true
                return true
            }
            else{
                this.sessionAdmin = false
                return false
            }  
        },
        async logout(){
            this.sessionAdmin = false
            return true
        },
    },
})