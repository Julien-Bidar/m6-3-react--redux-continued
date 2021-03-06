export const requestAccessToken = () => ({ type: "REQUEST_ACCESS_TOKEN" });

export const receiveAccessToken = (token) => ({
  type: "RECEIVE_ACCESS_TOKEN",
  token,
});

export const receiveAccessTokenError = () => ({
  type: "RECEIVE_ACCESS_TOKEN_ERROR",
});

export const requestArtistInfo = () => ({
  type: "REQUEST_ARTIST_INFO",
});

export const receiveArtistProfile = (profile) => ({
  type: "RECEIVE_ARTIST_PROFILE",
  profile,
});

export const receiveArtistProfileError = () => ({
  type: "RECEIVE_ARTIST_PROFILE_ERROR",
});
