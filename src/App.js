import './App.css';
import TopNav from './components/TopNav';
import Grid from "@mui/material/Grid2";
import { ThemeProviderWrapper } from './components/ThemeProvider';
import Trip from './components/Trip';
import { Typography } from '@mui/material';


function App() {
  return (
    <ThemeProviderWrapper>
      <Grid container className="App">  
        <Grid width="100%">
        <TopNav />
        </Grid>

        
        <Grid display="flex" width="100%"
          flexDirection="column"
          justifyContent="center" alignItems="center" marginTop="50px">
        <Typography fontSize="56px">
          Flights
        </Typography>
           <Trip/>
        </Grid>
       
      </Grid>
      </ThemeProviderWrapper>
  );
}

export default App;
