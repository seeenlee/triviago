import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Question.css"
import apis from './api.js'
import IconButton from "@mui/material/IconButton";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import {Stack} from "@mui/material";

export default function Question() {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [selectedOption, setSelectedOption] = useState(null);
    const [correctString, setCorrectString] = useState("Incorrect");
    const [thumbsUp, setThumbsUp] = useState(false)

    const nextQuestion = () => {
        if (thumbsUp) {
            const payload = {
                username: sessionStorage.getItem('username'),
                questionID: data.id,
                reaction: true
            }
            apis.addReaction(payload)
                .catch((error) => console.log(error))
        }
        const payload = {
            username: sessionStorage.getItem('username')
        }
        apis.getQuestion(payload)
            .then(response => {
                if (response.data === -1) {
                    setLoading(true)
                }
                else {
                    setLoading(false)
                }
                setData(response.data)
                setSelectedOption(null)
            })
            .catch(error => {
                console.error(error)
            })
    }

    useEffect(() => {
        if (selectedOption !== null && selectedOption === data.answer) {
            setCorrectString("Correct!")
        }
        else {
            setCorrectString("Incorrect")
        }
    }, [selectedOption]);

    useEffect(() => {
        nextQuestion()
    }, [])

    const addResult = async (option) => {
        setSelectedOption(option)
        const payload = {
            questionID: data.id,
            username: sessionStorage.getItem('username'),
            answer: data.answer,
            choice: option,
            correct: data.answer === option
        }
        apis.addResult(payload)
            .catch(error => console.error(error))
    }

    const logOut = () => {
        sessionStorage.removeItem("username")
        window.location.reload()
    }


    return (
        <div>
            <div className="logout-container">
                <button className="logout-button" onClick={logOut}>Logout</button>
            </div>
            {selectedOption !== null ? (
                <div>
                    <h1>{data.question}</h1>
                    <h2>{correctString}</h2>
                    <h2>Your answer: {selectedOption}</h2>
                    <h2>Correct answer: {data.answer}</h2>
                    <Stack direction="column" alignItems="center">
                    <button
                        onClick={nextQuestion}
                    >
                        Next question
                    </button>
                        <Stack direction="row">
                            {thumbsUp === true ? (
                                <IconButton aria-label={"Thumbs Up"} onClick={() => setThumbsUp(!thumbsUp)}>
                                    <ThumbUpAltIcon/>
                                </IconButton>
                                ) : (
                                <IconButton aria-label={"Thumbs Up"} onClick={() => setThumbsUp(!thumbsUp)}>
                                    <ThumbUpOffAltIcon/>
                                </IconButton> )
                            }
                        </Stack>
                    </Stack>
                </div>
            ) : (
                <div>
                    {loading ? (
                        <h1>You're out of questions!</h1>
                    ) : (
                        <div className="question-div">
                            <h1>{data.question}</h1>
                            <button style={selectedOption === data.option1 ? {backgroundColor: 'lightblue'} : {}}
                                    onClick={() => addResult(data.option1)}
                            >
                                {data.option1}
                            </button>
                            <button
                                style={selectedOption === data.option2 ? {backgroundColor: 'lightblue'} : {}}
                                onClick={() => addResult(data.option2)}
                            >
                                {data.option2}
                            </button>
                            <button
                                style={selectedOption === data.option3 ? {backgroundColor: 'lightblue'} : {}}
                                onClick={() => addResult(data.option3)}
                            >
                                {data.option3}
                            </button>
                            <button
                                style={selectedOption === data.answer ? {backgroundColor: 'lightblue'} : {}}
                                onClick={() => addResult(data.answer)}
                            >
                                {data.answer}
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
