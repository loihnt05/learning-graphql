import react, { Component } from "react";
import { graphql } from "react-apollo";

class BookDetails extends Component {
  render() {
    retrun(<div id="book-details">
        <h1>Book Details</h1>
    </div>);
  }
}

export default graphql(getBookQuery)(BookDetails);