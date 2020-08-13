// A function to send a GET request to the web server,
// and then loop through them and add a list element for each newsarticles article
export const getNewsArticles = (newsarticlesList) => {
    // the URL for the request
    const url = "/newsarticles";

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not get newsarticles");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            newsarticlesList.setState({ newsarticlesList: json.students });
        })
        .catch(error => {
            console.log(error);
        });
};

// A function to send a POST request with a new newsarticles article
export const addNewsArticles = (formComp, dashboardComp) => {
    // the URL for the request
    const url = "/newsarticles";

    // The data we are going to send in our request
    const newsarticles = formComp.state

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(newsarticles),
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
                        body: "Success: Added a newsarticles article.",
                        type: "success"
                    }
                });
            } else {
                // If server couldn't add, tell the user.
                dashboardComp.setState({
                    message: {
                        body: "Error: Could not add newsarticles article.",
                        type: "error"
                    }
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
};
