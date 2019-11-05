import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'

import './index.css'

import RoutedApp from './router'
import questionsStore from './stores/questions'

const stores = {
    questionsStore
}

ReactDOM.render(
    <Provider {...stores}>
        <RoutedApp />
    </Provider>, 
    document.getElementById('root')
)
