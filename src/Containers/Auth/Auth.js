import React, {Component} from 'react'
import classes from './Auth.module.css'
import Button from '../../Components/UI/Button/Button'
import Input from '../../Components/UI/Input/Input'
import axios from 'axios'


function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export default class Auth extends Component {

    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Введіть корректний email!',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMessage: 'Введіть корректний пароль!',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }

    registerHandler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.email.value,
            returnSecureToken: true
        }

        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDI5VR8B4L3fjjKwWnJzZj6Kiio_yzWcX4', authData)
            console.log(response.data)
        } catch (e) {
            console.log(e)
        }
        
    }

    loginHandler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.email.value,
            returnSecureToken: true
        }

        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDI5VR8B4L3fjjKwWnJzZj6Kiio_yzWcX4', authData)
            console.log(response.data)
        } catch (e) {
            console.log(e)
        }
        
    }

    submitHandler = event => {
        event.preventDefault()
    }

    validateControl(value, validation) {
        if (!validation) {
            return true
        } 

        let isValid = true

        if(validation.required){
            isValid = value.trim() !== '' && isValid
        }

        if (validation.email) {
            isValid = validateEmail(value) && isValid
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid

        
    }

    onChangeHandler = (event, controlName) => {
        const formControls = { ...this.state.formControls }
        const control = { ...formControls[controlName]}

        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)

        formControls[controlName] = control

        let isFormValid = true

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({
            formControls, isFormValid
        })

    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]

            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={event => this.onChangeHandler(event, controlName)}

                />
            )
        })
    }

    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Авторизація</h1>
                    <form onSubmit={this.submitHandler} className={classes.AuthForm}>
                        {this.renderInputs()}
                        
                        <Button
                            type='success'
                            onClick={this.loginHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Увійти
                        </Button>
                        <Button
                            type='primary'
                            onClick={this.registerHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Зареєструватись
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
    
};
