import axios from "axios";

const api  = axios.create({
    baseURL: "http://localhost:8080"
});

export const addQuestion = payload => api.post("/question/add", payload);
export const getQuestion = () => api.get("/question/");
export const login = payload => api.post("/user/login", payload);

const apis = {
    addQuestion,
    getQuestion,
    login
}

export default apis;