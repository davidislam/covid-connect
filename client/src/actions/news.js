// A function to send a GET request to the web server,
// and then loop through them and add a list element for each newsarticles article
export const getNewsArticles = (newsarticleList) => {
    // the URL for the request
    const url = "/newsarticles";

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
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
export const addNewsArticle = (formComp, dashboardComp) => {
    // the URL for the request
    const url = "/newsarticles";

    // The data we are going to send in our request
    const newsarticle = formComp.state

    // Create our request constructor with all the parameters we need
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
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                // If added successfully, tell the user.
                dashboardComp.setState({
                    message: {
                        body: "Success: Added a news article.",
                        type: "success"
                    }
                });
            } else {
                // If server couldn't add, tell the user.
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
