import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import "./styles.css";

class NewsArticleTable extends React.Component {
  render() {
    const { newsarticle } = this.props;
    const { link, image, heading } = newsarticle;

    return (
      <TableRow className="newArtRow">
        <TableCell component="th" scope="row">
          {link}
        </TableCell>

        <TableCell component="th" scope="row">
          {image}
        </TableCell>

        <TableCell component="th" scope="row">
          {heading}
        </TableCell>
      </TableRow>
    );
  }
}

export default Student;
