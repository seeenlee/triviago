import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Question.css"
import apis from './api.js'

export default function Question() {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [selectedOption, setSelectedOption] = useState(null);
    const [next, setNext] = useState(false);
    const [correctString, setCorrectString] = useState("Incorrect");

    useEffect(() => {
        apis.getQuestion()
        .then(response => {
            setData(response.data)
            setLoading(false)
            setSelectedOption(null)
            setNext(false)
        })
        .catch(error => {
            console.error(error)
        })
    }, [next]);

    useEffect(() => {
        if (selectedOption !== null && selectedOption === data.answer) {
            setCorrectString("Correct!")
        }
        else {
            setCorrectString("Incorrect")
        }
    })


    return (
        <div>
            {selectedOption !== null ? (
                <div>
                <h1>{data.question}</h1>
                <h2>{correctString}</h2>
                <h2>Your answer: {selectedOption}</h2>
                <h2>Correct answer: {data.answer}</h2>
                <button
                    onClick = {() => setNext(true)}
                >
                    Next question
                </button>
                </div>
            ) : (
            <div>
            {loading ? (
                <h1>Loading</h1>
            ) : (
                <div className="question-div">
                    <h1>{data.question}</h1>
                    <button style={selectedOption === data.option1 ? { backgroundColor: 'lightblue' } : {}}
                        onClick={() => setSelectedOption(data.option1)}
                    >
                        {data.option1}
                    </button>
                    <button 
                        style={selectedOption === data.option2 ? { backgroundColor: 'lightblue' } : {}}
                        onClick={() => setSelectedOption(data.option2)}
                    >
                        {data.option2}
                    </button>
                    <button 
                        style={selectedOption === data.option3 ? { backgroundColor: 'lightblue' } : {}}
                        onClick={() => setSelectedOption(data.option3)}
                    >
                        {data.option3}
                    </button>
                    <button 
                        style={selectedOption === data.answer ? { backgroundColor: 'lightblue' } : {}}
                        onClick={() => setSelectedOption(data.answer)}
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
