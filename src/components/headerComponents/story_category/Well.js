import React from "react";
import styled from "styled-components";

const MainContainer = styled.div`
  padding: 10px 10px 20px 10px;
  width: 35rem;
  margin: 20px 0;
`;

const CategoryBox = styled.div`
  margin: 30px 0;
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

const Paragraph = styled.p`
  font-family: "Roboto", sans-serif;
  font: 400 1rem roboto;
  margin: 0;
  overflow: hidden;
  z-index: 2;
  border: 1px solid #0000;
  background: #fafaff;

  &:hover {
    overflow: visible;
  }
`;

export default function World({ homeData, newDate }) {
  return (
    <MainContainer id="well" style={{ paddingTop: "30px" }}>
      <Header>
        Wellness <i style={{ color: "#393939" }} className="fas fa-spa"></i>
      </Header>
      {homeData
        .filter((about) => about.section === "well")
        .map((topStories, key) => {
          const { title, abstract, byline, url, multimedia } = topStories;

          return (
            <div key={key}>
              <CategoryBox>
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
              </CategoryBox>
            </div>
          );
        })}
    </MainContainer>
  );
}
