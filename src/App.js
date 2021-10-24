import { useEffect } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Map from "./components/Map";
import SideCard from "./components/SideCard";
import { sortData } from "./components/utils";
import ViewCard from "./components/ViewCard";
import { useContextProvider } from "./contextAPI/StateProvider";

function App() {
  const [{ view_info }, dispatch] = useContextProvider();

  // Fetching the worldwide stat
  useEffect(() => {
    const fetchData = async () => {
      fetch("https://disease.sh/v3/covid-19/all")
        .then((response) => response.json())
        .then((data) => {
          dispatch({
            type: "SET_VIEW_INFO",
            view_info: data,
          });
        });
    };

    fetchData();
  }, [dispatch]);

  // Fetching all countries data
  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          dispatch({
            type: "SET_COUNTRIES",
            countries: countries,
          });
          let sortedData = sortData(data);
          dispatch({
            type: "SET_TABLE_INFO",
            table_info: sortedData,
          });
          dispatch({
            type: "SET_MAP_INFO",
            map_info: data,
          });
        });
    };
    fetchData();
  }, [dispatch]);
  return (
    <div className="app">
      <main className="app__main">
        <section className="app__leftSection">
          <Header />
          <div className="app__cardsContainer">
            <ViewCard
              title="cases"
              cases={view_info?.todayCases}
              total={view_info?.cases}
              color="#fb4443"
            />
            <ViewCard
              title="recovered"
              cases={view_info?.todayRecovered}
              total={view_info?.recovered}
              color="green"
            />
            <ViewCard
              title="deaths"
              cases={view_info?.todayDeaths}
              total={view_info?.deaths}
              color="#cc1034"
            />
          </div>

          <Map />
        </section>
        <SideCard />
      </main>

      <Footer />
    </div>
  );
}

export default App;
