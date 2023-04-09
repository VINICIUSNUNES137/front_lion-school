'use strict'

const largura = window.screen.width
let guardarClick
let contUser = 0

const criarCurso = curso => {

  const card = document.createElement('div')
  card.classList.add('card')
  card.id = curso.sigla

  const img = document.createElement('img')
  img.src = curso.icone
  img.alt = curso.nome

  const name = document.createElement('span')
  name.classList.add('card__name')
  name.textContent = curso.sigla

  card.append(img, name)

  //cria um evento de click para todos os cards
  card.addEventListener('click', function () {
    //pega o ID do card (DS ou RDS)
    localStorage.setItem("id", card.id)
    //muda a página html
    window.location.href = './alunos.html'
  })

  return card
}

const carregarCursos = async () => {

  const url = 'http://localhost:8080/v1/lion-school/cursos'

  const response = await fetch(url)
  const data = await response.json()
  const cursos = await data.cursos
  const containerAluno = document.getElementById('aluno-container')
  // containerAluno.style.width = '0'
  const container = document.getElementById('container')
  const cards = cursos.map(criarCurso)

  container.replaceChildren(...cards)

}

const criarAluno = aluno => {

  const cardAluno = document.createElement('div')
  if (aluno.status == 'Finalizado') {
    cardAluno.classList.add('card-aluno__finalizado')
  } else {
    cardAluno.classList.add('card-aluno__cursando')
  }
  const imgAluno = document.createElement('img')
  imgAluno.src = aluno.foto
  imgAluno.classList.add('aluno-image')

  const nomeAluno = document.createElement('span')
  nomeAluno.classList.add('aluno-name')
  nomeAluno.textContent = aluno.nome.toUpperCase()

  cardAluno.append(imgAluno, nomeAluno)

  cardAluno.id = aluno.matricula
  return cardAluno
}

const carregarAluno = async (status) => {

  //fetch da API de alunos do curso
  let response
  if (status == undefined) {
    response = await fetch(`http://localhost:8080/v1/lion-school/alunos?curso=${localStorage.getItem("id")}`)
  } else {
    response = await fetch(`http://localhost:8080/v1/lion-school/alunos?curso=${localStorage.getItem("id")}${status}`)
  }
  const data = await response.json()
  let alunos
  if (data.status == undefined) {
    alunos = await data.alunos
  } else {
    alunos = await data.status
  }

  //fetch da API do nome do curso
  const responseCurso = await fetch(`http://localhost:8080/v1/lion-school/cursos/${localStorage.getItem("id")}`)
  const dataCurso = await responseCurso.json()
  const nomeCurso = await dataCurso.curso

  //criando titulo aqui 
  const tituloCurso = document.createElement('h2')
  tituloCurso.classList.add('curso__title')
  tituloCurso.textContent = nomeCurso
  //acabando aqui

  const containerAluno = document.getElementById('aluno-container')
  containerAluno.classList.add('aluno-container')
  const cardAlunos = alunos.map(criarAluno)

  const containerCard = document.createElement('div')
  containerCard.classList.add('container-card')

  containerAluno.append(tituloCurso)
  containerCard.append(...cardAlunos)
  containerAluno.replaceChildren(tituloCurso, containerCard)
}

const aaa = document.getElementById("exit")
aaa.addEventListener('click', function () {
  if (window.location.href == 'http://127.0.0.1:5500/front_lion-school/index.html') {
    window.history.back();
  } else {
    window.open('./index.html', '_self')
  }
})


function nav() {
  const cursando__span = document.getElementById('cursando__span')
  const todos__span = document.getElementById('todos__span')
  const finalizado__span = document.getElementById('finalizado__span')
  const span__2020 = document.getElementById('2020')

  const todos = document.getElementById('todos-content')
  todos.onclick = () => {
    console.log('cliquei em todos');
    todos__span.classList.replace('invisible', 'visible')
    finalizado__span.classList.replace('visible', 'invisible')
    cursando__span.classList.replace('visible', 'invisible')
    carregarAluno()

  }
  const cursando = document.getElementById('cursando-content')
  cursando.onclick = () => {
    console.log('cliquei em cursando');
    cursando__span.classList.replace('invisible', 'visible')
    todos__span.classList.replace('visible', 'invisible')
    finalizado__span.classList.replace('visible', 'invisible')
    carregarAluno('&status=cursando')
  }

  const finalizando = document.getElementById('finalizando_content')
  finalizando.onclick = () => {
    console.log('cliquei em finalizando');
    finalizado__span.classList.replace('invisible', 'visible')
    todos__span.classList.replace('visible', 'invisible')
    cursando__span.classList.replace('visible', 'invisible')
    carregarAluno('&status=finalizado')
  }

  const ano2020 = document.getElementById('2020-content')
  ano2020.onclick = () => {
    span__2020.classList.replace('invisible', 'visible')

  }

}



if (window.location.href == 'http://127.0.0.1:5500/front_lion-school/index.html') {
  console.log(window.location.href)
  carregarCursos()
} else if ('http://127.0.0.1:5500/front_lion-school/index.html') {
  console.log(window.location.href);
  nav()
  carregarAluno()
}