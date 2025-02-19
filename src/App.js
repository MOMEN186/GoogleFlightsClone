import "./App.css";
import TopNav from "./components/TopNav";
import Grid from "@mui/material/Grid2";
import { ThemeProviderWrapper } from "./components/ThemeProvider";
import { Typography } from "@mui/material";
import Journey from "./components/Journey";

function App() {
  return (
    <ThemeProviderWrapper>
      <Grid container className="App">
        <Grid width="100%">
          <TopNav />
        </Grid>

        <Grid
          display="flex"
          width="100%"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          marginTop="50px"
          rowGap={10}
        >
          <Typography variant="h2" fontSize="56px" color={"text.primary"}>
            Flights
          </Typography>

          <Journey />
        </Grid>
      </Grid>
    </ThemeProviderWrapper>
  );
}

export default App;
