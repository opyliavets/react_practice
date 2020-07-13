import axios from 'axios'

export default axios.create({
    baseURL: 'https://react-quiz-96069.firebaseio.com/'
})