import {
  Button,
  FormControl,
  IconButton,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import Passengers from "./Passengers";
import Trip from "./Trip";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import dayjs from "dayjs";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import MultipleStopTwoToneIcon from "@mui/icons-material/MultipleStopTwoTone";
import { searchFlights } from "../Controllers/CountryController";
import SearchResults from "./FlightsList";
const options = [
  { value: "Round trip", icon: <ImportExportIcon fontSize="small" /> },
  { value: "one way", icon: <TrendingFlatIcon fontSize="small" /> },
  { value: "Multi-city", icon: <MultipleStopTwoToneIcon fontSize="small" /> },
];

export default function Journey() {
  const [trip, setTrip] = useState(options[0]);
  const [Class, setClass] = useState("Economy");
  const [flights, setFlights] = useState([
    {
      departureDate: dayjs(),
      returnDate: null,
      from: [],
      to: [],
    },
  ]);
  const [passengers, setPassengers] = useState({
    adults: 1,
    childern: 0,
    infantsSeat: 0,
    infantsLap: 0,
  });
  const [result, setResult] = useState([]);

  useEffect(()=>{console.log(result)},[result]) 

  const handleAddFlight = () => {
    setFlights([...flights, {}]);
  };

  const handleChangeTripType = (newValue) => {
    console.log("", newValue);
    if (trip.value === "Multi-city" && newValue !== trip.value) {
      setFlights((prevFlights) => prevFlights.slice(0, 1));
    }
    const selectedTrip=options.find((option) => option.value===newValue)
    setTrip(selectedTrip);
  };

  const handleDeleteFlight = (flightToDelete) => {
    setFlights((prevFlights) =>
      prevFlights.filter((flight) => flight !== flightToDelete)
    );
  };

  
  const handleSubmit = async () => {
    let newResults = [];
  
    for (const flight of flights) {
      const departureDate = flight.departureDate;
      const returnDate = flight.returnDate;
      for (const origin of flight.from) {
        console.log(origin);
        for (const destination of flight.to) {
          console.log(destination);
          try {
            const response = await searchFlights(
              Class,
              passengers,
              departureDate,
              trip.value === "one way" ? undefined : returnDate,
              origin,
              destination,
              "best"
            );
            newResults = newResults.concat(response);
          } catch (error) {
            console.error("Error fetching flights:", error);
          }
        }
      }
    }
  
    setResult(newResults);
  };

  return (
    <Grid>
      <Paper display="flex" flexGrow={1} elevation={3}>
        <Grid
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
          width="100%"
          alignItems="center"
        >
          <Grid display={"flex"} alignItems={"center"}>
            <FormControl sx={{ color: "black" }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={trip?.value}
                onChange={(e) => {
                  handleChangeTripType(e.target.value)
                }}
                input={
                  <OutlinedInput
                    sx={{
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none", // Remove the border
                      },
                    }}
                    label="Trip Type"
                  />
                }
              >
                {options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    <Grid display="flex" flexDirection="row">
                      {option.icon}{" "}
                      <Typography sx={{ ml: 1 }}>{option.value}</Typography>
                    </Grid>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Passengers passengers={passengers} setPassengers={setPassengers} />
            <FormControl sx={{ color: "black" }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={Class}
                onChange={(e) => {
                  setClass(e.target.value);
                }}
                input={
                  <OutlinedInput
                    sx={{
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none", // Remove the border
                      },
                    }}
                  />
                }
              >
                <MenuItem value="Economy">Economy</MenuItem>
                <MenuItem value="Premium economy">Premium economy</MenuItem>
                <MenuItem value="Business">Business</MenuItem>
                <MenuItem value="First">First</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid display={"flex"} justifyContent="space-between" flexDirection={"column"} alignItems={"center"}
          rowGap={2}
        >
          {flights &&
            flights.length &&
            flights.map((flight, index) => (
              <Grid key={index}
                display="flex" flexDirection="row"
                justifyContent="space-between" alignItems="center"
              >
                <Grid>

                <Trip
                  index={index}
                  setFlights={setFlights}
                  flights={flights}
                  trip={trip.value}
                />
                  </Grid>
                {trip.value === "Multi-city" && flights.length > 1 && (
                  <IconButton onClick={() => handleDeleteFlight(flight)}>
                    <ClearIcon />
                  </IconButton>
                )}
              </Grid>
            ))}
        </Grid>

        <Grid>
          {trip.value === "Multi-city" && (
            <Button sx={{ color: "primary.color" }} onClick={handleAddFlight}>
              Add Flight
            </Button>
          )}
        </Grid>
      </Paper>
      <Grid>
        <IconButton onClick={handleSubmit}>
          <SearchIcon />
          <Typography>Search</Typography>
        </IconButton>
      </Grid>
      <Grid>
        {result&&result.length&&<SearchResults results={result} />}
      </Grid>
    </Grid>
  );
}