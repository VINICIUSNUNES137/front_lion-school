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

  const url = 'https://backlion-school-production.up.railway.app/v1/lion-school/cursos'

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

  cardAluno.addEventListener('click', function () {
    //pega o ID do card (DS ou RDS)
    localStorage.setItem("matricula", cardAluno.id)
    //muda a página html
    window.location.href = './dados-aluno.html'
  })

  return cardAluno
}

const carregarAluno = async (status, ano) => {
  const containerAluno = document.getElementById('aluno-container')

  //fetch da API de alunos do curso
  let response
  if (status == undefined && ano == undefined) {
    response = await fetch(`https://backlion-school-production.up.railway.app/v1/lion-school/alunos?curso=${localStorage.getItem("id")}`)
  } else if (ano != undefined && status == undefined) {

    response = await fetch(`https://backlion-school-production.up.railway.app/v1/lion-school/alunos?curso=${localStorage.getItem("id")}${ano}`)

  } else if (ano == undefined && status != undefined) {
    response = await fetch(`https://backlion-school-production.up.railway.app/v1/lion-school/alunos?curso=${localStorage.getItem("id")}${status}`)
  }
  const data = await response.json()
  let alunos
  if (data.status == undefined) {
    alunos = await data.alunos
  } else {
    alunos = await data.status
  }

  console.log(alunos);


  if (alunos.length == 0) {
    console.log("sem alunos pra ver");
    const sem_conteudo = document.createElement('span')
    sem_conteudo.textContent = "NÃO FOI POSSÍVEL ENCONTRAR NENHUM ALUNO"
    sem_conteudo.classList.add('not_found')

    containerAluno.replaceChildren(sem_conteudo)

  } else {

    //fetch da API do nome do curso
    const responseCurso = await fetch(`https://backlion-school-production.up.railway.app/v1/lion-school/cursos/${localStorage.getItem("id")}`)
    const dataCurso = await responseCurso.json()
    const nomeCurso = await dataCurso.curso

    //criando titulo aqui 
    const tituloCurso = document.createElement('h2')
    tituloCurso.classList.add('curso__title')
    tituloCurso.textContent = nomeCurso
    //acabando aqui

    containerAluno.classList.add('aluno-container')
    const cardAlunos = alunos.map(criarAluno)

    const containerCard = document.createElement('div')
    containerCard.classList.add('container-card')

    containerAluno.append(tituloCurso)
    containerCard.append(...cardAlunos)
    containerAluno.replaceChildren(tituloCurso, containerCard)
  }
}

//navegação da página (VOLTAR)
const exit = document.getElementById("exit")
exit.addEventListener('click', function () {
  if (window.location.href == 'https://lion-school.netlify.app/index.html') {
    window.history.back();
  } else if (window.location.href == 'https://lion-school.netlify.app/alunos.html') {
    window.open('./index.html', '_self')
  } else {
    window.open('./alunos.html', '_self')
  }
})

//criação da navbar
function nav() {
  const cursando__span = document.getElementById('cursando__span')
  const todos__span = document.getElementById('todos__span')
  const finalizado__span = document.getElementById('finalizado__span')
  const span__todosAnos = document.getElementById('span__anos')
  const span__2020 = document.getElementById('span__2020')
  const span__2021 = document.getElementById('span__2021')
  const span__2022 = document.getElementById('span__2022')
  const span__2023 = document.getElementById('span__2023')
  const span__2024 = document.getElementById('span__2024')
  const span__2025 = document.getElementById('span__2025')
  const span__2026 = document.getElementById('span__2026')

  const todos = document.getElementById('todos-content')
  todos.onclick = () => {
    console.log('cliquei em todos');
    visibilityStatus(todos__span)
    carregarAluno()
  }
  const cursando = document.getElementById('cursando-content')
  cursando.onclick = () => {
    console.log('cliquei em cursando');
    visibilityStatus(cursando__span)
    carregarAluno('&status=cursando')
  }

  const finalizando = document.getElementById('finalizando_content')
  finalizando.onclick = () => {
    console.log('cliquei em finalizando');
    visibilityStatus(finalizado__span)
    carregarAluno('&status=finalizado')
  }

  const todos_anos = document.getElementById('anos-content')
  todos_anos.onclick = () => {
    visibilityYear(span__todosAnos)
    carregarAluno()
  }

  const ano2020 = document.getElementById('2020-content')
  ano2020.onclick = () => {
    visibilityYear(span__2020)
    carregarAluno(undefined, '&ano=2020')
  }
  const ano2021 = document.getElementById('2021-content')
  ano2021.onclick = () => {
    visibilityYear(span__2021)
    carregarAluno(undefined, '&ano=2021')
  }
  const ano2022 = document.getElementById('2022-content')
  ano2022.onclick = () => {
    visibilityYear(span__2022)
    carregarAluno(undefined, '&ano=2022')
  }
  const ano2023 = document.getElementById('2023-content')
  ano2023.onclick = () => {
    visibilityYear(span__2023)
    carregarAluno(undefined, '&ano=2023')
  }
  const ano2024 = document.getElementById('2024-content')
  ano2024.onclick = () => {
    visibilityYear(span__2024)
    carregarAluno(undefined, '&ano=2024')
  }
  const ano2025 = document.getElementById('2025-content')
  ano2025.onclick = () => {
    visibilityYear(span__2025)
    carregarAluno(undefined, '&ano=2025')
  }
  const ano2026 = document.getElementById('2026-content')
  ano2026.onclick = () => {
    visibilityYear(span__2026)
    carregarAluno(undefined, '&ano=2026')
  }

}

//função que cuida da visibilidade dos itens da navbar
const visibilityStatus = span => {
  finalizado__span.classList.replace('visible', 'invisible')
  todos__span.classList.replace('visible', 'invisible')
  cursando__span.classList.replace('visible', 'invisible')

  span.classList.replace('invisible', 'visible')
}

const visibilityYear = span => {
  todos__span.classList.replace('visible', 'invisible')
  span__2020.classList.replace('visible', 'invisible')
  span__2021.classList.replace('visible', 'invisible')
  span__2022.classList.replace('visible', 'invisible')
  span__2023.classList.replace('visible', 'invisible')
  span__2024.classList.replace('visible', 'invisible')
  span__2025.classList.replace('visible', 'invisible')
  span__2026.classList.replace('visible', 'invisible')

  span.classList.replace('invisible', 'visible')
}

//modelo de criação dos estudantes
const createContentStudent = student => {

  const card_student = document.createElement('div')
  card_student.classList.add('dados-aluno')

  const design_student = document.createElement('div')
  design_student.classList.add('design__aluno')

  const design_image = document.createElement('img')
  design_image.src = student.foto
  design_image.classList.add('aluno__image')

  const name_student = document.createElement('span')
  name_student.classList.add('aluno__name')
  name_student.textContent = student.nome.toUpperCase()

  design_student.append(design_image, name_student)

  const graphic_student = document.createElement('div')
  graphic_student.classList.add('grafico__aluno')


  let i = 0
  while (i < 6) {
    const materia = document.createElement('div')
    materia.classList.add('materia')

    const nota = document.createElement('span')
    nota.classList.add('materia__nota')
    nota.textContent = student.curso[0].disciplinas[i].media

    let nome = student.curso[0].disciplinas[i].nome
    let media = Number(student.curso[0].disciplinas[i].media)

    const nomeMateria = document.createElement('span')
    nomeMateria.classList.add('materia__name')
    nomeMateria.textContent = (nome[0] + nome[1] + nome[3]).toUpperCase()

    const barra_background = document.createElement('div')
    barra_background.classList.add('materia__barra-content')
    const barra_colorida = document.createElement('div')
    barra_colorida.style.background = "#3347b0"
    barra_colorida.style.width = "100%"
    barra_colorida.style.height = `${media}%`
    if (media < 75 && media >= 50) {
      barra_colorida.style.background = "var(--secundary-color)"
      barra_colorida.style.boxShadow = `0px 0px 24px 0px var(--secundary-color)`
      nota.style.color = "var(--secundary-color)"
    } else if (media < 50) {
      barra_colorida.style.background = "var(--tertiary-color)"
      barra_colorida.style.boxShadow = `0px 0px 24px 0px var(--tertiary-color)`
      nota.style.color = "var(--tertiary-color)"
    } else {
      barra_colorida.style.background = "var(--primary-color)"
      barra_colorida.style.boxShadow = `0px 0px 24px 0px var(--primary-color)`
      nota.style.color = "var(--primary-color)"
    }

    barra_background.append(barra_colorida)
    materia.append(nota, barra_background, nomeMateria)
    graphic_student.append(materia)
    i++
  }

  card_student.append(design_student, graphic_student)


  return card_student
}
//função que cuida de chamar a função create e carrega-la através de um map
const loadContentStudent = async () => {
  const url = `https://backlion-school-production.up.railway.app/v1/lion-school/alunos/${localStorage.getItem("matricula")}`

  const response = await fetch(url)
  const data = await response.json()
  const aluno = await data.aluno
  const containerAluno = document.getElementById('student-container')
  containerAluno.replaceChildren(createContentStudent(aluno))
}

//start das páginas
if (window.location.href == 'https://lion-school.netlify.app/index.html' || window.location.href == 'https://lion-school.netlify.app/') {
  carregarCursos()
} else if (window.location.href == 'https://lion-school.netlify.app/alunos.html') {
  nav()
  carregarAluno()
} else {
  console.log(localStorage.getItem('matricula'));
  loadContentStudent()
}