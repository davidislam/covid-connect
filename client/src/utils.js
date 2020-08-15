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

export const daysCapitalized = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
export const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
export const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];