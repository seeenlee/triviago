import React, { useState, useEffect } from "react";
import apis from './api.js'
import Box from "@mui/material/Box";
import {Stack} from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const [data, setData] = useState();
    const [cache, setCache] = useState();
    const [loading, setLoading] = useState(true);
    const [toggle, setToggle] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const payload = {
            username: sessionStorage.getItem('username')
        }
        apis.getReport(payload)
            .then(response => {
                setLoading(false);
                setCache({
                    results: response.data.results,
                    yours: response.data.yours,
                    twenty: parseFloat(response.data.twenty.percent).toFixed(2) + '%',
                    fifty: parseFloat(response.data.fifty.percent).toFixed(2) + '%',
                    all: parseFloat(response.data.all.percent).toFixed(2) + '%',
                    likes: parseInt(response.data.likes.likes)
                })
                setData(response.data.yours);
            })
            .catch(error => {
                console.error(error);
            })
    }, []);

    if (loading) {
        return <div style={{ textAlign: 'center' }}>Loading...</div>;
    }

    const changeData = () => {
        console.log(cache)
        if (toggle === true) {
            setData(cache.yours)
            setToggle(false)
        }
        else {
            setData(cache.results)
            setToggle(true)
        }
    }

    // const changeData = () => {
    //     setToggle(prevToggle => !prevToggle);
    // }

    const seeQuestion = (id) => {
        navigate(`/edit/${id}`)
    }

    // const getQuestions = () => {
    //     return (
    //         <>
    //             <Stack direction="column" alignItems="center" style={{width: "100%"}}>
    //                 {toggle ? (
    //                     <Button variant="outlined" onClick={changeData}>Yours</Button>
    //                 ): (
    //                     <Button variant="outlined" onClick={changeData}>Results</Button>
    //                 )
    //                 }
    //
    //                 {data && data.length > 0 ? (
    //                     data.map((item, index) => (
    //                         <button key={index} style={{margin: '20px', fontSize: 'larger', border: '1px solid black'}} onClick={() => {seeQuestion(item.questionID)}} >
    //                             <p style={{fontSize: 'large', fontWeight: 'bold', margin: '10px 0'}}>
    //                                 Question: {item.question}
    //                             </p>
    //                             {toggle ? (
    //                                 <p>
    //                                     Yours: {item.answer}
    //                                 </p>
    //                             ) : (
    //                                 <p>
    //                                     Results: {item.choice} (Correct answer: {item.answer})
    //                                 </p>
    //                             )}
    //                         </button>
    //                     ))
    //                 ) : (
    //                     <p style={{fontSize: 'larger'}}>No questions to display</p>
    //                 )}
    //             </Stack>
    //         </>
    //     )
    // }

    const getQuestions = () => {
        return (
            <>
                <Stack direction="column" alignItems="center" style={{width: "100%"}}>
                    <Button variant="outlined" onClick={changeData}>
                        {toggle ? 'Your Results' : 'Your Questions'}
                    </Button>

                    {data && data.length > 0 ? (
                        data.map((item, index) => (
                            <button key={index} style={{margin: '20px', fontSize: 'larger', border: '1px solid black'}} onClick={() => {seeQuestion(item.questionID)}}>
                                <p style={{fontSize: 'large', fontWeight: 'bold', margin: '10px 0'}}>
                                    Question: {item.question}
                                </p>
                                {toggle ? (
                                    <p>
                                        Your Choice: {item.choice} (Correct answer: {item.answer})
                                    </p>
                                ) : (
                                    <p>
                                        Answer: {item.answer}
                                    </p>
                                )}
                            </button>
                        ))
                    ) : (
                        <p style={{fontSize: 'larger'}}>No questions to display</p>
                    )}
                </Stack>
            </>
        )
    }

    const getPerformance = () => {
        return (
            <>
                <Stack style={{width: "100%"}}>
                    <h1>Your Performance</h1>
                    <h3>Last 20 questions: {cache.twenty}</h3>
                    <h3>Last 50 questions: {cache.fifty}</h3>
                    <h3>All time questions: {cache.all}</h3>
                    <h3>Total Likes: {cache.likes}</h3>
                </Stack>
            </>
        )
    }
    return (
        <div style={{textAlign: 'center'}}>

            <Stack direction="row" sx={{width: "100%"}}>
                {getQuestions()}
                {getPerformance()}
            </Stack>

        </div>
    );
}
