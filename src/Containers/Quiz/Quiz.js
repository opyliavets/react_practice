import React, { Component } from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../Components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../Components/FinishedQuiz/FinishedQuiz'
import Loader from '../../Components/UI/Loader/Loader'
import { connect } from 'react-redux'
import {fetchQuizById} from '../../Store/Actions/quiz'

class Quiz extends Component{
 
    onAnswerIdHandler = answerId => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') {
                return
            }
        }

        const question = this.state.quiz.quiz[this.state.activeQuestion] 
        const results = this.state.results

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }

            this.setState({
                answerState: { [answerId]: 'success' },
                results
            })

            let timeout = window.setTimeout(() => {                
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true,
                    })
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }
                window.clearTimeout(timeout)
            }, 1000)
                        
        } else {
            results[question.id] = 'error'
            this.setState({
                answerState: {[answerId]: 'error'},
                results,                
            })

            let timeout = window.setTimeout(() => {                
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true,
                    })
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }
                window.clearTimeout(timeout)
            }, 1000)
        }        
    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.quiz.length     
    }

    onRetryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }

    componentDidMount() {
        console.log(this.props)

        this.props.fetchQuizById(this.props.match.params.id)
    }

    
    render() {
        return (
            <div className={classes.Quiz}>             
                <div className={classes.QuizWrapper}>
                <h1>Дайте відповідь на питання</h1>

                    {
                        this.props.loading  || !this.props.quiz                           
                            ? <Loader />
                            : this.props.isFinished
                                ? <FinishedQuiz
                                    results={this.props.results}
                                    quiz={this.props.quiz.quiz}
                                    onRetry={this.onRetryHandler}
                                />
                                : <ActiveQuiz
                                    answers={this.props.quiz.quiz[this.props.activeQuestion].answers}
                                    question={this.props.quiz.quiz[this.props.activeQuestion].question}
                                    onAnswerClick={this.onAnswerIdHandler}
                                    quizLength={this.props.quiz.quiz.length}
                                    answerNumber={this.props.activeQuestion + 1}
                                    state={this.props.answerState}
                                />                           
                    }                  
                </div>
            </div>
        )
        
    }
}

function mapStateToProps(state) {
    return {
        results: state.quiz.results,
        isFinished: state.quiz.isFinished,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        quiz: state.quiz,
        loading: state.quiz.loading,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id))       
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
