import React from "react";

export const TopTracksList = ({ list }) => {
  return list.map((elem) => {
    return <TopListElem elem={elem} />;
  });
};

export const TopListElem = ({ elem }) => {
  return (
    <>
      <div>{elem.name}</div>
      <div>{elem.artists[0].name}</div>
      <img src={elem.album.images[1].url}></img>
    </>
  );
};
