import axios from 'axios';
//import { NewsArticle } from '../../../models/news';

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
                console.log("Could not get news articles");
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

// // A function to get how many news articles are in database
// export const getNewsCount = (newsarticleList) => {
//     const url = "/newsarticles"

//     fetch(url)
//         .then(res => { 
//             if (res.status == 200) {
//                 return NewsArticle.estimatedDocumentCount()
//             } else {
//                 alert("Could not get database")
//             }
//         })
//         .catch(error => {
//             console.log(error);
//         });
// }

// A function to send a POST request with a new newsarticles article
export const addNewsArticle = (formComp, dashboardComp) => {

    const url = "/newsarticles";

    const newsarticle = formComp.state

    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(newsarticle),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(function (res) {

            if (res.status === 200) {
                dashboardComp.setState({
                    message: {
                        body: "Success: Added a news article.",
                        type: "success"
                    }
                });
            } else {
                dashboardComp.setState({
                    message: {
                        body: "Error: Could not add news article.",
                        type: "error"
                    }
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
};

export async function removeNewsById(comp, id) {
    try {
        const res = await api.delete(`/${id}`);
        comp.setState({
            snackbarOpen: true,
            snackbarMessage: `${res.data.name} has been removed from the database`,
            snackbarSeverity: 'success',
            cid: ''
        })
        getNewsArticles(comp);
    } catch (error) {
        log(error);
        comp.setState({
            snackbarOpen: true,
            snackbarMessage: 'Could not remove article',
            snackbarSeverity: 'error'
        })
    }
}