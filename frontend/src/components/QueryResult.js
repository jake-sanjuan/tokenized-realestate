import React from "react";

const QueryResult = ({ loading, error, data, children }) => {
  if (error) {
    return <p>Sorry, there was an error. The error is: {error.message}</p>;
  }
  if (loading) {
    return (
      <iframe
        src="https://my.spline.design/untitled-19dba538b6290cae2bc6ecb011c01e05/"
        frameBorder="0"
        width="100%"
        height="100%"
        title="Bridges-Loading-Logo"
      ></iframe>
    );
  }

  if (!data) {
    return <p>Sorry, there is currently none.</p>;
  }

  if (data) {
    return children;
  }
};

export default QueryResult;
