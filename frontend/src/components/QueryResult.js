import React from "react";
import styled from "styled-components";

const QueryResult = ({ loading, error, data, children }) => {
  if (error) {
    return <p>Sorry, there was an error. The error is: {error.message}</p>;
  }
  if (loading) {
    return (
      <Loading
        src="https://my.spline.design/logo3d-645e87637a388689f1346d71300a50b3/"
        title="Bridges-Loading-Logo"
      ></Loading>
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

const Loading = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
`;
