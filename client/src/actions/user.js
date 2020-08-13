import axios from 'axios';
import { handleError } from './../utils';

const log = console.log;

const api = axios.create({
    baseURL: 'http://localhost:5000/users'
})


// A function to check if a user is logged in on the session cookie
export const readCookie = (app) => {
    api.get('/check-session')
        .then(res => {
            if (res.data.currentUser)
                app.setState({ currentUser: res.data.currentUser })
        })
        .catch(error => {
            handleError(error);
        })
};

// A function to send a POST request with the user to be logged in
export const login = (signinComp, app) => {
    api.post('/login', signinComp)
        .then(res => {
            if (res.data.currentUser !== undefined)
                app.setState(res.data)
        })
        .catch(error => {
            handleError(error);
        })
};

// A function to send a GET request to logout the current user
export const logout = (app) => {
    api.get('/logout')
        .then(res => {
            app.setState({ currentUser: null, isAdmin: false })
        })
        .catch(error => {
            handleError(error);
        })
};