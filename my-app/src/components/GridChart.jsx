import React, { useState, useEffect } from "react";
import "../styles/GridChart.css";
import "../styles/Formulas.css";
import Chart from "./Chart";

const GridChart = ({ title }) => {
  return (
    <div className="chart-grid">
      <h1>{title}</h1>
      <Chart />
    </div>
  );
};

export default GridChart;
