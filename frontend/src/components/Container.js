import styled, { css } from "styled-components";

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: clamp(1rem, 3rem, 6rem);
  background-color: ${(props) => props.theme.white};
  @media only screen and (max-width: ${(props) => props.theme.breakpoints.s}) {
    padding: clamp(0.8rem, 1rem, 2rem);
    align-items: center;
    justify-content: center;
  }
  @media (max-width: 768px) {
    overflow-x: hidden;
  }
  ${(props) =>
    props.black &&
    css`
      background-color: ${(props) => props.theme.black};
      color: ${(props) => props.theme.white};
    `}
  ${(props) =>
    props.green &&
    css`
      background-color: ${(props) => props.theme.green};
      color: ${(props) => props.theme.white};
    `}
`;

export default Container;
