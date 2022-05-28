import React, { useEffect } from "react";
import AddTouristActivity from "../AddTouristActivity/AddTouristActivity";
import ListActivities from "../ListActivities/ListActivities";

const TouristActivities = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <AddTouristActivity />
      <ListActivities />
    </>
  );
};

export default TouristActivities;
