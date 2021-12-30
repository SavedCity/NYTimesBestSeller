import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Carousel from "react-grid-carousel";

const CategoryBox = styled.div`
  margin: 10px;
  border: 3px solid #0003;
  padding: 20px;
  height: 350px;
  margin-bottom: 120px;
  box-shadow: 1px 3px 20px 10px black;
`;

const CarouselContainer = styled.div`
  margin: 40px 0;
`;

const Title = styled.h2`
  font-family: "Bungee", cursive;
  font-family: "Roboto", sans-serif;
  margin: 0 0 0 55px;
  color: #000;
`;

const Header = styled.h2`
  font-family: "Bungee", cursive;
  font-family: "Roboto", sans-serif;
`;

const Author = styled.h5`
  font-family: "Bungee", cursive;
  font-family: "Roboto", sans-serif;
`;

const Paragraph = styled.p`
  font-family: "Bungee", cursive;
  font-family: "Poiret One", cursive;
  font-family: "Roboto", sans-serif;
`;

export default function HomeCategories() {
  const [homeData, setHomeData] = useState([]);
  const loading = useSelector((state) => state.loading);

  const Image = styled.img`
    width: 150px;
    height: 150px;
  `;

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
      .map((topStories) => {
        const { title, abstract, byline, url } = topStories;
        return (
          <Carousel.Item>
            <CategoryBox>
              <div style={{ display: "flex" }}>
                <Image src="news-1172463__340.jpeg" />
                <a
                  style={{ textDecoration: "none" }}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Title>{title}</Title>
                </a>
              </div>
              <Author>{byline}</Author>
              <Paragraph>{abstract}</Paragraph>
            </CategoryBox>
          </Carousel.Item>
        );
      });
    return newData;
  }

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
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Header>
                  Top Stories US <i class="fas fa-newspaper"></i>
                </Header>
              </div>

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
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Header>Technology</Header>
              </div>
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Header>
                  World News <i class="fas fa-globe"></i>{" "}
                  <i class="fas fa-newspaper"></i>{" "}
                </Header>
              </div>
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Header>
                  Travel Guide <i class="fas fa-plane"></i>
                </Header>
              </div>

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
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Header>
                  Science <i class="fas fa-atom"></i>
                </Header>
              </div>
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Header>
                  Arts <i class="fas fa-palette"></i>
                </Header>
              </div>
              <Carousel cols={2} rows={1} gap={20} loop showDots dot={MyDot}>
                {varChange("arts")}
              </Carousel>
            </div>
          </CarouselContainer>
          <CarouselContainer>
            <div
              style={{
                boxShadow: " 1px 3px 20px 3px black",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Header>Opinion Section</Header>
              </div>
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Header>Magazine</Header>
              </div>
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Header>
                  Business <i class="fas fa-business-time"></i>
                </Header>
              </div>
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Header>
                  Wellness <i class="fas fa-spa"></i>
                </Header>
              </div>
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Header>
                  Sports <i class="fas fa-football-ball"></i>
                </Header>
              </div>
              <Carousel cols={2} rows={1} gap={20} loop showDots dot={MyDot}>
                {varChange("sports")}
              </Carousel>
            </div>
          </CarouselContainer>
        </div>
      ) : (
        <div className="loader-div">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
}
