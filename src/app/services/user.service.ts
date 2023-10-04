import { Injectable, Pipe } from '@angular/core';
import { Auth, createUserWithEmailAndPassword , signInWithEmailAndPassword, signOut, updateProfile} from '@angular/fire/auth';
import { UserI } from '../model/userI';
import { FileI } from '../model/fileI';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import LogI from '../model/logI';
@Injectable({
    providedIn: 'root'
})

export class UserService {
    private filePath!: string;
    constructor(private auth : Auth, private firestore: Firestore) {
    }


    register (email: string, password : string, displayName: string): any{
        if(email != undefined && password != undefined && displayName !=undefined){
            const varr= createUserWithEmailAndPassword(this.auth,email, password);
            varr.then((userG) =>
            updateProfile(userG.user,{
                        displayName: displayName
                    })
            ).catch((error) => {    
                    return "retorno";
                });
            return varr;
        }else{
            return Error;
        }
    }

    registrarLog(user: LogI){

        const placeRef = collection(this.firestore, 'LogUsuarios');
        return addDoc(placeRef, user);
    }

    retornarUsuario(){
        const user= this.auth.currentUser;
        if(user != null){
          return user.displayName;
        }else{
          return 'null';
        }
      }
     login(email: any, password: any){
        const user = signInWithEmailAndPassword(this.auth,email,password);
        return user;
    }

    logout(){
        return signOut(this.auth);
    }
    PreUpdateUsuario(user: UserI , image: FileI){
        this.uploadImage(user,image);
    }
    private uploadImage(user: UserI,image: FileI){
        // this.filePath = 'images/${image.name}';
        // const fileRef= this.storage.ref(this.filePath);
        // const task = this.storage.upload(fileRef,image);
    }


    UpdateUsuario(user : UserI, image : FileI){
        let usuario : any;
        usuario= this.auth.currentUser;
        updateProfile(usuario,{
            displayName : user.displayName,
            photoURL : user.photoUrl,
        })
        .then(() => console.log('Usuario actualizado') )
        .catch(err => console.log('Error',err));
    }

    VerificarFoto(){
        if(this.auth.currentUser?.photoURL){

            return this.auth.currentUser?.photoURL;
        }else{
            return false;
        }
    }

    GuardarPartidaAhorcado( Resultado :boolean){
        const usuario= this.auth.currentUser?.displayName as string;
        const placeRef = collection(this.firestore, 'Partidas',"Ahorcado" ,usuario);
        const data={
            Usuario: usuario,
            Gano: Resultado,
            fecha: new Date()
        };
        return addDoc(placeRef, data);
    }

    GuardarPartidaMayor(total:number){
        const usuario= this.auth.currentUser?.displayName as string;
        
        const placeRef = collection(this.firestore, 'Partidas',"MaroyMenor" ,usuario);
        
        const data={
            Usuario: usuario,
            Puntaje: total,
            fecha: new Date()
        };
        return addDoc(placeRef, data);
    }
}