import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Carousel from "react-grid-carousel";
import World from "./story_category/World";
import Well from "./story_category/Well";
import Tech from "./story_category/Tech";
import Science from "./story_category/Science";
import Opinion from "./story_category/Opinion";
import Travel from "./story_category/Travel";
import Art from "./story_category/Art";
import Sports from "./story_category/Sports";
import Business from "./story_category/Business";
import NYRegion from "./story_category/NYRegion";
import Style from "./story_category/Style";

const BackToTop = styled.a`
  width: 50px;
  height: 50px;
  position: fixed;
  right: -40px;
  visibility: hidden;
  opacity: 0;
  bottom: 30px;
  text-decoration: none;
  font: 300 2rem barlow;
  background-color: #0002;
  border-radius: 50%;
  transition: 0.3s;

  &:hover {
    background-color: #0003;
  }

  &:before {
    content: "";
    height: 15px;
    border: solid #555;
    border-width: 2px;
    position: absolute;
    top: 18px;
    left: 23px;
  }

  &:after {
    content: "";
    width: 12px;
    height: 12px;
    border-right: solid #555;
    border-top: solid #555;
    border-width: 4px;
    position: absolute;
    top: 16px;
    left: 17px;
    transform: rotate(-45deg);
  }
`;

const LinksBox = styled.div`
  background: #393939;
  display: flex;
  justify-content: center;
  margin: 0 auto 50px auto;
  width: 65.5%;
  padding: 10px 0;
`;

const Link = styled.a`
  color: #ddd;
  font: 400 1.2rem roboto;
  text-decoration: none;
  margin: 5px 13px;
  transition: 0.3s;

  &:hover {
    color: #fff;
  }
`;

const CarouselContainer = styled.div`
  margin: 0px auto 40px auto;
  padding: 10px 10px 20px 10px;
`;

const CategoryBox = styled.div`
  display: flex;
  margin: 20px;
`;

const DetailsBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 25px 20px 25px;
  background: #f0000009;
  max-height: 27.5rem;
  min-height: 27.5rem;
  position: relative;
`;

const TopStories = styled.h2`
  font: 400 2.5rem Barlow;
  text-align: center;
  margin: 0 0 4px 0;
`;

const Image = styled.img`
  object-fit: cover;
  width: 30rem;
  height: 30rem;
`;

const CreatedDate = styled.p`
  font: 400 1.1rem roboto;
  position: absolute;
  top: 0;
  left: 25px;
  color: #444;
`;

const Title = styled.a`
  text-decoration: none;
  color: black;
  font: 500 1.5rem Roboto;
  letter-spacing: 0.5px;
  margin-top: 50px;
`;

const Author = styled.h5`
  font: 400 1rem Roboto;
  margin: 15px 0 30px 0;
  color: #555;
`;

const Paragraph = styled.p`
  font: 400 1.3rem roboto;
`;

const SubSection = styled.h5`
  font: 400 1.1rem roboto;
  position: absolute;
  bottom: 0;
  left: 25px;
  color: #744;
`;

export default function HomeCategories() {
  const [homeData, setHomeData] = useState([]);

  const [loading, setLoading] = useState(true);

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
    setLoading(false);
  };

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
  let newDate;
  function section(data) {
    let newData = homeData
      .filter((about) => about.section === data)
      .map((topStories, key) => {
        const {
          title,
          abstract,
          byline,
          url,
          multimedia,
          created_date,
          subsection,
        } = topStories;

        let modifiedDate = created_date.split("T")[0];
        let newMonth = parseInt(modifiedDate.split("-")[1]);
        newDate =
          abbMonths[newMonth - 1] +
          " " +
          modifiedDate.split("-").slice(2).join("-") +
          ", " +
          modifiedDate.split("-")[0];

        return (
          <Carousel.Item key={key}>
            <CategoryBox>
              <Image src={multimedia && multimedia[0].url} alt={title} />
              <DetailsBox>
                <Title href={url} target="_blank" rel="noopener noreferrer">
                  {title}
                </Title>
                <Author>{byline}</Author>
                <Paragraph>{abstract}</Paragraph>
                <CreatedDate>{newDate}</CreatedDate>
                <SubSection>
                  {subsection !== "" &&
                    "- " +
                      subsection.charAt("0").toUpperCase() +
                      subsection.slice(1)}
                </SubSection>
              </DetailsBox>
            </CategoryBox>
          </Carousel.Item>
        );
      });
    return newData;
  }

  const myDotMain = ({ isActive }) => (
    <div
      className="carousel-dot"
      style={{
        height: isActive ? "13px" : "10px",
        width: isActive ? "13px" : "10px",
        background: isActive ? "#0009" : "#39393977",
        borderRadius: "100%",
      }}
    ></div>
  );

  const myDot = ({ isActive }) => (
    <div
      className="carousel-dot"
      style={{
        height: isActive ? "10px" : "7px",
        width: isActive ? "10px" : "7px",
        background: isActive ? "#0009" : "#39393977",
        borderRadius: "100%",
        marginTop: "20px",
      }}
    ></div>
  );

  const pauseAnimation = () => {
    let bar = document.getElementById("progress-bar");
    bar.classList.add("pause");
    bar.style.animation = "none";
  };

  const resetAnimation = () => {
    let bar = document.getElementById("progress-bar");
    bar.classList.remove("pause");

    setTimeout(function () {
      bar.style.animation = "";
    }, 1);
  };

  window.onscroll = () => {
    let topBtn = document.querySelector(".back-to-top");
    let linkBox = document.querySelector("link-box");

    if (window.pageYOffset > 900 && topBtn !== null) {
      topBtn.classList.add("show");
      console.log("works");
    } else {
      if (topBtn !== null) {
        topBtn.classList.remove("show");
      }
    }

    // if (window.pageYOffset > linkBox.offsetTop) {
    //   linkBox.classList.add("sticky-links");
    // } else {
    //   linkBox.classList.remove("sticky-links");
    // }
  };

  let worldData = homeData.filter((about) => about.section === "world").length;
  let wellData = homeData.filter((about) => about.section === "well").length;
  let opinionData = homeData.filter(
    (about) => about.section === "opinion"
  ).length;
  let scienceData = homeData.filter(
    (about) => about.section === "science"
  ).length;
  let techData = homeData.filter(
    (about) => about.section === "technology"
  ).length;
  let travelData = homeData.filter(
    (about) => about.section === "travel"
  ).length;
  let artData = homeData.filter((about) => about.section === "arts").length;
  let sportsData = homeData.filter(
    (about) => about.section === "sports"
  ).length;
  let businessData = homeData.filter(
    (about) => about.section === "business"
  ).length;
  let nyData = homeData.filter((about) => about.section === "nyregion").length;
  let styleData = homeData.filter((about) => about.section === "style").length;

  return (
    <>
      <div style={{ width: "96%", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "50px 0 70px 0",
          }}
        >
          <img src="../images/nytimes.png" alt="New York Times Title" />
        </div>
        {!loading ? (
          <div style={{ position: "relative" }}>
            <LinksBox className="link-box">
              {worldData > 0 && <Link href="#world">World</Link>}
              {wellData > 0 && <Link href="#well">Wellness</Link>}
              {techData > 0 && <Link href="#tech">Technology</Link>}
              {travelData > 0 && <Link href="#travel">Travel</Link>}
              {nyData > 0 && <Link href="#ny">NY Region</Link>}
              {opinionData > 0 && <Link href="#opinion">Opinion</Link>}
              {sportsData > 0 && <Link href="#sports">Sports</Link>}
              {businessData > 0 && <Link href="#business">Business</Link>}
              {scienceData > 0 && <Link href="#science">Science</Link>}
              {artData > 0 && <Link href="#arts">Arts</Link>}
              {styleData > 0 && <Link href="#style">Style</Link>}
            </LinksBox>
            {/* TOP STORIES IN TODAY */}
            <TopStories>
              Top Stories{" "}
              <span style={{ color: "#8d0208", fontWeight: "500" }}>Today</span>{" "}
              <i
                style={{
                  marginLeft: ".3em",
                  fontSize: "2.5rem",
                  color: "#393939",
                }}
                className="fas fa-newspaper"
              ></i>
            </TopStories>

            <CarouselContainer
              onMouseLeave={resetAnimation}
              onMouseEnter={pauseAnimation}
              id="carousel-container"
              style={{
                width: "70%",
                position: "relative",
                padding: "0",
              }}
            >
              <Carousel
                responsiveLayout={[
                  {
                    breakpoint: 1500,
                    cols: 1,
                  },
                ]}
                cols={1}
                rows={1}
                gap={10}
                loop
                showDots
                dot={myDotMain}
                autoplay={7000}
                arrowLeft={<span />}
                arrowRight={<span />}
              >
                {section("us")}
              </Carousel>
            </CarouselContainer>
            <div
              style={{
                position: "relative",
              }}
            >
              <div className="progress">
                <div id="progress-bar" className="progress-value"></div>
              </div>
            </div>

            {/* STORIES IN THE WORLD */}
            <div>
              {worldData > 0 && (
                <World
                  homeData={homeData}
                  abbMonths={abbMonths}
                  newDate={newDate}
                />
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "45%",
                    alignItems: "center",
                  }}
                >
                  {wellData > 0 && (
                    <Well
                      homeData={homeData}
                      abbMonths={abbMonths}
                      newDate={newDate}
                    />
                  )}
                  {sportsData > 0 && (
                    <Sports
                      myDot={myDot}
                      homeData={homeData}
                      abbMonths={abbMonths}
                      newDate={newDate}
                      sportsData={sportsData}
                    />
                  )}
                  {businessData > 0 && (
                    <Business
                      myDot={myDot}
                      homeData={homeData}
                      abbMonths={abbMonths}
                      newDate={newDate}
                      businessData={businessData}
                    />
                  )}
                  {scienceData > 0 && (
                    <Science
                      myDot={myDot}
                      homeData={homeData}
                      abbMonths={abbMonths}
                      newDate={newDate}
                      scienceData={scienceData}
                    />
                  )}
                  {artData > 0 && (
                    <Art
                      myDot={myDot}
                      homeData={homeData}
                      abbMonths={abbMonths}
                      newDate={newDate}
                      artData={artData}
                    />
                  )}
                  {styleData > 0 && (
                    <Style
                      myDot={myDot}
                      homeData={homeData}
                      abbMonths={abbMonths}
                      newDate={newDate}
                      styleData={styleData}
                    />
                  )}
                </div>
                <div
                  style={{
                    width: "45%",
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  {techData > 0 && (
                    <Tech
                      myDot={myDot}
                      homeData={homeData}
                      abbMonths={abbMonths}
                      newDate={newDate}
                      techData={techData}
                    />
                  )}
                  {travelData > 0 && (
                    <Travel
                      myDot={myDot}
                      homeData={homeData}
                      abbMonths={abbMonths}
                      newDate={newDate}
                      travelData={travelData}
                    />
                  )}
                  {nyData > 0 && (
                    <NYRegion
                      myDot={myDot}
                      homeData={homeData}
                      abbMonths={abbMonths}
                      newDate={newDate}
                      nyData={nyData}
                    />
                  )}
                  <Opinion
                    myDot={myDot}
                    homeData={homeData}
                    abbMonths={abbMonths}
                    newDate={newDate}
                    opinionData={opinionData}
                  />
                </div>
              </div>
            </div>
            <BackToTop className="back-to-top" href="#top"></BackToTop>
          </div>
        ) : (
          <div className="loader"></div>
        )}
      </div>
    </>
  );
}
