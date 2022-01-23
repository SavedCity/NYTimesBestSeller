import React from "react";
import styled from "styled-components";
import Carousel from "react-grid-carousel";

const CarouselContainer = styled.div`
  padding: 0px 10px;
  width: 100%;
  margin: 0;
`;

const ArrowBtnLeft = styled.span`
  background: #fff;
  font-size: 1.7rem;
  border-radius: 100%;
  padding: 5px 12.5px 3px 11.5px;
  color: #282828;
  cursor: pointer;
  transition: 0.3s;
  position: absolute;
  z-index: 3;
  top: 46%;
  left: -15px;
  border: 1px solid #0007;

  &:hover {
    border: 1px solid #000;
  }
`;

const ArrowBtnRight = styled.span`
  background: #fff;
  font-size: 1.7rem;
  border-radius: 100%;
  padding: 5px 11.5px 3px 12.5px;
  color: #282828;
  cursor: pointer;
  transition: 0.3s;
  position: absolute;
  z-index: 3;
  top: 46%;
  right: -15px;
  border: 1px solid #0007;

  &:hover {
    border: 1px solid #000;
  }
`;

const DetailsBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 25px 20px 25px;
  background: #e2ece949;
  position: relative;
  min-height: 15.5rem;
  max-height: 15.5rem;
`;

const Header = styled.h2`
  font: 400 2rem Roboto;
  text-align: center;
  padding-top: 20px;
  letter-spacing: 1px;
  padding: 0 0 10px 0;
  border-bottom: 1px solid #999;
`;

const Image = styled.img`
  object-fit: cover;
  width: 18rem;
  height: 18rem;
`;

const CreatedDate = styled.p`
  font: 400 0.88rem roboto;
  position: absolute;
  top: 0;
  left: 25px;
  color: #444;
`;

const Title = styled.a`
  text-decoration: none;
  color: black;
  font: 500 1.2rem Roboto;
  letter-spacing: 0.5px;
  margin-top: 17px;
`;

const Author = styled.h5`
  font: 400 0.9rem Roboto;
  margin: 7px 0 20px 0;
  color: #555;
`;

const Paragraph = styled.p`
  font: 400 1.12rem roboto;
  margin: 0;
`;

export default function Style({ myDot, homeData, newDate, styleData }) {
  //   styleData = 2;
  return (
    <CarouselContainer id="style" style={{ paddingTop: "90px" }}>
      <Header>
        Style <i style={{ color: "#393939" }} className="fas fa-tshirt"></i>
      </Header>
      <Carousel
        cols={1}
        rows={styleData % 2 === 0 ? 2 : 1}
        gap={20}
        loop
        showDots={styleData > 2 ? true : false}
        dot={myDot}
        arrowLeft={
          styleData > 2 ? (
            <ArrowBtnLeft type="left">
              <i className="fas fa-chevron-left"></i>
            </ArrowBtnLeft>
          ) : (
            <span></span>
          )
        }
        arrowRight={
          styleData > 2 ? (
            <ArrowBtnRight type="right">
              <i className="fas fa-chevron-right"></i>
            </ArrowBtnRight>
          ) : (
            <span></span>
          )
        }
      >
        {homeData
          .filter((about) => about.section === "style")
          .map((topStories, key) => {
            const { title, abstract, byline, url, multimedia } = topStories;
            return (
              <Carousel.Item key={key}>
                <div style={{ display: "flex" }}>
                  <Image src={multimedia && multimedia[0].url} alt={title} />
                  <DetailsBox>
                    <Title href={url} target="_blank" rel="noopener noreferrer">
                      {title}
                    </Title>
                    <Author>{byline}</Author>
                    <Paragraph>{abstract}</Paragraph>
                    <CreatedDate>{newDate}</CreatedDate>
                  </DetailsBox>
                </div>
              </Carousel.Item>
            );
          })}
      </Carousel>
    </CarouselContainer>
  );
}
