import React, { useEffect } from "react";
import "./film.scss";

const Film = ({ film }) => {
  useEffect(() => {
    console.log(film);
  }, []);

  return (
    <React.Fragment>
      <div className="film__wrapper">
        <div className="film__image">
          <img
            src={film._image ? film._image.value.replace("http", "https") : ""}
            alt=""
          />
        </div>
        <div className="text-content">
          <p>{film.itemLabel?.value}</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Film;
