import React, {useState} from 'react';
import './Login.css';
import apis from './api.js'
import { useNavigate } from "react-router-dom";

function AddQuestion() {
    const navigate = useNavigate()
    const [question, setQuestion] = useState();
    const [answer, setAnswer] = useState();
    const [option1, setOption1] = useState();
    const [option2, setOption2] = useState();
    const [option3, setOption3] = useState();

    const submit = async () => {
        const payload = {
            username: sessionStorage.getItem('username'),
            question: question,
            answer: answer,
            option1: option1,
            option2: option2,
            option3: option3
        }
        apis.addQuestion(payload)
        .then(res => {
            window.alert("Question added successfully!")
            navigate('/')
        })
        .catch(error => console.error(error));
    }
    return (
        <div className="login-container">
            <h1>Add Question</h1>
            <div className="input-container">
                <label>Question</label>
                <input type="text" placeholder="Question" onChange={e => setQuestion(e.target.value)}/>
            </div>
            <div className="input-container">
                <label>Answer</label>
                <input type="text" placeholder="Answer" onChange={e => setAnswer(e.target.value)}/>
            </div>
            <div className="input-container">
                <label>Option</label>
                <input type="text" placeholder="Option 1" onChange={e => setOption1(e.target.value)}/>
            </div>
            <div className="input-container">
                <label>Option</label>
                <input type="text" placeholder="Option 2" onChange={e => setOption2(e.target.value)}/>
            </div>
            <div className="input-container">
                <label>Option</label>
                <input type="text" placeholder="Option 3" onChange={e => setOption3(e.target.value)}/>
            </div>
            <button onClick={event => submit()}>Submit</button>
        </div>
    );
}

export default AddQuestion;
