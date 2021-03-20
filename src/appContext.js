import React from "react";

const CityContext = React.createContext({
  cityState: [],
  cityDispatch: () => {},
});

export { CityContext };
