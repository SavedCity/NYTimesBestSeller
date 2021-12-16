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
  const dispatch = useDispatch();
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
    setHomeData(response);
    dispatch(setLoading(false));
    console.log(loading);
  };

  return (
    <div>
      {/* {!loading ? (
        <>
          {homeData.map((topStories) => {
            console.log(topStories);

            return <CategoryBox></CategoryBox>;
          })}
        </>
      ) : (
        <div className="loader-div">
          <div className="loader"></div>
        </div>
      )} */}
    </div>
  );
}
