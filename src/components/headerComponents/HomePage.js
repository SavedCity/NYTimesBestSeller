import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Carousel from "react-grid-carousel";

const NYTimesImg = styled.img`
  /* margin-bottom: 30px; */
`;

const CarouselContainer = styled.div`
  margin: 16px 0 40px 0;
  padding: 20px 10px;
  border: 1px solid #0004;
`;

const CategoryBox = styled.div`
  margin: 10px;
`;

const TopStories = styled.h2`
  font: 400 2.5rem Barlow;
  text-align: center;
  margin: 0;
`;

const Header = styled.h2`
  font: 400 2rem Roboto;
  text-align: center;
  padding-top: 20px;
  letter-spacing: 1px;
`;

const Title = styled.a`
  text-decoration: none;
  font-family: "Roboto", sans-serif;
  color: black;
  font: 500 1.5rem Roboto;
  letter-spacing: 0.5px;
`;

const Author = styled.h5`
  font-family: "Roboto", sans-serif;
  font: 400 1rem Roboto;
  margin: 10px 0 30px 0;
  color: #555;
`;

const Paragraph = styled.p`
  font-family: "Roboto", sans-serif;
  font: 400 1.3rem roboto;
`;

const CreatedDate = styled.p`
  font-family: "Roboto", sans-serif;
  font: 400 1.3rem roboto;
`;

const Image = styled.img`
  object-fit: cover;
  width: 22vw;
  height: 22vw;
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
        height: isActive ? "12px" : "8px",
        width: isActive ? "12px" : "8px",
        background: isActive ? "#0009" : "#39393977",
        borderRadius: "50%",
        marginTop: "10px",
      }}
    ></span>
  );
  console.log(homeData);

  let abbMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  function section(data) {
    let newData = homeData
      .filter((about) => about.section === data)
      .map((topStories, key) => {
        const { title, abstract, byline, url, multimedia, created_date } =
          topStories;

        let modifiedDate = created_date.split("T")[0];
        let newDate =
          modifiedDate.split("-").slice(2).join("-") +
          "-" +
          modifiedDate.split("-")[0];
        console.log(newDate);

        return (
          <Carousel.Item key={key}>
            <CategoryBox>
              <div style={{ display: "flex" }}>
                <Image src={multimedia && multimedia[0].url} alt={title} />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "20px 17px 20px 25px",
                    borderRadius: "3px",
                    background: "#00000009",
                  }}
                >
                  <Title href={url} target="_blank" rel="noopener noreferrer">
                    {title}
                  </Title>
                  <Author>{byline}</Author>
                  <Paragraph>{abstract}</Paragraph>
                  <CreatedDate>{newDate}</CreatedDate>
                </div>
              </div>
            </CategoryBox>
          </Carousel.Item>
        );
      });
    return newData;
  }
  return (
    <>
      {!loading ? (
        <div style={{ width: "96%", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "50px 0 70px 0",
            }}
          >
            <NYTimesImg
              src="../images/nytimes.png"
              alt="New York Times Title"
            />
          </div>

          <TopStories>
            Top Stories Today U.S.{" "}
            <i
              style={{ marginLeft: ".3em", fontSize: "2.5rem" }}
              className="fas fa-newspaper"
            ></i>
          </TopStories>
          <CarouselContainer>
            <Carousel cols={2} rows={1} gap={10} loop showDots dot={MyDot}>
              {section("us")}
            </Carousel>
          </CarouselContainer>

          <CarouselContainer>
            <div
              style={{
                boxShadow: " 1px 3px 20px 3px black",
              }}
            >
              <Header>Technology</Header>
              <Carousel cols={2} rows={1} gap={20} loop showDots dot={MyDot}>
                {section("technology")}
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
                {section("world")}
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
                {section("travel")}
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
                {section("science")}
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
              {section("arts")}
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
                {section("opinion")}
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
                {section("magazine")}
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
                {section("business")}
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
                {section("well")}
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
                {section("sports")}
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
