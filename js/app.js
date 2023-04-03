'use strict'

const largura = window.screen.width
let guardarClick
let contUser = 0

const criarCurso = curso => {

  const card = document.createElement('a')
  // card.href = "../alunos.html"
  // card.href = "#"
  // card.target = '_blank'
  card.classList.add('card')
  card.id = curso.sigla

  const img = document.createElement('img')
  img.src = curso.icone
  img.alt = curso.nome

  const name = document.createElement('span')
  name.classList.add('card__name')
  name.textContent = curso.sigla

  card.append(img, name)


  card.addEventListener('click', function () {
    // window.location.href = '../alunos.html'
    carregarAluno(card.id)
  })


  return card
}

const carregarCursos = async () => {

  // window.location.href = '../index.html'

  const url = 'http://localhost:8080/v1/lion-school/cursos'

  const response = await fetch(url)
  const data = await response.json()
  const cursos = await data.cursos
  const containerAluno = document.getElementById('aluno-container')
  containerAluno.style.width = '0'
  const container = document.getElementById('container')
  const cards = cursos.map(criarCurso)

  container.replaceChildren(...cards)

}

carregarCursos()


const criarAluno = aluno => {
  // const curso_name = document.createElement('h2')
  const cardAluno = document.createElement('div')
  cardAluno.classList.add('card-aluno')

  const imgAluno = document.createElement('img')
  imgAluno.src = aluno.foto
  imgAluno.classList.add('aluno-image')

  const nomeAluno = document.createElement('span')
  nomeAluno.classList.add('aluno-name')
  nomeAluno.textContent = aluno.nome

  cardAluno.append(imgAluno, nomeAluno)

  return cardAluno
}


const carregarAluno = async (siglaDoCurso) => {

  // const response = await fetch(`http://localhost:8080/v1/lion-school/alunos?curso=${siglaDoCurso}`)
  const response = await fetch(`http://localhost:8080/v1/lion-school/alunos?curso=${siglaDoCurso}`)
  const data = await response.json()
  const alunos = await data.alunos

  const containerAluno = document.getElementById('aluno-container')
  containerAluno.classList.add('aluno-container')
  containerAluno.style.width = '100%'
  const cardAlunos = alunos.map(criarAluno)


  const containerCurso = document.getElementById('curso-container')
  containerCurso.style.display = 'none'


  containerAluno.replaceChildren(...cardAlunos)

}

