import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBookQuery } from "../queries/queries";

class BookDetails extends Component {
  displayBookDetails() {
    const { data } = this.props;
    
    console.log("BookDetails data:", data);
    
    if (data.loading) {
      return <div>Loading book details...</div>;
    }
    
    if (data.error) {
      console.error("GraphQL Error:", data.error);
      return <div>Error loading book details: {data.error.message}</div>;
    }
    
    const { book } = data;
    console.log("Book data:", book);
    
    if (book) {
      return (
        <div>
          <h2>{book.name}</h2>
          <p><strong>Genre:</strong> {book.genre}</p>
          {book.author ? (
            <>
              <p><strong>Author:</strong> {book.author.name}</p>
              <p>All books by this author:</p>
              <ul className="other-books">
                {book.author.books && book.author.books.length > 0 ? (
                  book.author.books.map(item => (
                    <li key={item.id}>{item.name}</li>
                  ))
                ) : (
                  <li>No other books found</li>
                )}
              </ul>
            </>
          ) : (
            <p><strong>Author:</strong> Author information not available</p>
          )}
        </div>
      );
    } else {
      return <div>No book selected...</div>;
    }
  }

  render() {
    console.log("BookDetails props:", this.props);
    return (
      <div id="book-details">
        {this.displayBookDetails()}
      </div>
    );
  }
}

export default graphql(getBookQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.bookId,
      },
      skip: !props.bookId, // Skip query if no bookId is provided
    };
  }
})(BookDetails);