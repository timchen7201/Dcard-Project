import { React, useContext, useState, useEffect } from "react";
import SpotCard from "../component/card";
import { CityContext } from "../appContext";

function Spots() {
  const { cityState, cityDispatch } = useContext(CityContext);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (typeof cityState !== null) {
      if (cityState === "all") {
        setShowAll(true);
      } else {
        setShowAll(false);
      }
    }
    return () => {};
  }, [cityState]);

  return showAll ? (
    <section className="container">
      <sapn>all</sapn>
      <SpotCard />
    </section>
  ) : (
    <section className="container">
      <span>{cityState}</span>
    </section>
  );
}

export { Spots };
