import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Carousel from "react-grid-carousel";

const CategoryBox = styled.div`
  margin: 10px;
  border: 3px solid #0003;
`;

const CarouselContainer = styled.div`
  margin: 40px 0;
`;

const Title = styled.h2`
  font-family: "Bungee", cursive;
  font-family: "Roboto", sans-serif;
  color: black;
  margin: 0 0 0 25px;
`;

const Header = styled.h2`
  font-family: "Bungee", cursive;
  font-family: "Roboto", sans-serif;
  text-align: center;
  padding-top: 20px;
`;

const Author = styled.h5`
  font-family: "Bungee", cursive;
  font-family: "Roboto", sans-serif;
  margin: 10px 25px;
`;

const Paragraph = styled.p`
  font-family: "Bungee", cursive;
  font-family: "Poiret One", cursive;
  font-family: "Roboto", sans-serif;
  margin: 0 0 0 25px;
`;

const Image = styled.img`
  object-fit: cover;
  width: 20vw;
  height: 20vw;
`;
const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
export default function HomeCategories() {
  const [homeData, setHomeData] = useState([]);
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    fetchHomeList();
    // eslint-disable-next-line
  }, []);

  const fetchHomeList = async () => {
    const response = await axios
      .get(
        "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=2pAbKOEz8ASuAknW3ktpDO4BUGph89k2"
      )
      .catch((err) => {
        console.log(err);
      });

    setHomeData(response.data.results);
  };

  const MyDot = ({ isActive }) => (
    <span
      style={{
        height: isActive ? "8px" : "5px",
        width: isActive ? "8px" : "5px",
        background: "#6e44ff",
        borderRadius: "50%",
      }}
    ></span>
  );
  function varChange(data) {
    let newData = homeData
      .filter((about) => about.section === data)
      .map((topStories, key) => {
        const { title, abstract, byline, url, multimedia } = topStories;
        return (
          <Carousel.Item key={key}>
            <CategoryBox>
              <div style={{ display: "flex" }}>
                <Image src={multimedia && multimedia[0].url} alt={title} />

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "10px",
                  }}
                >
                  <a
                    style={{ textDecoration: "none" }}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    <Title>{title}</Title>
                  </a>

                  <Author>{byline}</Author>
                  <Paragraph>{abstract}</Paragraph>
                </div>
              </div>
            </CategoryBox>
          </Carousel.Item>
        );
      });

    return newData;
  }
  console.log(homeData);
  return (
    <>
      {!loading ? (
        <div style={{ width: "90%", margin: "0 auto" }}>
          <CarouselContainer>
            <div
              style={{
                boxShadow: " 1px 3px 20px 3px black",
              }}
            >
              <Header>
                Top Stories US <i className="fas fa-newspaper"></i>
              </Header>

              <Carousel cols={2} rows={1} gap={10} loop howDots dot={MyDot}>
                {varChange("us")}
              </Carousel>
            </div>
          </CarouselContainer>
          <CarouselContainer>
            <div
              style={{
                boxShadow: " 1px 3px 20px 3px black",
              }}
            >
              <Header>Technology</Header>

              <Carousel cols={2} rows={1} gap={20} loop showDots dot={MyDot}>
                {varChange("technology")}
              </Carousel>
            </div>
          </CarouselContainer>
          <CarouselContainer>
            <div
              style={{
                boxShadow: " 1px 3px 20px 3px black",
              }}
            >
              <Header>
                World News <i className="fas fa-globe"></i>{" "}
                <i className="fas fa-newspaper"></i>{" "}
              </Header>

              <Carousel cols={2} rows={1} gap={20} loop showDots dot={MyDot}>
                {varChange("world")}
              </Carousel>
            </div>
          </CarouselContainer>
          <CarouselContainer>
            <div
              style={{
                boxShadow: " 1px 3px 20px 3px black",
              }}
            >
              <Header>
                Travel Guide <i className="fas fa-plane"></i>
              </Header>

              <Carousel cols={2} rows={1} gap={20} loop showDots dot={MyDot}>
                {varChange("travel")}
              </Carousel>
            </div>
          </CarouselContainer>
          <CarouselContainer>
            <div
              style={{
                boxShadow: " 1px 3px 20px 3px black",
              }}
            >
              <Header>
                Science <i className="fas fa-atom"></i>
              </Header>

              <Carousel cols={2} rows={1} gap={20} loop showDots dot={MyDot}>
                {varChange("science")}
              </Carousel>
            </div>
          </CarouselContainer>
          <CarouselContainer>
            <div
              style={{
                boxShadow: " 1px 3px 20px 3px black",
              }}
            >
              <Header>
                Arts <i className="fas fa-palette"></i>
              </Header>
            </div>
            <Carousel cols={2} rows={1} gap={20} loop showDots dot={MyDot}>
              {varChange("arts")}
            </Carousel>
          </CarouselContainer>
          <CarouselContainer>
            <div
              style={{
                boxShadow: " 1px 3px 20px 3px black",
              }}
            >
              <Header>Opinion Section</Header>

              <Carousel cols={2} rows={1} gap={20} loop showDots dot={MyDot}>
                {varChange("opinion")}
              </Carousel>
            </div>
          </CarouselContainer>
          <CarouselContainer>
            <div
              style={{
                boxShadow: " 1px 3px 20px 3px black",
              }}
            >
              <Header>Magazine</Header>

              <Carousel cols={2} rows={1} gap={20} loop showDots dot={MyDot}>
                {varChange("magazine")}
              </Carousel>
            </div>
          </CarouselContainer>
          <CarouselContainer>
            <div
              style={{
                boxShadow: " 1px 3px 20px 3px black",
              }}
            >
              <Header>
                Business <i className="fas fa-business-time"></i>
              </Header>

              <Carousel cols={2} rows={1} gap={20} loop showDots dot={MyDot}>
                {varChange("business")}
              </Carousel>
            </div>
          </CarouselContainer>
          <CarouselContainer>
            <div
              style={{
                boxShadow: " 1px 3px 20px 3px black",
              }}
            >
              <Header>
                Wellness <i className="fas fa-spa"></i>
              </Header>

              <Carousel cols={2} rows={1} gap={20} loop showDots dot={MyDot}>
                {varChange("well")}
              </Carousel>
            </div>
          </CarouselContainer>
          <CarouselContainer>
            <div
              style={{
                boxShadow: " 1px 3px 20px 3px black",
              }}
            >
              <Header>
                Sports <i className="fas fa-football-ball"></i>
              </Header>

              <Carousel cols={2} rows={1} gap={20} loop showDots dot={MyDot}>
                {varChange("sports")}
              </Carousel>
            </div>
          </CarouselContainer>
        </div>
      ) : (
        <div className="loader"></div>
      )}
    </>
  );
}
