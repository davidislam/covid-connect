import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpnsionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class Centre extends Component {
  state = {}
  render() {
    const { centre } = this.props;
    return (
      <ExpansionPanel>
        <ExpnsionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <h2>{centre.name}</h2>
        </ExpnsionPanelSummary>
        <ExpansionPanelDetails>
          <h4>{centre.location}</h4>
          <h4>{centre.number}</h4>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default Centre;