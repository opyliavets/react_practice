import React, { Component } from 'react';
import Layout from './HOC/Layout/Layout';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Quiz from './Containers/Quiz/Quiz';
import QuizList from './Containers/QuizList/QuizList';
import QuizCreator from './Containers/QuizCreator/QuizCreator';
import Auth from './Containers/Auth/Auth';
import {connect} from 'react-redux'
import Logout from './Components/Logout/Logout';

class App extends Component {

  // componentDidMount() {
  //   this.props.authLogin()
  // }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/quiz/:id" component={Quiz} />
        <Route path="/" component={QuizList} />
        <Redirect to="/" />
      </Switch>
    )
  
    if (this.props.isAutenticated) {
      routes = (
        <Switch>
          <Route path="/quiz-creator" component={QuizCreator} />
          <Route path="/quiz/:id" component={Quiz} />
          <Route path="/" component={QuizList} />
          <Route path="/logout" component={Logout} />
          <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <Layout>
        { routes}
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  return {
    isAutenticated: !!state.auth.token
  }  
}

// function mapDispatchToProps(dispatch){
//   return {
//     authLogin: () => {dispatch(autoLogin())}
//   }
// }

export default withRouter(connect(mapStateToProps)(App));
