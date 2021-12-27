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
  console.log(homeData);

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

  let allSections = { us: "us", tech: "technology" };

  const usFilter = homeData
    .filter((about) => about.section === allSections.us)
    .map((topStories) => {
      const { title, section, abstract, byline, url } = topStories;
      return (
        <Carousel.Item>
          <CategoryBox>
            <h5>{byline}</h5>
            <h3>{section}</h3>
            <h2>{title}</h2>
            <p>{abstract}</p>
            <a href={url} target="_blank" rel="noopener noreferrer">
              LINK
            </a>
          </CategoryBox>
        </Carousel.Item>
      );
    });

  const techFilter = homeData
    .filter((about) => about.section === allSections.tech)
    .map((topStories) => {
      const { title, section, abstract, byline, url } = topStories;
      return (
        <Carousel.Item>
          <CategoryBox>
            <h5>{byline}</h5>
            <h3>{section}</h3>
            <h2>{title}</h2>
            <p>{abstract}</p>
            <a href={url} target="_blank" rel="noopener noreferrer">
              LINK
            </a>
          </CategoryBox>
        </Carousel.Item>
      );
    });

  return (
    <div>
      {!loading ? (
        <div style={{ width: "90%", margin: "0 auto" }}>
          <Carousel cols={2} rows={1} gap={10} loop showDots dot={MyDot}>
            {usFilter}
          </Carousel>
          <CarouselContainer>
            <Carousel cols={2} rows={1} gap={20} loop showDots dot={MyDot}>
              {techFilter}
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
