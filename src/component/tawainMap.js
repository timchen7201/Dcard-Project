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
    case "Hsinchu County":
      return "新竹縣";
    case "Hsinchu City":
      return "新竹市";
    case "Taoyuan City":
      return "桃園市";
    case "Miaoli County":
      return "苗栗縣";
    case "Changhua County":
      return "彰化縣";
    case "Yilan County":
      return "宜蘭縣";
    case "Yunlin County":
      return "雲林縣";
    case "Chiayi County":
      return "嘉義縣";
    case "Kaohsiung City":
      return "高雄市";
    case "Hualien County":
      return "花蓮縣";
    case "Tainan City":
      return "台南市";
    case "Pingtung County":
      return "屏東縣";
    case "Penghu County":
      return "澎湖縣";
    case "Kinmen County":
      return "金門縣";
    case "Taitung County":
      return "台東縣";
    case "Lienchiang County":
      return "連江縣";
    case "Chiayi County":
      return "嘉義市";
      // case "":
      //     return ''
      // case "":
      //     return ''
      return city;
  }
};

const toSearchWord = (city) => {
  const words = city.split(" ");
  if (words[words.length - 1] === "County") {
    return words[0] + words[1];
  } else if (words[words.length - 1] === "City") {
    return city.substring(0, city.lastIndexOf(" "));
  }
};
export default function TaiwanMap() {
  const [pointedCity, setPointedCity] = useState();
  const { cityState, cityDispatch } = useContext(CityContext);

  const handleMouseOver = (e) => {
    const city_name = e.target.attributes.name.value;
    console.log(city_name);
    setPointedCity(toChineseName(city_name));
  };
  const handleClicked = (e) => {
    const city_name = e.target.attributes.name.value;
    cityDispatch(toSearchWord(city_name));
  };

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
          onLocationMouseOut={() => {
            setPointedCity();
          }}
        />
      </div>
    </div>
  );
}
