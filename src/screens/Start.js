import React from 'react'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import './start.css'

@inject('questionsStore')
@observer
class StartScreen extends React.Component { 
    constructor(props) {
        super(props)

        this.props.questionsStore.pullFromServer()
    }

    render() {
        const { questionsStore } = this.props
        const { totalCount } = questionsStore

        return (
            <div className="start screen">
                <div className="start__welcome">Welcome to the Trivia Challenge!</div>
                <div className="start__description">
                    You will be presented with {totalCount} True or False questions
                </div>
                <div className="start__motivation">Can you score 100%?</div>

                <Link to="/question">BEGIN</Link>
            </div>
        )
    }
}

export default StartScreen