import { React, useContext, useState } from "react";
import Map from "../component/tawainMap";
import { Button } from "react-bootstrap";
import { CityContext } from "../appContext";

function Panel() {
  const { cityState, cityDispatch } = useContext(CityContext);
  const [cityOption, setCityOption] = useState(false);

  return (
    <section className="container">
      <div className="row">
        <div className="col-lg-6 text-center">
          <div>
            <h1>歡迎</h1>
            <span>這是一個簡單提供查詢全台旅遊景點的網站：）</span>
          </div>
          <div
            className="space-around text-center mt-3"
            style={{ width: "300px" }}
          >
            <Button
              variant="primary"
              onClick={() => {
                cityDispatch("all");
              }}
            >
              全縣市
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setCityOption((prev) => !prev);
              }}
            >
              選擇單一縣市
            </Button>
          </div>
        </div>
        <div className="col-lg-6">
          {cityOption ? (
            <Map />
          ) : (
            <div className="block">
              <img
                src="https://i.imgur.com/JQnPalI.jpg"
                width="100%"
                height="100%"
              ></img>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export { Panel };
