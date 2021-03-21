import { React, useContext, useState, useEffect } from "react";
import SpotCard from "../component/card";
import { CityContext } from "../appContext";
import request from "../utils/request";
import InfiniteScroll from "react-infinite-scroll-component";

function Spots() {
  const { cityState, cityDispatch } = useContext(CityContext);
  const [showAll, setShowAll] = useState(false);
  const [showAllData, setShowAllData] = useState([]);
  const [showCityData, setShowCityData] = useState([]);
  const [loadcounter, setLoadCounter] = useState(1);
  useEffect(() => {
    if (typeof cityState !== null) {
      if (cityState === "all") {
        setShowAll(true);
        request
          .get("/ScenicSpot?$top=3&$format=JSON")
          .then(({ data }) => setShowAllData(data));
        setLoadCounter(1);
      } else {
        setShowAll(false);
        request
          .get(`/ScenicSpot/${cityState}?$top=3&$format=JSON`)
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
      request
        .get(`/ScenicSpot?$top=${3 * new_count}&$format=JSON`)
        .then(({ data }) => setShowAllData(data));
    } else {
      setShowAll(false);
      request
        .get(`/ScenicSpot/${cityState}?$top=${3 * new_count}&$format=JSON`)
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
  ) : (
    <section className="container mt-5">
      <InfiniteScroll
        dataLength={showCityData.length}
        next={fetchMoreData}
        hasMore={true || false}
        loader={<h4>Loading...</h4>}
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
  );
}

export { Spots };
