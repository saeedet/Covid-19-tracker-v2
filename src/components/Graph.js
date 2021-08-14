import numeral from "numeral";
import { useState } from "react";
import { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { useContextProvider } from "../contextAPI/StateProvider";

//Graph options
const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "11",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

// Preparing the data for graph
const buildChartData = (data, casesType = "cases") => {
  let chartData = [];
  let lastDataPoint;

  for (let date in data[casesType]) {
    if (lastDataPoint) {
      let newDataPoint;
      if (data[casesType][date] === 0) {
        newDataPoint = {
          x: date,
          y: 0,
        };
      } else {
        newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };
      }
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

function Graph() {
  const [data, setData] = useState({});
  const [{ selected_view }] = useContextProvider();

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let chartData = buildChartData(data, selected_view);
          setData(chartData);
        });
    };

    fetchData();
  }, [selected_view]);

  // the chart is not compatible with my defined colors so..
  let color, bgColor;
  if (selected_view === "cases") {
    color = "#fb4443";
    bgColor = "rgba(251, 68, 67, 0.5)";
  } else if (selected_view === "recovered") {
    color = "#7dd71d";
    bgColor = "rgba(125, 215, 29, 0.5)";
  } else {
    color = "#CC1034";
    bgColor = "rgba(204, 16, 52, 0.5)";
  }

  return (
    <div style={{ marginTop: "30px" }}>
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                label: "",
                fill: true,
                backgroundColor: bgColor,
                borderColor: color,
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default Graph;
