import axios from "axios";
export const axios_instance = axios.create({
    baseURL: 'http://localhost:4500/',
    timeout: 10000,
});

export async function authorizeMe(token) {
    axios_instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export async function signUp(data) {
    return new Promise((resolve, reject) => {
        axios_instance.post('api/auth/signup', data).then(function (response) {
            resolve(response);
        }).catch(function (error) { reject(error); })
    })
};

export async function login(data) {
    return new Promise((resolve, reject) => {
        axios_instance.post('api/auth/signin', data).then(function (response) {
            resolve(response);
        }).catch(function (error) { reject(error); })
    })
};


export async function getNotesList(page, data) {
    return new Promise((resolve, reject) => {
        axios_instance.post(`api/note/get-all?page=${page}`, data).then(function (response) {
            resolve(response);
        }).catch(function (error) { reject(error); })
    })
};


export async function addNotes(data) {
    return new Promise((resolve, reject) => {
        axios_instance.post('api/note/create', data).then(function (response) {
            resolve(response);
        }).catch(function (error) { reject(error); })
    })
};

export async function updateNotes(data) {
    return new Promise((resolve, reject) => {
        axios_instance.post('api/note/update', data).then(function (response) {
            resolve(response);
        }).catch(function (error) { reject(error); })
    })
};

export async function deleteNotes(id) {
    return new Promise((resolve, reject) => {
        axios_instance.delete(`api/note/delete/${id}`).then(function (response) {
            resolve(response);
        }).catch(function (error) { reject(error); })
    })
};

export async function updateUser(data) {
    return new Promise((resolve, reject) => {
        axios_instance.post('api/auth/update-user', data).then(function (response) {
            resolve(response);
        }).catch(function (error) { reject(error); })
    })
};