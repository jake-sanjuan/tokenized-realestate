import React from "react";
import styled from "styled-components";
import Button from "../Button";
import Container from "../Container";

const ListingCard = ({ property }) => {
  const {
    id,
    price,
    address,
    area,
    country,
    beds,
    baths,
    lot,
    bids,
    url,
  } = property;
  return (
    <Card>
      <TopBar>
        <p>{price} ETH</p>
        <p>2 Days Remaining</p>
      </TopBar>
      <Details>
        <Image src="https://source.unsplash.com/featured/?luxury,house" />
        <Info>
          <h3>{address}</h3>
          <Rows>
            <p>{area}</p>
            <p>{country}</p>
          </Rows>
          <Rows>
            <p>{beds} Beds</p>
            <p>{baths} Baths</p>
          </Rows>
          <Rows>
            <p>{lot} Lot Size</p>
            <p className="bold">{bids} Bids</p>
          </Rows>
        </Info>
        <Button secondarySmall to={url}>
          View Property
        </Button>
      </Details>
    </Card>
  );
};

export default ListingCard;

const Card = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 32px;
  min-width: 300px;
  cursor: pointer;
  background-color: ${(props) => props.theme.white};
  transition: all 0.4s ease;
  :hover {
    transform: translateY(-1%);
    filter: drop-shadow(0px 8px 20px #d5dcff);
    /* box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,
      rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
      rgba(0, 0, 0, 0.3) 0px 30px 60px -30px; */
  }
`;

const TopBar = styled.section`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border: 4px solid ${(props) => props.theme.green};
  background-color: ${(props) => props.theme.green};
  p {
    font-weight: 500;
    color: ${(props) => props.theme.white};
    text-transform: uppercase;
    font-size: clamp(0.5rem, 1rem, 1.2rem);
  }
`;

const Image = styled.img`
  width: 320px;
  height: 320px;
  padding: 0;
  margin: 0;
`;

const Details = styled.main`
  width: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border: 4px solid ${(props) => props.theme.green};
  background-color: ${(props) => props.theme.white};
`;

const Info = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  h3 {
    font-size: clamp(1rem, 1.5rem, 2rem);
    margin: 1rem 0;
    font-weight: 600;
  }
`;

const Rows = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  p {
    text-transform: uppercase;
    font-size: clamp(0.8rem, 1rem, 1.2rem);
    margin-bottom: 0.5rem;
    .bold {
      font-weight: 600;
    }
  }
`;
