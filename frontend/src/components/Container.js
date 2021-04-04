import styled, { css } from "styled-components";

const Container = styled.main`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 2rem;
  ${(props) =>
    props.black &&
    css`
      background-color: ${(props) => props.theme.black};
    `}
  ${(props) =>
    props.green &&
    css`
      background-color: ${(props) => props.theme.green};
    `}
  ${(props) =>
    props.white &&
    css`
      background-color: ${(props) => props.theme.white};
    `}
`;

export default Container;
