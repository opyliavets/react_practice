import React, { Component } from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../Components/ActiveQuiz/ActiveQuiz'

class Quiz extends Component{
    state = {
        activeQuestion: 0,
        answerState: null,
        quiz: [
            {
                question: 'Какого цвета небо?',
                rightAnswerId: 2,
                id: 1,
                answers: [
                    { text: 'Черный', id: 1 },
                    { text: 'Синий', id: 2},
                    { text: 'Красный', id: 3 },
                    { text: 'Зелёный', id: 4}
                   
                ]
            },

            {
                question: 'Скільки років Всесвіту?',
                rightAnswerId: 4,
                id: 1,
                answers: [
                    { text: '2020', id: 1 },
                    { text: '80 000', id: 2},
                    { text: 'бл. 35 млрд.', id: 3 },
                    { text: 'бл. 13,5 млрд.', id: 4}
                   
                ]
            }, 

            {
                question: 'Хто президент України?',
                rightAnswerId: 2,
                id: 1,
                answers: [
                    { text: 'Петро Порошенко', id: 1 },
                    { text: 'Володимир Зеленський', id: 2},
                    { text: 'Іван Царевич', id: 3 },
                    { text: 'Віктор Ляшко', id: 4}
                   
                ]
            }
        ]
    }
    
    onAnswerIdHandler = (answerId) => {
        console.log('Answer ID:', answerId)

        const question = this.state.quiz[this.state.activeQuestion]

        if (question.rightAnswerId === answerId) {

            this.setState({
                answerState: {[answerId]: 'success'}
            })

            const timeout = window.setTimeout(() => {
                
                if (this.isQuizFinished()) {
                    
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }
                window.clearTimeout(timeout)
            }, 1000)


        } else {
            this.setState({
                answerState: {[answerId]: 'error'}
            })
        }


    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    render() {
        return (
            <div className={classes.Quiz}>             
                <div className={classes.QuizWrapper}>
                <h1>Дайте відповідь на питання</h1>
                    <ActiveQuiz
                        answers={this.state.quiz[this.state.activeQuestion].answers}
                        question={this.state.quiz[this.state.activeQuestion].question}
                        onAnswerClick={this.onAnswerIdHandler}
                        quizLength={this.state.quiz.length}
                        answerNumber={this.state.activeQuestion + 1}
                        state={this.state.answerState}
                    />                    
                </div>
            </div>
        )
        
    }
}

export default Quiz