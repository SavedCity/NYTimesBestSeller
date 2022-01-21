import React from "react";
import styled from "styled-components";

const MainContainer = styled.div`
  padding: 10px 10px 20px 10px;
  display: flex;
  flex-wrap: wrap;
`;

const CategoryBox = styled.div`
  margin: 30px;
  display: flex;
  flex: 1;
  flex-basis: 30%;
  max-width: 50%;
`;

const DetailsBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 25px 20px 25px;
  border-radius: 3px;
  background: #fafaff;
  max-height: 12.5rem;
  min-height: 12.5rem;
  position: relative;
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
  width: 15rem;
  height: 15rem;
`;

const CreatedDate = styled.p`
  font-family: "Roboto", sans-serif;
  font: 400 0.88rem roboto;
  position: absolute;
  top: 0;
  left: 25px;
  color: #444;
`;

const Title = styled.a`
  text-decoration: none;
  font-family: "Roboto", sans-serif;
  color: black;
  font: 500 1.04rem Roboto;
  letter-spacing: 0.5px;
  margin-top: 17px;
`;

const Author = styled.h5`
  font-family: "Roboto", sans-serif;
  font: 400 0.88rem Roboto;
  margin: 7px 0 20px 0;
  color: #555;
`;

const ParagraphBox = styled.div``;

const Paragraph = styled.p`
  font-family: "Roboto", sans-serif;
  font: 400 1rem roboto;
  margin: 0;
  border: 1px solid #0000;
  transition: 0.3s;
  overflow: hidden;
  height: 60px;
  position: relative;

  /* &:hover {
    border: 1px solid #444;
    padding: 10px;
    background: #fafaff;
    width: 115%;
    margin-right: 30px;
    height: 100%;
    z-index: 1;
  } */
`;

export default function World({ homeData, newDate }) {
  return (
    <div
      id="world"
      style={{ paddingTop: "30px", width: "90%", margin: "0 auto" }}
    >
      {" "}
      <Header>
        World Stories{" "}
        <i style={{ color: "#393939" }} className="fas fa-globe"></i>
      </Header>
      <MainContainer>
        {homeData
          .filter((about) => about.section === "world")
          .map((topStories, key) => {
            const { title, abstract, byline, url, multimedia } = topStories;

            return (
              <CategoryBox key={key}>
                <Image
                  src={
                    multimedia ? multimedia[0].url : "./images/newspaper.png"
                  }
                  alt={title}
                />
                <DetailsBox>
                  <Title href={url} target="_blank" rel="noopener noreferrer">
                    {title}
                  </Title>
                  <Author>{byline}</Author>
                  <ParagraphBox>
                    <Paragraph>{abstract}</Paragraph>
                  </ParagraphBox>
                  <CreatedDate>{newDate}</CreatedDate>
                </DetailsBox>
              </CategoryBox>
            );
          })}
      </MainContainer>
    </div>
  );
}
