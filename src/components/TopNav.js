import { AppBar, Box, Chip, IconButton, Stack, Toolbar } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid2";
import FlightIcon from "@mui/icons-material/Flight";
import LuggageIcon from "@mui/icons-material/Luggage";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import HotelIcon from "@mui/icons-material/Hotel";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useThemeContext } from "./ThemeProvider";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ffffff",
    },
    background: {
      default: "white",
      paper: "#f5f5f5",
    },
    text: {
      primary: "#000000", // Default text color
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          color: "#000000",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.2)",
          },
        },
        icon: {
          color: "#0b63e3",
          fontSize: "16px",
        },
      },
    },
  },
  MuiGrid2: {
    styleOverrides: {
      root: {
        color: "#000000",
        backgroundColor: "white",
        "&.MuiGrid2-container": {
          backgroundColor: "white",
        },
        "&.MuiGrid2-item": {
          backgroundColor: "white",
        },
      },
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#272727",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          color: "#ffffff",
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.15)",
          },
        },
        icon: {
          color: "#90caf9",
          DarkModeIcon: {
            color: "#5f6469",
          },
        },
      },
    },
  },
});

export default function TopNav() {
    const { mode,toggleMode } = useThemeContext();
  const handleClick = () => {};



  return (
      <Grid container>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "space-between", width: "100%" }}>
              <Stack direction="row" spacing={1}>
                <Chip label="Travel" icon={<LuggageIcon />} onClick={handleClick} />
                <Chip label="Explore" icon={<TravelExploreIcon />} onClick={handleClick} />
                <Chip label="Flights" icon={<FlightIcon />} onClick={handleClick} />
                <Chip label="Hotels" icon={<HotelIcon />} onClick={handleClick} />
                <Chip label="Vacation rentals" icon={<HomeIcon />} onClick={handleClick} />
              </Stack>
              <Chip icon={mode === "light" ? <DarkModeIcon sx={{ color: "red" }} /> : <LightModeIcon />} 
                onClick={toggleMode} 
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Grid>
  );
}
