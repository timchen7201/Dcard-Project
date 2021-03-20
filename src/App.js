import React, { useState } from "react";
import "./assets/App.css";
import { CityContext } from "./appContext";
import { Panel } from "./Panel/index";
import { Spots } from "./Spots/index";
function App() {
  const [selectCity, setSelectCity] = useState(null);

  return (
    <div className="App">
      <CityContext.Provider
        value={{ cityState: selectCity, cityDispatch: setSelectCity }}
      >
        <Panel />
        <Spots />
      </CityContext.Provider>
    </div>
  );
}

export default App;
