import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import StartScreen from './screens/Start'
import QuestionScreen from './screens/Question'
import ResultsScreen from './screens/Results'

export default () => (
    <Router>
        <Switch>
            <Route path="/question" component={QuestionScreen} />
            <Route path="/results" component={ResultsScreen} />
            <Route path="/" component={StartScreen} />
        </Switch>
    </Router>
)