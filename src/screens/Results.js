import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import './results.css'

@inject('questionsStore')
@observer
class ResultsScreen extends React.Component {
    render() {
        const { questionsStore } = this.props
        const { 
            totalCount, questions, correctCount, unfinishedCount, isPulled 
        } = questionsStore
        
        if (unfinishedCount !== 0 || !isPulled) {
            return <Redirect to="/" />
        }

        return (
            <div className="results screen">
                <div className="results__score">You scored {correctCount} / {totalCount}</div>

                <div className="results__questions">
                    {
                        questions.map((question, idx) => 
                            <div className="results__questions__item" key={idx}>
                                <span className="results__questions__item__sign">
                                    {question.answerCorrect ? '+' : '-'}
                                </span>
                                <span
                                    className="results__questions__item__text" 
                                    dangerouslySetInnerHTML={{__html: question.question}} 
                                />
                            </div>    
                        )
                    }    
                </div>

                <Link to="/">PLAY AGAIN?</Link>     
            </div>
        )
    }
}

export default ResultsScreen