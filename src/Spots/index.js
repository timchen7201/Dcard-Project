import { React, useContext, useState, useEffect } from "react";
import SpotCard from "../component/card";
import { CityContext } from "../appContext";
import request from "../utils/request";
import InfiniteScroll from "react-infinite-scroll-component";
// import InfiniteScroll from "react-infinite-scroller";

function Spots() {
  const { cityState, cityDispatch } = useContext(CityContext);
  const [showAll, setShowAll] = useState(false);
  const [showCity, setShowCity] = useState(false);
  const [showAllData, setShowAllData] = useState([]);
  const [showCityData, setShowCityData] = useState([]);
  const [loadcounter, setLoadCounter] = useState(1);
  useEffect(() => {
    if (cityState !== null) {
      if (cityState === "all") {
        console.log("first all");
        try {
          request.get("/ScenicSpot?$top=30&$format=JSON").then((response) => {
            console.log(response);
            const { data } = response;
            setShowAllData(data);
          });
        } catch (error) {
          alert("資料過載");
          console.log(error.response.status);
        }
        setShowAll(true);
        setShowCity(false);
        setLoadCounter(1);
      } else if (cityState.length !== 0) {
        console.log("first else");
        setShowAll(false);
        setShowCity(true);
        request
          .get(`/ScenicSpot/${cityState}?$top=30&$format=JSON`)
          .then(({ data }) => setShowCityData(data));
        setLoadCounter(1);
      }
    }
    return () => {};
  }, [cityState]);

  const fetchMoreData = () => {
    const new_count = loadcounter + 1;
    setLoadCounter(new_count);
    if (cityState === "all") {
      setShowAll(true);
      console.log("all", new_count);
      setTimeout(() => {
        request
          .get(`/ScenicSpot?$top=${30 * new_count}&$format=JSON`)
          .then(({ data }) => setShowAllData(data));
      }, 1500);
    } else if (cityState.length !== 0) {
      setShowAll(false);
      console.log("else-", new_count);

      request
        .get(`/ScenicSpot/${cityState}?$top=${30 * new_count}&$format=JSON`)
        .then(({ data }) => setShowCityData(data));
    }
  };

  return showAll ? (
    <section className="container mt-5">
      <InfiniteScroll
        dataLength={showAllData.length}
        next={fetchMoreData}
        hasMore={true || false}
        loader={<h4>Loading...</h4>}
      >
        <div className="row">
          {showAllData.map((spot) => {
            return (
              <div className="col-sm-4">
                <SpotCard
                  ID={spot.ID}
                  Name={spot.Name}
                  Phone={spot.Phone}
                  DescriptionDetail={spot.DescriptionDetail}
                  Description={spot.Description}
                  TicketInfo={spot.TicketInfo}
                  Phone={spot.Phone}
                  Address={spot.Address}
                  Remarks={spot.Remarks}
                  Picture={spot.Picture.PictureUrl1}
                  Position={spot.Position}
                />
              </div>
            );
          })}
        </div>
      </InfiniteScroll>
    </section>
  ) : showCity ? (
    <section className="container mt-5">
      <InfiniteScroll
        dataLength={showCityData.length}
        next={fetchMoreData}
        hasMore={true || false}
        loader={<h4>Loading....</h4>}
      >
        <div className="row">
          {showCityData.map((spot) => {
            return (
              <div className="col-sm-4">
                <SpotCard
                  ID={spot.ID}
                  Name={spot.Name}
                  Phone={spot.Phone}
                  DescriptionDetail={spot.DescriptionDetail}
                  Description={spot.Description}
                  TicketInfo={spot.TicketInfo}
                  Phone={spot.Phone}
                  Address={spot.Address}
                  Remarks={spot.Remarks}
                  Picture={spot.Picture.PictureUrl1}
                  Position={spot.Position}
                />
              </div>
            );
          })}
        </div>
      </InfiniteScroll>
    </section>
  ) : (
    <div></div>
  );
}

export { Spots };
