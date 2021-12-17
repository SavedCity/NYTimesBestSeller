import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "../redux/actions/actions";

const CategoryTitle = styled.h1`
  text-decoration: underline;
  color: #25b;
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CategoryBox = styled.div`
  margin: 10px 0px;
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
        "https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=2pAbKOEz8ASuAknW3ktpDO4BUGph89k2"
      )
      .catch((err) => {
        console.log(err);
      });

    setHomeData(response.data.results);
  };
  console.log(homeData);

  return (
    <div>
      {!loading ? (
        <>
          {homeData.map((topStories) => {
            const { title, section, abstract, byline, url } = topStories;
            return (
              <CategoryBox>
                <h5>{byline}</h5>
                <h3>{section}</h3>
                <h2>{title}</h2>
                <p>{abstract}</p>
                <a href={url} target="_blank">
                  LINK
                </a>
                <hr />
              </CategoryBox>
            );
          })}
        </>
      ) : (
        <div className="loader-div">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
}
