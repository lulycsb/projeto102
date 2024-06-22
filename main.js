// Configuração do Firebase de seu aplicativo
//ADICIONE OS LINKS DO FIREBASE AQUI
// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyDzT_9EVu353sGrKROf-3B1Z2bREDueAXs",
//     authDomain: "webappvamosconversar.firebaseapp.com",
//     databaseURL:"https://webappvamosconversar-default-rtdb.firebaseio.com/",
//     projectId: "webappvamosconversar",
//     storageBucket: "webappvamosconversar.appspot.com",
//     messagingSenderId: "509835787657",
//     appId: "1:509835787657:web:c04d1d611df0f54fb3b558"
//   };

// // Inicialize o Firebase
// firebase.initializeApp(firebaseConfig);

function addUser()
{
    const user_name = document.getElementById("user_name").value;
    console.log(user_name);
    if(user_name) {
      localStorage.setItem("user_name", user_name);
      window.location = "sala.html";
    }
    firebase.database().ref("/").child(user_name).update({
        purpose : "adding user"
    });
    /*
    Armazene o nome de usuário em localStorage/*        
    /*Programe window.location para que o usuário possa navegar até a página chat_room.html.
    */
    
}

function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("nomeSala");

    location ="index.html";
  }

