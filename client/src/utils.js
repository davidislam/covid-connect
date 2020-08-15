// A generic input handler
export const handleChange = (comp, e) => {
  const name = e.target.name;
  const value = e.target.value;
  comp.setState({ [name]: value });
}

// A toggler
export const toggle = (comp, name) => {
  comp.setState({ [name]: !comp.state[name] });
}

// Handle errors when making requests
export const handleError = error => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
  }
  console.log(error.config);
}

export const daysCapitalized = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
export const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
export const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];