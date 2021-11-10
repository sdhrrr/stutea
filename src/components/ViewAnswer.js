import React, {useState, useEffect} from 'react'
import { useHistory, useParams } from 'react-router-dom'

export const ViewAnswer = () => {
    const {quesid} = useParams();
    let history = useHistory();
    const host = process.env.REACT_APP_BACKEND_URL;
    const init = {
        "answer": "",
        "question": ""
    }
    const initQ = {
        "_id": "",
        "user": "",
        "question": "",
        "tags": []
    }

    const [question, setQuestion] = useState(initQ);
    const [answer, setAnswer] = useState(init);

    const getQuestionDetails = async () => {
        const response = await fetch(`${host}/api/questions/getquestion`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({
                quesid
            })
        })
        const json = await response.json();
        setQuestion(json);
    }

    const getAnswer = async () => {
        const response = await fetch(`${host}/api/answers/fetch`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({
                "question": quesid
            })
        });
        const json = await response.json();
        setAnswer(json);
    }

    useEffect(() => {
        getAnswer();
        getQuestionDetails();
    }, [])
    return (
        <div>
            <h2>{question.question}</h2>
            {question.answered ? "yes": "no"}
            {question.tags.map((tag)=>
                <div className="tag">
                    {tag}
                </div>
            )}
            <h3>Answer</h3>
            {answer.answer ? answer.answer : "No one answered"}
        </div>
    )
}
