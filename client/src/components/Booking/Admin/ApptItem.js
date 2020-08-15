import React, { Component } from "react";
import { handleChange } from "../../../utils";


export default class ApptItem extends Component {
  state = {
    status: ''
  }

  render() {
    const { id, date, time, address } = this.props.appt;
    const title = `${id}, ${date} ${time}, ${address}`;
    return (
      <div style={itemStyle}>
        <p>
          {title}
          <select style={{ marginLeft: '10px' }} name="status" value={this.state.status} onChange={(e) => handleChange(this, e)}>
            <option value="Pending">Pending</option>
            <option value="Positive">Positive</option>
            <option value="Negative">Negative</option>
          </select>
          <button onClick={() => this.props.updateAppt(id, this.state.status)} style={btnStyle}>
            UPDATE
          </button>
        </p>
      </div>
    );
  }
}

const itemStyle = {
  background: "#f4f4f4",
  padding: "10px",
  borderBottom: "1px #ccc dotted",
}

const btnStyle = {
  background: "#ff0000",
  color: "#fff",
  border: "none",
  padding: "5px 9px",
  borderRadius: "10%",
  cursor: "pointer",
  marginLeft: '10px'
};
