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
          {centre.name}
        </ExpnsionPanelSummary>
        <ExpansionPanelDetails>
          <div>{centre.location.city}</div>
          <div>{centre.number}</div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default Centre;