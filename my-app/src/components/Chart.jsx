"use client";
import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import axios from "axios";

const Chart = () => {
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    const addMarks = () => {
      const username = JSON.parse(localStorage.getItem("currentUser"));
      const currentUser = username.id;
      axios
        .get(`http://localhost:3001/getMarks/${currentUser}`)
        .then((response) => {
          setMarks(response.data.marks);
          console.log(response.data.marks);
        })
        .catch((err) => {
          console.error(err);
        });
    };

    addMarks();
  }, []);
  const index = 0;

  const examResults = marks.map((mark, index) => ({
    name: `Exam ${index + 1}`,
    mark1: mark,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart width={1000} height={375} margin={10} data={examResults}>
        <YAxis />
        <XAxis dataKey="name" />
        <CartesianGrid strokeDasharray="5 5" />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          stroke="var(--first-chart-line-stroke)"
          fill="var(--first-chart-line)"
          dataKey="mark1"
          stackId="2"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Chart;
