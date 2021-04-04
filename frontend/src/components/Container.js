import styled, { css } from "styled-components";

const Container = styled.main`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: clamp(2rem, 4rem, 6rem);
  @media only screen and (max-width: ${(props) => props.theme.breakpoints.s}) {
    padding: clamp(0.8rem, 1rem, 2rem);
    align-items: center;
    justify-content: center;
  }
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
