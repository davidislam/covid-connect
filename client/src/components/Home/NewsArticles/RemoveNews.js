import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import CustomizedSnackbar from './../../CustomizedSnackbar';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from '@material-ui/core/InputLabel';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { removeNewsById, getNewsArticles } from './../../../actions/news';
import { handleChange, toggle } from './../../../utils';


class RemoveNews extends Component {
  state = {
    cid: '',
    newsarticles: [],
    snackbarOpen: false,
    snackbarMessage: '',
    snackbarSeverity: ''
  }

  // componentDidMount() {
  //   getCentres(this);
  // }

  deleteNews = () => {
    const { nid } = this.state
    if (nid !== '') {
      removeNewsById(this, nid);
    } else {
      const msg = 'Please select a news article to remove';
      this.setState({ snackbarOpen: true, snackbarMessage: msg, snackbarSeverity: 'warning' });
    }
  }

  render() {
    const { nid, newsarticles, snackbarOpen, snackbarMessage, snackbarSeverity } = this.state;
    return (
      <React.Fragment>
        <h2>Delete a News Article</h2>
        <FormControl required>
          <InputLabel>Name</InputLabel>
          <Select onOpen={() => getNewsArticles(this)} value={nid} name="nid" onChange={(e) => handleChange(this, e)} style={{ width: '50ch' }}>
            {newsarticles.map(newsarticle =>
              <MenuItem key={newsarticle._id} value={newsarticle._id}>{newsarticle.heading}</MenuItem>)}
          </Select>
        </FormControl>
        <div>
          <Button color='secondary' variant="contained"
            onClick={this.deleteNews} style={{ marginTop: '30px' }}>
            Delete Selected News Article
          </Button>
        </div>
        <CustomizedSnackbar
          message={snackbarMessage}
          severity={snackbarSeverity}
          open={snackbarOpen}
          toggleSnackbar={() => toggle(this, 'snackbarOpen')}
        />
      </React.Fragment>
    );
  }
}

export default RemoveNews;