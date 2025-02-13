import Grid from "@mui/material/Grid2";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { getNearByAirPorts } from "../Controllers/CountryController";

// function not(a, b) {
//   return a.filter((value) => !b.includes(value));
// }

// function intersection(a, b) {
//   return a.filter((value) => b.includes(value));
// }

export default function TransferList() {
  const [nearbyAirPorts, setNearByAirPorts] = useState([]);
  const [location, setLocation] = useState([
    { latitude: null, longitude: null },
  ]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition(
        (position) => {
          setLocation([
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          ]);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    async function fetchNearbyAirPorts() {
      try {
        const result = await getNearByAirPorts(location[0]);
        console.log(result);
        setNearByAirPorts([result.data.current]);
      } catch (error) {
        console.error(error);
      }
    }
    fetchNearbyAirPorts();
  }, [location]);

  useEffect(() => {
    console.log(nearbyAirPorts);
  }, [nearbyAirPorts]);
  return (
    <Grid container>
      <Grid item disaply="flex" flexDirection="row">
        <Autocomplete
          multiple
          id="tags-standard"
          options={nearbyAirPorts || []}
          getOptionLabel={(option) => option?.presentation?.title || "unknown"}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Multiple values"
              placeholder="Favorites"
            />
          )}
        />
        <Grid item>
          <Autocomplete
            multiple
            id="tags-standard"
            options={nearbyAirPorts || []}
            getOptionLabel={(option) =>
              option?.presentation?.title || "unknown"
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Multiple values"
                placeholder="Favorites"
              />
            )}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
