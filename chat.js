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

const nomeUsuario = localStorage.getItem("user_name");
const nomeSala = localStorage.getItem("nomeSala");

inicializar();

function inicializar() {
  document.getElementById("nomeSala").textContent = '#' + nomeSala;
  getData();
}

function getData() {
 
  const output = document.getElementById("output");


  firebase.database().ref('/' + nomeSala).on("value", snapshot => {
     
      output.innerHTML = "";
  
      snapshot.forEach(childSnapshot => {
       
          const childKey = childSnapshot.key;


          if(childKey != "purpose") {
           
              const childMsg = childSnapshot.val();
            
              const nome = childMsg.nome;
            
              const msg = childMsg.mensagem;
           
              const likes = childMsg.likes;


              //Criação da Interface da Mensagem


              const chatCard = document.createElement("div");
         
              chatCard.className = "chatCard";
            
              const chatNome = document.createElement("h4");
           
              chatNome.className = "chatNome";
              //Define o texto do h4 para o nome do usuário.
              chatNome.textContent = nome;
              //Adiciona o h4 ao div da mensagem.
              chatCard.appendChild(chatNome);
              //Cria um novo div para organizar a mensagem e os botões em uma linha.
              const row = document.createElement("div");
              //Define a classe CSS do div como row.
              row.className = "row";
              //Adiciona a row ao div da mensagem.
              chatCard.appendChild(row);
              //Cria um novo div para a coluna que contém a mensagem.
              const col = document.createElement("div");
              //Define a classe CSS do div como col.
              col.className = "col";
              //Adiciona a coluna à row.
              row.appendChild(col);
              //Cria um novo h5 para o texto da mensagem.
              const chatMsg = document.createElement("h5");
              //Define a classe CSS do h5 como chatMsg.
              chatMsg.className = "chatMsg";
              //Define o texxto do h5 para a mensagem.
              chatMsg.textContent = msg;
              //Adiciona o h5 à coluna.
              col.appendChild(chatMsg);
              //Cria um novo div para a coluna que contém o botão de curtida.
              const colAuto = document.createElement("div");
              //Define a classe CSS do div como col-auto.
              colAuto.className = "col-auto";
              //Adiciona a coluna à row.
              row.appendChild(colAuto);
              //Cria um novo botão para curtir a mensagem.
              const botaoLike = document.createElement("button");
              //Define a classe CSS do botão como btn btn-info.
              botaoLike.className = "btn btn-info";
              //Define o ID do botão como a chave da mensagem.
              botaoLike.id = childKey;
              
              botaoLike.value = likes;
              
              botaoLike.setAttribute("onclick", "likeMsg(this.id)");
              botaoLike.innerHTML = '<i class="fa-regular fa-thumbs-up"></i> ' + likes;
             
              colAuto.appendChild(botaoLike);
          
              output.appendChild(chatCard);
          }
      });
  });
}


function send() {
  const txtMsg =document.getElementById("msg");
  const msg = txtMsg.value;

  if(msg.trim()) {
      firebase.database().ref('/' + nomeSala).push({
          nome: user_name,
          mensagem: msg,
          likes: 0
      });
      txtMsg.value = "";
  }
}

function likeMsg(btnId) {

  let likes = Number(document.getElementById(btnId).value);
  
  likes++;
  firebase.database().ref('/' + nomeSala).child(btnId).update({
      likes: likes
  })
}




