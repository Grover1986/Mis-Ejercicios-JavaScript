const d = document
const question = d.querySelector('#question') 
const choices = Array.from(d.querySelectorAll('.choice-text'))
const progressText = d.querySelector('#progressText') 
const scoreText = d.querySelector('#score') 
const progressBarFull = d.querySelector('#progressBarFull')   

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: '¿Cuál es tu disponibilidad de horario para laborar?',
        choice1: 'Indiferente',
        choice2: 'Mañanas',
        choice3: 'Medio día',
        choice4: 'Tardes',
        choice5: 'Noches',
        // answer: 2
    },
    {
        question: '¿En qué ciudad se encuentra el edificio más alto del mundo?',
        choice1: 'Dubai',
        choice2: 'New York',
        choice3: 'Shangai',
        choice4: 'Ninguna de las anteriores',
        choice5: 'Noches',
        answer: 1
    },
    {
        question: '¿Qué porcentaje de adultos estadounidenses cree que la leche con chocolate proviene de vacas marrones?',
        choice1: '20%',
        choice2: '18%',
        choice3: '7%',
        choice4: '33%',
        choice5: 'Noches',
        answer: 3
    },
    {
        question: '¿Aproximadamente qué porcentaje de los cortes de energía en los EE.UU. son causados ​​por ardillas?',
        choice1: '10-20%',
        choice2: '5-10%',
        choice3: '15-20%',
        choice4: '30-40%',
        choice5: 'Noches',
        answer: 1
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)
    }
    questionCounter++
    progressText.innerText = `Pregunta ${questionCounter} de ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']    

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct'){
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    }) 
})

incrementScore = num => {
    score += num
    scoreText.innerText = score 
}

startGame()