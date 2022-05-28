import React from "react";
import { useSelector } from "react-redux";
import Activity from "../Activity/Activity";
const style = require("./ListActivities.module.css");

const ListActivities = () => {
  const { activities } = useSelector((state) => state.activities);

  return (
    <>
      <h2 className={style.title}>Actividades turisticas</h2>
      <div className={style.actividades}>
        {activities &&
          activities.length > 0 &&
          activities.map((activity) => (
            <Activity key={activity.id} {...activity} />
          ))}
      </div>
    </>
  );
};

export default ListActivities;
