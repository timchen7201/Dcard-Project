import { React, useContext, useState } from "react";
import Map from "../component/tawainMap";
import { Button } from "react-bootstrap";
import { CityContext } from "../appContext";
import AnchorLink from "react-anchor-link-smooth-scroll";

function Panel() {
  const { cityState, cityDispatch } = useContext(CityContext);
  const [cityOption, setCityOption] = useState(false);

  return (
    <section className="container" id="panel">
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
            <AnchorLink href="#spots">
              <Button
                variant="primary"
                onClick={() => {
                  cityDispatch("all");
                }}
              >
                全縣市景點
              </Button>
            </AnchorLink>
            <AnchorLink href="">
              <Button
                variant="primary"
                onClick={() => {
                  // cityDispatch(null)
                  setCityOption((prev) => !prev);
                }}
              >
                選擇單一縣市
              </Button>
            </AnchorLink>
          </div>
        </div>
        <div className="col-lg-6">
          {cityOption ? (
            <Map />
          ) : (
            <div className="block">
              <img src="assets/img/taiwan.jpg" width="100%" height="100%"></img>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export { Panel };
