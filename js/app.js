'use strict'

const largura = window.screen.width
let i = 0
let contUser = 0

const criarCurso = curso => {

  const card = document.createElement('div')
  card.classList.add('card')
  card.id = i
  i++

  const img = document.createElement('img')
  img.src = curso.icone
  
  const name = document.createElement('span')
  name.classList.add('card__name')
  name.textContent = curso.sigla

  card.append(img, name)

  return card
}

const carregarCursos = async () => {

  const url = 'http://localhost:8080/v1/lion-school/cursos'

  const response = await fetch(url)
  const data = await response.json()
  const cursos = await data.cursos

  const container = document.getElementById('container')
  const cards = cursos.map(criarCurso)

  container.replaceChildren(...cards)
}

carregarCursos()