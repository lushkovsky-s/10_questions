import { observable, computed, action } from 'mobx'
import axios from 'axios'

const COUNT = 10

class Question {
    @observable category = ''
    @observable type = 'boolean'
    @observable difficulty = ''
    @observable question = ''
    @observable correctAnswer = null
    @observable incorrectAnswers = []

    @observable answered = false
    @observable answerCorrect = null

    @action answer(answer) {
        this.answered = true
        this.answerCorrect = answer === this.correctAnswer 
    }
}

class QuestionsStore {
    @observable questions = []
    @observable totalCount = COUNT
    @observable isPulled = false
    @observable isPullingStarted = false
    @observable isError = false

    @action pullFromServer() {
        this.isPullingStarted = true

        axios.get('https://opentdb.com/api.php', {
                params: {
                    amount: COUNT,
                    difficulty: 'hard',
                    type: 'boolean'
                }
            })
            .then((resp) => resp.data)
            .then(({results}) => {
                this.questions = results.map(item => {
                    const question = new Question()

                    question.category = item.category
                    question.difficulty = item.difficulty
                    question.question = item.question
                    question.correctAnswer = item.correct_answer === 'True'
                    question.incorrectAnswers = item.incorrect_answers.map(ans => ans === 'True')
                    question.type = item.type

                    return question 
                })

                this.isPulled = true
            })
            .catch(() => { 
                this.isError = true
                this.isPulled = true
            })
    }

    @action reset() {
        this.questions = this.questions.map(q => {
            q.answered = false
            q.answerCorrect = null

            return q
        })
    }

    @computed get unfinishedQuestions() {
        return this.questions.filter(q => !q.answered)
    }

    @computed get nextQuestion() {
        return this.unfinishedQuestions[0]
    }

    @computed get unfinishedCount() {
        return this.unfinishedQuestions.length
    }

    @computed get correctCount() { 
        return this.questions.filter(q => q.answered && q.answerCorrect).length
    }
}

const questionsStore = new QuestionsStore()

export default questionsStore
