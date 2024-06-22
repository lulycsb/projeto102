// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDzT_9EVu353sGrKROf-3B1Z2bREDueAXs",
    authDomain: "webappvamosconversar.firebaseapp.com",
    databaseURL:"https://webappvamosconversar-default-rtdb.firebaseio.com/",
    projectId: "webappvamosconversar",
    storageBucket: "webappvamosconversar.appspot.com",
    messagingSenderId: "509835787657",
    appId: "1:509835787657:web:c04d1d611df0f54fb3b558"
  };
  firebase.initializeApp(firebaseConfig);


inicializar();

function inicializar() {
  const user_name = localStorage.getItem("user_name");
  document.getElementById("user_name").textContent = "Olá, " + user_name +"!!!";
  getData();

}
function addSala() {
   const nomeSala = document.getElementById("nomeSala").value;
   console.log(nomeSala);
   if (nomeSala) {
       firebase.database().ref('/').child(nomeSala).set({
       purpose: "sala criada"
       });


       carregaSala(nomeSala);
   }
}






function getData() {
   firebase.database().ref('/').on("value", snapshot => {
       let salas = [];
       snapshot.forEach(childSnapshot => {
           const childKey = childSnapshot.key;
           const html = '<div class="nomeSala" id="'
               + childKey
               + '" onclick="carregaSala(this.id)">#'
               + childKey
               + '</div>'
           salas.push(html);
       });
       document.getElementById("output").innerHTML = salas.join("");
       getData();
   });
}


function carregaSala(sala) {
   localStorage.setItem("nomeSala", sala);
   location = "chat.html";
}




