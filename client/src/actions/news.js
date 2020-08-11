// A function to send a GET request to the web server,
// and then loop through them and add a list element for each news article
export const getNews = (newsList) => {
    // the URL for the request
    const url = "/news";

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not get news");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            newsList.setState({ newsList: json.students });
        })
        .catch(error => {
            console.log(error);
        });
};

// A function to send a POST request with a new news article
export const addNews = (formComp, dashboardComp) => {
    // the URL for the request
    const url = "/news";

    // The data we are going to send in our request
    const news = formComp.state

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(news),
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
