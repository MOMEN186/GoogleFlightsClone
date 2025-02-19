import { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { Typography, Box } from "@mui/material";
import { getPriceCalendar } from "../Controllers/CountryController";

const Calendar = ({
  departureDate,
  setDepartureDate,
  returnDate,
  setReturnDate,
  from,
  to,
  trip,
}) => {
  const [highlightedDays, setHighlightedDays] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const prices = await getPriceCalendar(
          from,
          to,
          departureDate,
          trip==="one way"?undefined:returnDate
        );
        setHighlightedDays(prices);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, [from, to, returnDate, departureDate]);

  useEffect(() => {
    if (departureDate.isAfter(returnDate) && trip!=="one way") {
      const temp = departureDate;
      setDepartureDate(returnDate);
      setReturnDate(temp);
    }
  }, [returnDate, departureDate]);

  function ServerDay(props) {
    const { day, selected, ...other } = props;
    const dateStr = day.format("YYYY-MM-DD"); // Format the day to match the API response
    const dayData = highlightedDays[dateStr];

    const groupColors = {
      low: "green",
      medium: "orange",
      high: "red",
    };

    return (
      <Box display="flex" flexDirection="column" alignItems="center">
        <PickersDay {...other} selected={selected} day={day} />
        {dayData && (
          <Typography
            variant="caption"
            sx={{ color: groupColors[dayData.group] }}
          >
            ${dayData.price.toFixed(0)}
          </Typography>
        )}
      </Box>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={departureDate}
        onChange={(newValue) => setDepartureDate(newValue)}
        disablePast
        slots={{ day: ServerDay }}
        slotProps={{
          textField: {
            label: "deprture",
          },
        }}
      />
      {trip !== "one way" && (
        <DatePicker
          value={returnDate}
          onChange={(newValue) => setReturnDate(newValue)}
          disablePast
          slots={{ day: ServerDay }}
          slotProps={{
            textField: {
              label: "Arrival",
            },
          }}
        />
      )}
    </LocalizationProvider>
  );
};
export default Calendar;
