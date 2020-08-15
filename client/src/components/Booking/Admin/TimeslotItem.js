import React, { Component } from "react";

export default class TimeslotItem extends Component {
  render() {
    const { id, title, day } = this.props.ts;
    return (
      <div style={itemStyle}>
        <p>
          {title}
          <button onClick={() => this.props.delTimeslot(day, id)} style={btnStyle}>
            x
          </button>
        </p>
      </div>
    );
  }
}

const itemStyle = {
  background: "#f4f4f4",
  padding: "10px",
  borderBottom: "1px #ccc dotted"
}

const btnStyle = {
  background: "#ff0000",
  color: "#fff",
  border: "none",
  padding: "5px 9px",
  borderRadius: "50%",
  cursor: "pointer",
  float: "right",
};
