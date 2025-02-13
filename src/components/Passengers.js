import {
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import RemoveIcon from "@mui/icons-material/Remove";
import PersonIcon from "@mui/icons-material/Person";

export default function Passengers() {
  const [passengers, setPassengers] = useState({
    adults: 1,
    childern: 0,
    infantsSeat: 0,
    infantsLap: 0,
  });
  const [sum, setSum] = useState(1);

  useEffect(() => {
    setSum(sum + 1);
  }, [passengers]);

    const handleChange = (key, value) => {
      console.log("", key, value);
    setPassengers((prev) => ({
      ...prev,
      [key]: Math.max(0, prev[key] + value),
    }));
  };

  return (
      <Grid container spacing={2} sx={{ maxWidth: 350, p: 2 }}> 
          
          <FormControl sx={{ color: "black" }}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
             
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
                   {[
        { label: "Adults", key: "adults" },
        { label: "children", key: "childern", subLabel: "2-11" },
        { label: "Infants", key: "InfantsSeat", subLabel: "In seat" },
        { label: "Infants", key: "InfantsLabel", subLabel: "On lap" },
      ].map(({ label, subLabel, key }) => {
        return (
          <Grid
            container
            item
            alignItems="center"
            key={key}
            justifyContent="space-between"
          >
            <Grid item key={key}>
              <Typography>{label}</Typography>
              {subLabel && (
                <Typography variant="caption">{subLabel}</Typography>
              )}
            </Grid>
            <Grid item>
              <IconButton onClick={() => handleChange(key, 1)}>
                <AddBoxIcon />
              </IconButton>
              <Typography>{passengers[key]}</Typography>
              <IconButton
                disabled={!passengers[key]}
                onClick={() => handleChange(key, -1)}
              >
                <RemoveIcon />
              </IconButton>
            </Grid>
          </Grid>
        );
      })}
           
            </Select>
          </FormControl>
     
    </Grid>
  );
}
