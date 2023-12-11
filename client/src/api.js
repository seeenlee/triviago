import axios from "axios";

const api  = axios.create({
    baseURL: "http://localhost:8080"
});

export const addQuestion = payload => api.post("/question/add", payload);
export const getQuestion = payload => api.post("/question/", payload);
export const login = payload => api.post("/user/login", payload);

export const addResult = payload => api.post("/result/add", payload)
export const getReport = payload => api.post("/report/", payload)

export const addReaction = payload => api.post("/reaction/add", payload)

export const findQuestion = payload => api.post("/question/find", payload)

export const deleteQuestion = payload => api.post("/question/delete", payload)
export const updateQuestion = payload => api.post("/question/update", payload)

const apis = {
    addQuestion,
    getQuestion,
    login,
    addResult,
    getReport,
    addReaction,
    findQuestion,
    deleteQuestion,
    updateQuestion,
}

export default apis;