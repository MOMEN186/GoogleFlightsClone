import {} from "@mui/material";
import Grid from "@mui/material/Grid2";
import CountrySelect from "./CountrySelect";
import Calendar from "./Calendar";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
export default function Trip({ flights, setFlights, index, trip }) {
  const [departureDate, setDepartureDate] = useState(
    flights[index]?.departureDate || dayjs()
  );
  const [returnDate, setReturnDate] = useState(
    flights[index]?.returnDate || dayjs()
  );
  const [from, setFrom] = useState(flights[index]?.from || []);
  const [to, setTo] = useState(flights[index]?.to || []);


  useEffect(() => {
    setFlights((prevFlights) => {
      return prevFlights.map((flight, i) => {
      
        if (i === index) {
           return {
            ...flight,
            departureDate,
            returnDate,
            from: from.map((item) => ({
              title: item?.localizedName || "",
              skyId: item?.skyId || "",
              entityId: item?.entityId || "",
            })),
            to: to.map((item) => ({
              title: item?.presentation?.title || "",
              skyId: item?.navigation?.relevantFlightParams?.skyId || "",
              entityId: item?.navigation?.entityId || "",

            })),
          }
      

        }
        else {
          return flight
         } 
    });
    });
  }, [departureDate, returnDate, from, to]);



  return (
    <Grid
      container
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      flexDirection="row"
      columnGap={5}
    >
      <Grid>
        <CountrySelect
          from={from}
          setFrom={setFrom}
          to={to}
          setTo={setTo}
          trip={trip}
        />
      </Grid>

      <Grid>
        <Calendar
          departureDate={departureDate}
          setDepartureDate={setDepartureDate}
          returnDate={returnDate}
          setReturnDate={setReturnDate}
          from={from}
          to={to}
          trip={trip}
        />
     
        
      </Grid>
    </Grid>
  );
}