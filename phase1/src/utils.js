/* This file consists of commonly used methods across components */

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