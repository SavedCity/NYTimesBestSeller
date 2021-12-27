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
              <h2>{title}</h2>
              <h5>{byline}</h5>
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
    <>
      {!loading ? (
        <div style={{ width: "90%", margin: "0 auto" }}>
          <CarouselContainer>
            <h2>Top Stories US</h2>
            <Carousel cols={2} rows={1} gap={10} loop showDots dot={MyDot}>
              {varChange("us")}
            </Carousel>
          </CarouselContainer>
          <CarouselContainer>
            <h2>Technology</h2>
            <Carousel cols={2} rows={1} gap={20} loop showDots dot={MyDot}>
              {varChange("technology")}
            </Carousel>
          </CarouselContainer>
          <CarouselContainer>
            <h2>
              World News <i class="fas fa-globe"></i>
            </h2>
            <Carousel cols={2} rows={1} gap={20} loop showDots dot={MyDot}>
              {varChange("world")}
            </Carousel>
          </CarouselContainer>
          <CarouselContainer>
            <h2>
              Travel Guide <i class="fas fa-plane"></i>
            </h2>

            <Carousel cols={2} rows={1} gap={20} loop showDots dot={MyDot}>
              {varChange("travel")}
            </Carousel>
          </CarouselContainer>
          <CarouselContainer>
            <h2>Science</h2>
            <Carousel cols={2} rows={1} gap={20} loop showDots dot={MyDot}>
              {varChange("science")}
            </Carousel>
          </CarouselContainer>
          <CarouselContainer>
            <h2>Arts</h2>
            <Carousel cols={2} rows={1} gap={20} loop showDots dot={MyDot}>
              {varChange("arts")}
            </Carousel>
          </CarouselContainer>
          <CarouselContainer>
            <h2>Opinion Section</h2>
            <Carousel cols={2} rows={1} gap={20} loop showDots dot={MyDot}>
              {varChange("opinion")}
            </Carousel>
          </CarouselContainer>
          <CarouselContainer>
            <h2>Magazine</h2>
            <Carousel cols={2} rows={1} gap={20} loop showDots dot={MyDot}>
              {varChange("magazine")}
            </Carousel>
          </CarouselContainer>
          <CarouselContainer>
            <h2>Business</h2>
            <Carousel cols={2} rows={1} gap={20} loop showDots dot={MyDot}>
              {varChange("business")}
            </Carousel>
          </CarouselContainer>
          <CarouselContainer>
            <h2>Wellness</h2>
            <Carousel cols={2} rows={1} gap={20} loop showDots dot={MyDot}>
              {varChange("well")}
            </Carousel>
          </CarouselContainer>
          <CarouselContainer>
            <h2>Sports</h2>
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
    </>
  );
}
