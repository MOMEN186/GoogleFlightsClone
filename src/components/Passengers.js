import {
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import RemoveIcon from "@mui/icons-material/Remove";
import PersonIcon from "@mui/icons-material/Person";

export default function Passengers({ passengers, setPassengers }) {
  const [sum, setSum] = useState(1);

  const handleChange = (key, value) => {
    console.log("", key, value,sum+value);
    setSum(sum + value);
    setPassengers((prev) => ({
      ...prev,
      [key]: Math.max(0, (prev[key]||0)+ value),
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
              
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none', // Remove the border
              },
            }}
              startAdornment={
                <InputAdornment position="start">
                  <PersonIcon />
                  {sum}
                </InputAdornment>
              }
              label="Trip Type"
            />
          }
        >
          {[
            { label: "Adults", key: "adults" },
            { label: "children", key: "childern", subLabel: "2-11" },
            { label: "Infants", key: "infantsSeat", subLabel: "In seat" },
            { label: "Infants", key: "infantsLabel", subLabel: "On lap" },
          ].map(({ label, subLabel, key }) => {
            return (
              <Grid
                container
                item
                alignItems="center"
                key={key}
                justifyContent="space-between"
                display="flex"
              >
                <Grid item key={key}>
                  <Typography>{label}</Typography>
                  {subLabel && (
                    <Typography variant="caption">{subLabel}</Typography>
                  )}
                </Grid>
                <Grid item display="flex" flexDirection="row">
                  {sum < 10 ? (
                    <IconButton onClick={() => handleChange(key, 1)}>
                      <AddBoxIcon />
                    </IconButton>
                  ) : (
                    <></>
                  )}
                  <Typography>{(passengers[key])}</Typography>
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
          {
           sum>9&& <Typography variant="caption">
              cant handle more than 9 passengers
            </Typography>
          }
        </Select>
        
      </FormControl>
      <Grid>
     
      </Grid>
    </Grid>
  );
}
