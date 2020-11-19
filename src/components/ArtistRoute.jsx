import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchArtistProfile } from "../helpers/api-helpers";
import { useDispatch } from "react-redux";
import {
  receiveArtistProfile,
  receiveArtistProfileError,
  requestArtistInfo,
} from "../action";

const ArtistRoute = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.token);
  const { id: artistId } = useParams();

  const currentArtist = useSelector((state) => state.artists.currentArtist);
  const status = useSelector((state) => state.artists.status);

  //format method
  let n = Intl.NumberFormat("en", { notation: "compact" });

  useEffect(() => {
    if (!accessToken) {
      return;
    }
    dispatch(requestArtistInfo());
    fetchArtistProfile(accessToken, artistId)
      .then((data) => {
        dispatch(receiveArtistProfile(data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(receiveArtistProfileError());
      });
  }, [accessToken]);

  return (
    <>
      {status === "error" && <p>error</p>};
      {status === "loading" && <p>loading...</p>}
      {currentArtist && (
        <>
          <HeaderWrap>
            <ProfilePic src={currentArtist.images[0].url} alt="profile" />
            <Name>{currentArtist.name}</Name>
          </HeaderWrap>
          <StatWrap>
            <Stat>
              {n.format(currentArtist.followers.total)}{" "}
              <Follow> followers</Follow>
            </Stat>
          </StatWrap>
          <TagWrap>
            <Tag>tags</Tag>
            <div>
              <TagSpan>{currentArtist.genres[0]}</TagSpan>
              <TagSpan>{currentArtist.genres[1]}</TagSpan>
            </div>
          </TagWrap>
        </>
      )}
    </>
  );
};

const HeaderWrap = styled.div`
  margin-top: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

const ProfilePic = styled.img`
  width: 175px;
  height: auto;
  border-radius: 50%;
`;

const Name = styled.h1`
  color: white;
  font-family: bold;
  font-family: Montserrat, sans-serif;
  font-size: 48px;
  position: absolute;
  top: 100px;
`;

const StatWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 45px;
`;

const Stat = styled.p`
  font-size: 17px;
  color: #ff4fd8;
`;

const Follow = styled.span`
  color: white;
`;

const TagWrap = styled.div`
  margin-top: 150px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Tag = styled.p`
  font-size: 21px;
`;

const TagSpan = styled.span`
  font-size: 11px;
  margin: 5px;
  padding: 8px 20px;
  background-color: rgba(75, 75, 75, 0.4);
  border-radius: 5px;
`;

export default ArtistRoute;
