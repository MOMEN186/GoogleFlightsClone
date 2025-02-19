import Grid from "@mui/material/Grid2";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { useEffect, useState } from "react";
import { Autocomplete, IconButton, TextField } from "@mui/material";
import { getCountryName, getNearByAirPorts, searchAirports } from "../Controllers/CountryController";

export default function CountrySelect({ to, from, setTo, setFrom, trip }) {
  const [nearbyAirPorts, setNearByAirPorts] = useState([]);
  const [suggestedCities, setSuggestedCities] = useState([]);
  const [country,setCountry]=useState(null);
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });


  useEffect(() => {
    const handleRequestGeolocation = async() => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async(position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            const curentCountry =await getCountryName(position.coords.longitude,position.coords.latitude);
            setCountry(curentCountry);
          },
          (error) => {
            console.log(error);
          }
        );
        
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    };
    handleRequestGeolocation();
  }, []);

  useEffect(() => {
    async function fetchNearbyAirPorts() {
      try {
        const result = await getNearByAirPorts(location);
        setSuggestedCities(result.data.nearby);
      } catch (error) {
        console.error(error);
      }
    }
    if (location.latitude && location.longitude) {
      fetchNearbyAirPorts();
    }
  }, [location, to]);


  useEffect(() => {

    async function fetchAirports() {
      try {
        const result = await searchAirports(country);
        setNearByAirPorts(result);
      } catch (error) {
        console.error(error);
      }
    }
    if (location.latitude && location.longitude && country) {
      fetchAirports();
    }
    

  }, [location,country]); 



  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  return (
    <Grid display="flex" container>
      <Grid
        item
        display="flex"
        justifyContent="space-between"
        flexDirection="row"
      >
        <Grid display={"flex"}>
          <Autocomplete     
             sx={{minWidth:"200px"}}
            multiple
            id="tags-standard"
            options={nearbyAirPorts || []}
            getOptionLabel={(option) =>
              option?.localizedName || "unknown"
            }
            value={from||[]}
            onChange={(event, newValue) => {
              setFrom(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="where from"
                placeholder="where from"
              />
            )}
          />
        </Grid>

          <Grid display={"flex"} flexDirection="row">
            <IconButton onClick={handleSwap}>
              <SwapHorizIcon />
            </IconButton>

            <Grid item>
              <Autocomplete
                sx={{minWidth:"200px"}}
                multiple
                id="tags-standard"
                options={suggestedCities}
                getOptionLabel={(option) =>
                  option?.presentation?.title || "unknown"
                }
                value={to||[]}
                onChange={(_, newValue) => {
                  // console.log(newValue);
                  setTo(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="where to?"
                    placeholder="where to?"
                  />
                )}
              />
            </Grid>
          </Grid>
        
      </Grid>
    </Grid>
  );
}
