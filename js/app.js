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


  card.addEventListener('click', function () {
    carregarAluno(card.id)
  })

  return card
}

const carregarCursos = async () => {

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

console.log(window.localStorage);

carregarCursos()

const criarAluno = aluno => {
  
  const cardAluno = document.createElement('div')
  if(aluno.status == 'Finalizado'){
    cardAluno.classList.add('card-aluno__finalizado')  
  }else{
  cardAluno.classList.add('card-aluno__cursando')
  }
  const imgAluno = document.createElement('img')
  imgAluno.src = aluno.foto
  imgAluno.classList.add('aluno-image')

  const nomeAluno = document.createElement('span')
  nomeAluno.classList.add('aluno-name')
  nomeAluno.textContent = aluno.nome.toUpperCase()

  cardAluno.append(imgAluno, nomeAluno)

  return cardAluno
}

const carregarAluno = async (siglaDoCurso) => {

  //fetch da API de alunos do curso
  const response = await fetch(`http://localhost:8080/v1/lion-school/alunos?curso=${siglaDoCurso}`)
  const data = await response.json()
  const alunos = await data.alunos

  //fetch da API do nome do curso
  const responseCurso = await fetch(`http://localhost:8080/v1/lion-school/cursos/${siglaDoCurso}`)
  const dataCurso = await responseCurso.json()
  const nomeCurso = await dataCurso.curso

  //criando titulo aqui 
  const tituloCurso = document.createElement('h2')
  tituloCurso.classList.add('curso__title')
  tituloCurso.textContent = nomeCurso
  //acabando aqui

  const containerAluno = document.getElementById('aluno-container')
  containerAluno.classList.add('aluno-container')
  containerAluno.style.width = '100%'
  containerAluno.style.height = '100%'
  const cardAlunos = alunos.map(criarAluno)

  const containerCurso = document.getElementById('curso-container')
  containerCurso.style.display = 'none'

  const containerCard  = document.createElement('div')
  containerCard.classList.add('container-card')

  containerAluno.append(tituloCurso)
  containerCard.append(...cardAlunos)
  containerAluno.append(containerCard)
  // containerAluno.replaceChildren(...cardAlunos)

} 