'use strict'

const largura = window.screen.width
let guardarClick
let contUser = 0

const criarCurso = curso => {

  const card = document.createElement('a')
  card.href = "http://127.0.0.1:5500/alunos.html"
  card.target = '_blank'
  card.classList.add('card')
  card.id = curso.sigla

  const img = document.createElement('img')
  img.src = curso.icone
  img.alt = curso.nome

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

  cards.forEach(card => {
    card.onclick = async () => {
      console.log('cliquei no: ' + card.id);
      // const url1 = `http://localhost:8080/v1/lion-school/cursos`

      // const response1 = await fetch(url1)
      // const data1 = await response1.json()
      // const cursos1 = await data1

      // // location.href = 'http://127.0.0.1:5500/alunos.html'

      // const text = document.createElement('p')
      // text.textContent = cursos1.nome

      // aaa(text)



    }
  })

}

// const img1 = document.createElement('img')
// img1.src = 'https://raw.githubusercontent.com/VINICIUSNUNES137/lion-school_front/main/img/ds.svg'

// let aaa = document.getElementById('container2')

// aaa.replaceChildren(img1)


carregarCursos()