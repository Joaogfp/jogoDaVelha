const quadrados = document.querySelectorAll(".quadrado");
const jogadorP = "X";
const robo = "O";

const FORMAS = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

document.addEventListener("click", (event) => {
  if (event.target.matches(".quadrado")) {
    if(document.getElementById(event.target.id).innerHTML) {
      alert('Esse campo já foi preenchido!');
    } else {
      jogo(event.target.id, jogadorP);
      setTimeout(() => bot(), 200)
      fazerRequisicao(event.target.id);
    }
  }
})

function jogo(id, vez) {
  const quadrado = document.getElementById(id);
  quadrado.textContent = vez;
  quadrado.classList.add(vez);
  verifVencedor(vez);
}

function bot() {
  const quadradosDisponiveis = [];
  for (index in quadrados) {
    if(!isNaN(index)) {
      if (!quadrados[index].classList.contains("X") && !quadrados[index].classList.contains("O")) {
        quadradosDisponiveis.push(index);
      }
    }
  }
  const quadradoAleatorio = Math.floor (Math.random() * quadradosDisponiveis.length);
  jogo(quadradosDisponiveis[quadradoAleatorio], robo);
}


function verifVencedor(vez) {
  const vencedor = FORMAS.some((comb) => {
    return comb.every((index) => {
      return quadrados[index].classList.contains(vez); 
    })
  });

  if (vencedor) {
    finalizarJogo(vez);
  } else if (verifEmpate()) {
    finalizarJogo();
  } 
}

function verifEmpate() {
  let x = 0;
  let o = 0;

  for (index in quadrados) {
    if(!isNaN(index)) {
      if (quadrados[index].classList.contains(jogadorP)) {
        x++;
      }
  
      if (quadrados[index].classList.contains(robo)) {
        o++
      }
    }

  }

  return x + o === 9 ? true : false;
}

function finalizarJogo(vencedor = null) {
  if (vencedor) {
    setTimeout(() => alert("Vencedor: " + vencedor), 5);
    setTimeout(() => deleteGame(), 2);
  } else {
    setTimeout(() => alert("Empatou"), 5);
    setTimeout(() => deleteGame(), 2);
  }
}


//Função para deixar o tabuleiro aparecendo
function visible() {
  buttn = document.getElementById('gridG');
  visivel = buttn.style.display = 'grid';
}

//Função para resetar o jogo recarregando a página
function restart() {
  reset = document.getElementById('jogadoresG');
  restartButton = location.reload(true);
  deleteGame();
}

function deleteGame() {

  reset = document.getElementById('jogadoresG');
  restartButton = location.reload(true);
  var url = "http://localhost:5000/api/jogo/jogoExcluir";//Sua URL

  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", url, true);

  xhttp.onreadystatechange = function () {//Função a ser chamada quando a requisição retornar do servidor
      if (xhttp.readyState == 4 && xhttp.status == 200) {//Verifica se o retorno do servidor deu certo
          console.log(xhttp.responseText);
      }
  }

  xhttp.send();//A execução do script CONTINUARÁ mesmo que a requisição não tenha retornado do servidor

}

function fazerRequisicao(posicao) {

  var url = "http://localhost:5000/api/jogo/jogoNew/" + posicao;

  var xhttp = new XMLHttpRequest();

  xhttp.open("GET", url, true);



  xhttp.onreadystatechange = function () {//Função a ser chamada quando a requisição retornar do servidor
    console.log(xhttp.responseText);
}


  xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor

  // document.getElementById("resposta").innerHTML = xhttp.responseText;
}