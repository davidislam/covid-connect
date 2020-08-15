import axios from 'axios';
import { handleError, days, daysCapitalized, months } from './../utils';
const ObjectID = require("bson-objectid");


const api = axios.create({
  baseURL: '/newsarticles'
})

const log = console.log;

// A function to send a GET request to the web server,
// and then loop through them and add a list element for each newsarticles article
export const getNewsArticles = (newsarticleList) => {
    const url = "/newsarticles";

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert("Could not get news articles");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            newsarticleList.setState({ newsarticleList: json.newsarticles });
        })
        .catch(error => {
            console.log(error);
        });
};

// A function to send a POST request with a new newsarticles article
export const addNewsArticle = (formComp, data) => {

  api.post('/',data)
    .then(res => {
      formComp.setState({ showSnackbar: true, message: "Added news successfully", severity: 'success' })
    })
    .catch(err => {
      signupComp.setState({ showSnackbar: true, message: "Sorry there was a upload problem", severity: 'error' })
    })

};

export async function removeNewsById(comp, id) {
    try {
      const res = await api.delete(`/${id}`);
      log(res);
      comp.setState({
        snackbarOpen: true,
        snackbarMessage: `${res.data.name} has been removed from the database`,
        snackbarSeverity: 'success',
        cid: ''
      })
      getNewsArticles(comp);
    } catch (error) {
      handleError(error);
      comp.setState({
        snackbarOpen: true,
        snackbarMessage: 'Could not remove article',
        snackbarSeverity: 'error'
      })
    }
  }
