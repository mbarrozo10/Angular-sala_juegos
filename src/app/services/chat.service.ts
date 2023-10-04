import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, getDocs, getFirestore, updateDoc } from '@angular/fire/firestore';
// import { AngularFirestore} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public chat: any[]= [];
  ultimoid: string= "";
 
  constructor(private firebase : Firestore) {
    this.conseguirUltimoId();
   }
  
   addChatMessage( mensaje : string, usuario: string) { 
    this.conseguirUltimoId().then(async ()  => {
      const id= parseInt(this.ultimoid) +1
      const data={
        id: id,
        mensaje: mensaje,
        fecha: new Date().toString(),
        usuario: usuario 
      }
      const placeRef = collection(this.firebase, 'ChatRoom');
      await this.actualizarUltimoId(id.toString())
      addDoc(placeRef, data);
    });
  
  }
  


    ObternerMensajes() {
    const db= getFirestore();
    const placeRef =  collection(this.firebase, 'ChatRoom');
    const retorno=  collectionData(placeRef);
    return retorno;
  }

  private async actualizarUltimoId(id:string){
    const db= getFirestore();
    const docref= doc(db, "ultimoId", "VWwEExAGLQu1h7RFE9M4");
    const data={
     id: id
    }
    updateDoc(docref,data).then(docf =>{
     // console.log("ok");
    })
 }
 async conseguirUltimoId(){
  const placeRef= collection(this.firebase, 'ultimoId');
  const retorno = collectionData(placeRef)
  retorno.subscribe(data =>{
      for (const x in data){
          this.ultimoid= data[x]['id'];         
      }
  });
}
} 
