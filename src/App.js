import React from 'react';
import Layout from './HOC/Layout/Layout';
import { Route, Switch } from 'react-router-dom';
import Quiz from './Containers/Quiz/Quiz';
import QuizList from './Containers/QuizList/QuizList';
import QuizCreator from './Containers/QuizCreator/QuizCreator';
import Auth from './Containers/Auth/Auth';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/quiz-creator" component={QuizCreator} />
        <Route path="/quiz/:id" component={Quiz} />
        <Route path="/" component={QuizList} />        
      </Switch>
    </Layout>
  );
}

export default App;
