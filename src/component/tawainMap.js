import React, { useState, useContext } from "react";
import Taiwan from "@svg-maps/taiwan";
import { SVGMap } from "react-svg-map";
import "react-svg-map/lib/index.css";
import { CityContext } from "../appContext";

const toChineseName = (city) => {
  switch (city) {
    case "Taichung City":
      return "台中市";
    case "Nantou County":
      return "南投縣";
    case "Taipei City":
      return "台北市";
    case "Keelung City":
      return "基隆市";
    case "New Taipei City":
      return "新北市";
    case "HsinChu County":
      return "新竹縣";
    case "HsinChy City":
      return "新竹市";
    case "Taoyuan City":
      return "桃園市";
    case "Miaoli County":
      return "苗栗縣";
    case "Changhua County":
      return "彰化縣";
    case "Yilan County":
      return "宜蘭縣";
      // case "":
      //     return ''
      // case "":
      //     return ''
      // case "":
      //     return ''
      // case "":
      //     return ''
      // case "":
      //     return ''
      // case "":
      //     return ''
      // case "":
      //     return ''
      // case "":
      //     return ''
      // case "":
      //     return ''
      // case "":
      //     return ''
      // case "":
      //     return ''
      // case "":
      //     return ''
      // case "":
      //     return ''
      return city;
  }
};

export default function TaiwanMap() {
  const [pointedCity, setPointedCity] = useState();
  const { cityState, cityDispatch } = useContext(CityContext);

  const handleMouseOver = (e) => {
    const city_name = e.target.attributes.name.value;
    setPointedCity(toChineseName(city_name));
  };
  const handleClicked = (e) => {
    const city_name = e.target.attributes.name.value;
    cityDispatch(toChineseName(city_name));
  };

  console.log(Taiwan);

  return (
    <div class="block">
      <div class="map_info">
        目前縣市：<span>{pointedCity}</span>
      </div>
      <div class="map">
        <SVGMap
          map={Taiwan}
          onLocationMouseOver={handleMouseOver}
          onLocationClick={handleClicked}
        />
      </div>
    </div>
  );
}
