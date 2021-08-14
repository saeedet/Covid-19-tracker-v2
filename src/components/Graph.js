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
  console.log("graph>>> ", data);
  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

function Graph() {
  const [data, setData] = useState({});
  const [{ selected_view }, _] = useContextProvider();

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let chartData = buildChartData(data, selected_view);
          console.log(chartData);
          setData(chartData);
        });
    };

    fetchData();
  }, [selected_view]);

  return (
    <div style={{ marginTop: "40px" }}>
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                label: "",
                fill: true,
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                borderColor: "#CC1034",
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
