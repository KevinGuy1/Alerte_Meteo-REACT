import Data from "./data.json"
import Card from "./components/card.js"
import './App.css'
import axios from "axios";
import { useEffect, useState } from "react";
// require('dotenv').config();

function App() {
  const [isEmpty, setIsEmpty] = useState(true);
  const [alerts, setAlerts] = useState([]);
  // const key ici
  const city = "Libourne";

  // // useEffect(() => {
  // async function getAlert() {
  //   const getLibourneAlert = {
  //     method: 'get',
  //     url: `https://api.weatherbit.io/v2.0/alerts?city=${city}&key=${key}`,
  //   }
  //   let res = await axios(getLibourneAlert)
  //   console.log(res)
  //   if (res.status === 200) {
  //     setAlerts(res.data.alerts)
  //     console.log(alerts)
  //     if (alert.length > 0) {
  //       setIsEmpty(false);
  //     }
  //   }
  // }
  // getAlert();
  // // }, [alerts]);

  // Format de date des alertes 
  function formatDateTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const day = String(dateTime.getDate()).padStart(2, '0');
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const year = dateTime.getFullYear();
    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  function getAlerts() {
    setAlerts(Data);
    if (alerts.length > 0) {
      setIsEmpty(false)
    }
    const matchingAlert = alerts.filter(alert => alert.alerts[0].title === "Orage")
    if (matchingAlert.length > 0) {
      console.log("j'envoie un sms pour dire qu'il y a un orage")
    }
  }

  useEffect(() => {
    getAlerts();
    const interval = setInterval(() => {
      getAlerts();
    }, 43200000); // Exécution toutes les 12 heures.

    return () => clearInterval(interval); // Nettoyage de l'intervalle lors du démontage du composant
  }, [alerts]);


  return (
    <>
      {isEmpty ? (
        <>
          <div>
            <h2>Il n'y a pas d'alertes pour le moment</h2>
          </div>
        </>
      ) : (
        <>
          <div><h1>Libourne</h1></div>
          <div>
            {alerts.map((alert, index) => (
              <Card
                key={index}
                title={alert.alerts[0].title}
                description={(alert.alerts[0].description).split('\n')[0].substring(alert.alerts[0].description.indexOf(':') + 1).trim()}
                danger={alert.alerts[0].severity}
                startAlert={formatDateTime(alert.alerts[0].effective_local)}
                endAlert={formatDateTime(alert.alerts[0].expires_local)}
              />))}
          </div>
        </>
      )}
    </>
  );
}
export default App;
