import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { inject, observer } from "mobx-react"

import './question.css'

@inject('questionsStore')
@observer
class QuestionScreen extends React.Component {
    render() {
        const { questionsStore } = this.props
        const { 
            isPulled, isError, nextQuestion, unfinishedCount, totalCount, isPullingStarted 
        } = questionsStore

        if (!isPulled) {
            if (!isPullingStarted) {
                questionsStore.pullFromServer()
            }

            return <div>Waiting for questions...</div>
        } else if (isError) {
            return (
                <div> 
                    <div>Error</div>
                    <Link to="/">Try again</Link>
                </div>
            )
        } else if (unfinishedCount === 0) {
            return <Redirect to="/results" />
        }

        return (
            <div className="question screen">
                <div className="question__category">{nextQuestion.category}</div>
                <div className="question__card">
                    <div 
                        className="question__card__question"
                        dangerouslySetInnerHTML={{__html: nextQuestion.question}}
                    />
                    <div className="question__card__progress">
                        {totalCount - unfinishedCount + 1} of {totalCount}
                    </div>
                </div>
                <div className="question__buttons">
                    <button onClick={() => nextQuestion.answer(false)}>FALSE</button>
                    <button onClick={() => nextQuestion.answer(true)}>TRUE</button>
                </div>
            </div> 
        )
    }
}

export default QuestionScreen