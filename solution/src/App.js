import React, { useEffect, useState } from "react";
import "./App.css"; // Import your CSS
import Form from "./components/Form/Form";
import { getLocations } from "./mock-api/apis";

const App = () => {
  // IRL everything should be in sepate files and folders, but symplicity of assigment keep it here
  const [locationOptions, setLocationOptions] = useState([]);

  const fetchLocationOptions = async () => {
    const options = await getLocations(); //FIXME
    if (options) {
      setLocationOptions(options);
    } else {
      console.error("Could not get the data");
    }
  };

  // Since we dont have real api do it here otherwise better for to do "fetch" API or React Query etc

  useEffect(() => {
    fetchLocationOptions();
  }, []);

  return (
    <div className="container">
      {locationOptions && <Form locationOptions={locationOptions} />}
    </div>
  );
};

export default App;
