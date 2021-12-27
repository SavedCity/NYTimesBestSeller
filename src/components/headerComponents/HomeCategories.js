import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Carousel from "react-grid-carousel";

const CategoryBox = styled.div`
  margin: 10px;
  border: 1px solid #0003;
  padding: 20px;
`;

const CarouselContainer = styled.div`
  margin: 50px 0;
`;

const Section = styled.h3``;

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
      .map((topStories) => {
        const { title, section, abstract, byline, url } = topStories;
        return (
          <Carousel.Item>
            <CategoryBox>
              <h5>{byline}</h5>
              <Section>{section}</Section>
              <h2>{title}</h2>
              <p>{abstract}</p>
              <a href={url} target="_blank" rel="noopener noreferrer">
                LINK
              </a>
            </CategoryBox>
          </Carousel.Item>
        );
      });
    return newData;
  }

  return (
    <div>
      {!loading ? (
        <div style={{ width: "90%", margin: "0 auto" }}>
          <CarouselContainer>
            <h2>Top Stories US</h2>
            <Carousel cols={2} rows={1} gap={10} loop showDots dot={MyDot}>
              {varChange("us")}
            </Carousel>
          </CarouselContainer>
          <CarouselContainer>
            <Carousel cols={2} rows={1} gap={20} loop showDots dot={MyDot}>
              {varChange("technology")}
            </Carousel>
          </CarouselContainer>
          <CarouselContainer>
            <Carousel cols={2} rows={1} gap={20} loop showDots dot={MyDot}>
              {varChange("world")}
            </Carousel>
          </CarouselContainer>
          <CarouselContainer>
            <Carousel cols={2} rows={1} gap={20} loop showDots dot={MyDot}>
              {varChange("travel")}
            </Carousel>
          </CarouselContainer>
          <CarouselContainer>
            <Carousel cols={2} rows={1} gap={20} loop showDots dot={MyDot}>
              {varChange("science")}
            </Carousel>
          </CarouselContainer>
          <CarouselContainer>
            <Carousel cols={2} rows={1} gap={20} loop showDots dot={MyDot}>
              {varChange("arts")}
            </Carousel>
          </CarouselContainer>
          <CarouselContainer>
            <Carousel cols={2} rows={1} gap={20} loop showDots dot={MyDot}>
              {varChange("opinion")}
            </Carousel>
          </CarouselContainer>
          <CarouselContainer>
            <Carousel cols={2} rows={1} gap={20} loop showDots dot={MyDot}>
              {varChange("magazine")}
            </Carousel>
          </CarouselContainer>
          <CarouselContainer>
            <Carousel cols={2} rows={1} gap={20} loop showDots dot={MyDot}>
              {varChange("business")}
            </Carousel>
          </CarouselContainer>
          <CarouselContainer>
            <Carousel cols={2} rows={1} gap={20} loop showDots dot={MyDot}>
              {varChange("well")}
            </Carousel>
          </CarouselContainer>
          <CarouselContainer>
            <Carousel cols={2} rows={1} gap={20} loop showDots dot={MyDot}>
              {varChange("sports")}
            </Carousel>
          </CarouselContainer>
        </div>
      ) : (
        <div className="loader-div">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
}
