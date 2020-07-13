import React, {Component} from 'react'
import classes from './QuizCreator.module.css'
import Button from '../../Components/UI/Button/Button'
import { createControl, validate, validateForm } from '../../Form/FormFramework'
import Input from '../../Components/UI/Input/Input'
import Auxilliary from '../../HOC/Auxilliary/Auxilliary'
import Select from '../../Components/UI/Select/Select'
import axios from '../../Axios/Axios-quiz'

function createOptionsControl(number) {
    return createControl({
        label: `Варіант ${number}`,
        errorMessage: 'Значення не може бути пустим!',
        id: number
    }, {required: true})    
}

function createFormControls() {
    return {
        question: createControl({
            label: 'Введіть питання',
            errorMessage: 'Поле не може бути пустим!'                
        }, {required: true}),
        option1: createOptionsControl(1),
        option2: createOptionsControl(2),
        option3: createOptionsControl(3),
        option4: createOptionsControl(4),
    }
}

export default class QuizCreator extends Component {

    state = {
        quiz: [],
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls()
    }

    submitHandler = event => {
        event.preventDefault()
    }

    addQuestionHandler = event => {
        event.preventDefault()

        const quiz = this.state.quiz.concat()
        const index = quiz.length + 1

        const {question, option1, option2, option3, option4} = this.state.formControls

        const questionItem = {
            question: question.value,
            id: index,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                { text: option1.value, id: option1.id },
                { text: option2.value, id: option2.id },
                { text: option3.value, id: option3.id },
                { text: option4.value, id: option4.id },
            ]
        }

        quiz.push(questionItem)

        this.setState({
            quiz,
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls()
        })
    }

    addTestHandler = async event => {
        event.preventDefault()

        try {
            await axios.post('/quizes.json', this.state)
            
            this.setState({
                quiz:[],
                isFormValid: false,
                rightAnswerId: 1,
                formControls: createFormControls()
            })
        } catch (e) {
            console.log(e);
        }     
    }

    onChangeHandler = (value, controlName) => {
        const formControls = { ...this.state.formControls }
        const control = { ...formControls[controlName]}

        control.touched = true
        control.value = value
        control.valid = validate(control.value, control.validation)

        formControls[controlName] = control

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })
    }

    renderControls() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            
            return (
                <Auxilliary key={controlName + index}>
                    <Input
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={event => this.onChangeHandler(event.target.value, controlName)}
                    />     
                    {index === 0 ? <hr /> : null}
                </Auxilliary>    
            )
        })
    }

    selectChangeHandler = event => {
        this.setState({
            rightAnswerId: +event.target.value
        })
    }

    render() {
        const select = <Select
            label='Оберіть правильну відповідь'
            value={this.state.rightAnswerId}
            onChange={this.selectChangeHandler}
            options={[
                { text: 1, value: 1 },
                { text: 2, value: 2 },
                { text: 3, value: 3 },
                { text: 4, value: 4 }                
            ]}
        />

        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Створення тесту</h1>
                    
                    <form onSubmit={this.submitHandler}>

                        {this.renderControls()}
                        { select }

                        <Button
                            type='primary'
                            onClick={this.addQuestionHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Додати питання
                        </Button>   

                        <Button
                            type='success'
                            onClick={this.addTestHandler}
                            disabled={this.state.quiz.length === 0}
                        >
                            Створити тест
                        </Button> 

                    </form>                    
                </div>
            </div>
        )
    }
    
};