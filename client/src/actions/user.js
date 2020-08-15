import axios from 'axios';

const log = console.log;

const api = axios.create({
    baseURL: '/users'
})


// A function to check if a user is logged in on the session cookie
export const readCookie = (app) => {
    api.get('/check-session')
        .then(res => {
            app.setState({ currentUser: res.data.currentUser })
        })
        .catch(error => {
            log(error);
        })
};

// A function to send a POST request with the user to be logged in
export const login = (credentials, app, signin) => {
    api.post('/login', credentials)
        .then(res => {
            if (res.data.currentUser !== undefined)
                app.setState(res.data)
        })
        .catch(error => {
            signin.setState({ showSnackbar: true, message: "Incorrect username/password", severity: 'error' })
            log(error);
        })
};

// A function to send a GET request to logout the current user
export const logout = (app) => {
    api.get('/logout')
        .then(res => {
            app.setState({ currentUser: null, isAdmin: false, isLoggedIn: false })
        })
        .catch(error => {
            log(error);
        })
};


// A function to send a POST request to signup the current user
export const signup = (signupComp, info) => {
    api.post('/', info)
        .then(res => {
            signupComp.setState({ showSnackbar: true, message: "Signed up successfully", severity: 'success' })
        })
        .catch(error => {
            signupComp.setState({ showSnackbar: true, message: "Sorry there was a registration problem", severity: 'error' })
            log(error);
        })
}

// A function to GET profile data for user with id <id>
export const getProfile = (id, setInfo) => {
    api.get(`/${id}`)
        .then(res => {
            setInfo(res.data);
        })
        .catch(error => {
            log(error);
        })
}

// A function to GET profile data for current user
export const getProfileForCurrentUser = (setInfo) => {
    api.get(`/user`)
        .then(res => {
            setInfo(res.data);
        })
        .catch(error => {
            log(error);
        })
}

// A function to PATCH profile data for user with id <id>
export const updateProfile = (id, info, app, setOpen) => {
    api.patch(`/${id}`, info)
        .then(res => {
            app.setState({ currentUser: res.data.username });
            setOpen(true);
        })
        .catch(error => {
            log(error);
        })
}

// A function to PATCH profile data for current user
export const updateProfileForCurrentUser = (info, app, setOpen) => {
    api.patch(`/user`, info)
        .then(res => {
            app.setState({ currentUser: res.data.username });
            setOpen(true);
        })
        .catch(error => {
            log(error);
        })
}
