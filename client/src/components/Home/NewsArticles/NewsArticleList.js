import React from "react";
import { uid } from "react-uid";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";

import NewsScreen from "./NewsScreen";
import { getNewsArticles } from "../../../actions/news";

import "./../../../App.css";
import "./styles.css";

class NewsArticleList extends React.Component {

    state = {
        newsarticleList: []
    }

    render() {
        return (
            <React.Fragment>
                <Button
                    onClick={() => getNewsArticles(this)}
                    className="news-list__button app__horizontal-center"
                    variant="contained"
                >
                    Get News Articles
                </Button>
                <Table className="news-list">
                    <TableBody>
                        {this.state.newsarticleList.map(newsArticle => (
                            <NewsScreen
                                key={uid(
                                    newsArticle
                                )}
                                newsarticle={newsArticle}
                            />
                        ))}
                    </TableBody>
                </Table>
            </React.Fragment>
        );
    }
}

export default NewsArticleList;
