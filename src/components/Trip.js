import {
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import Passengers from "./Passengers";
import SearchIcon from '@mui/icons-material/Search';
import CountrySelect from "./CountrySelect";
export default function Trip() {
  const [trip, setTrip] = useState("Round trip");
  const [Class, setClass] = useState("Economy");
  return (
    <Grid
      container
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
    >
      <Paper elevation={3} width="100%" >
        <Grid display="flex" width="250px" >
          <FormControl sx={{ color: "black" }}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={trip}
              onChange={(e) => {
                setTrip(e.target.value);
              }}
              input={
                <OutlinedInput
                  startAdornment={
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  }
                  label="Trip Type"
                />
              }
            >
              <MenuItem value="Round trip">Round trip</MenuItem>
              <MenuItem value="one way">one way</MenuItem>
              <MenuItem value="Multi-city">Multi-city</MenuItem>
            </Select>
          </FormControl>

          <Passengers />
          <FormControl sx={{ color: "black" }}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={Class}
              onChange={(e) => {
                setClass(e.target.value);
              }}
              input={<OutlinedInput />}
            >
              <MenuItem value="economy">Economy</MenuItem>
              <MenuItem value="premium economy">Premium economy</MenuItem>
              <MenuItem value="business">Business</MenuItem>
              <MenuItem value="first">First</MenuItem>
            </Select>
          </FormControl>
              </Grid>
              <Grid>
                  <CountrySelect/>
              </Grid>

          </Paper>
          


          <IconButton>
              <SearchIcon/>
          </IconButton>
    </Grid>
  );
}
