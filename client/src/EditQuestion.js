import React, {useEffect, useState} from 'react';
import './Login.css';
import apis from './api.js'
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import {Stack} from "@mui/material";

function EditQuestion() {
    const navigate = useNavigate()
    const [question, setQuestion] = useState();
    const [answer, setAnswer] = useState();
    const [option1, setOption1] = useState();
    const [option2, setOption2] = useState();
    const [option3, setOption3] = useState();

    const {id} = useParams()


    const submit = async () => {
        const payload = {
            id: id,
            question: question,
            answer: answer,
            option1: option1,
            option2: option2,
            option3: option3
        }
        apis.updateQuestion(payload)
            .then(res => {
                window.alert("Question changed successfully!")
                navigate('/profile')
            })
            .catch(error => console.error(error));
    }

    const deleteQuestion = () => {
        const payload = {
            id: id
        }
        apis.deleteQuestion(payload)
            .catch((error) => console.error(error))
        navigate('/profile')
        window.location.reload()
    }


    useEffect(() => {
        const payload = {
            id: id
        }
        apis.findQuestion(payload)
            .then(res => {
                setQuestion(res.data.question)
                setAnswer(res.data.answer)
                setOption1(res.data.option1)
                setOption2(res.data.option2)
                setOption3(res.data.option3)
            })
            .catch(error => console.error(error));
    }, []);
    return (
        <div className="login-container">
            <h1>Edit Question</h1>
            <div className="input-container">
                <label>Question</label>
                <input type="text" value={question} onChange={e => setQuestion(e.target.value)}/>
            </div>
            <div className="input-container">
                <label>Answer</label>
                <input type="text" value={answer} onChange={e => setAnswer(e.target.value)}/>
            </div>
            <div className="input-container">
                <label>Option</label>
                <input type="text" value={option1} onChange={e => setOption1(e.target.value)}/>
            </div>
            <div className="input-container">
                <label>Option</label>
                <input type="text" value={option2} onChange={e => setOption2(e.target.value)}/>
            </div>
            <div className="input-container">
                <label>Option</label>
                <input type="text" value={option3} onChange={e => setOption3(e.target.value)}/>
            </div>
            <div>
                <Stack alignItems="row">
                    <button onClick={event => submit()}>Submit</button>
                    <button onClick={event => deleteQuestion()}>Delete</button>
                </Stack>
            </div>
        </div>
    );
}

export default EditQuestion;
