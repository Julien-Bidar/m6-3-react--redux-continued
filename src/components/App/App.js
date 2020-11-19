import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import GlobalStyles from "../GlobalStyles";
import styled from "styled-components";
import ArtistRoute from "../ArtistRoute";
import { useDispatch } from "react-redux";
import {
  receiveAccessToken,
  receiveAccessTokenError,
  requestAccessToken,
} from "../../action";

const DEFAULT_ARTIST_ID = "37Hkw3PjSoS9k06WwMibM3";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestAccessToken());
    fetch("/spotify_access_token")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(receiveAccessToken(data.access_token));
        console.log({ data });
      })
      .catch((err) => {
        console.log(err);
        dispatch(receiveAccessTokenError());
      });
  }, []);

  return (
    <Wrapper>
      <Router>
        <Switch>
          <Route path="/artists/:id">
            <ArtistRoute />
          </Route>
          <Route exact path="/">
            <Redirect to={`/artists/${DEFAULT_ARTIST_ID}`} />
          </Route>
        </Switch>
      </Router>
      <GlobalStyles />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: #0b0f14;
  height: 100vh;
  width: 100vw;
`;

export default App;
