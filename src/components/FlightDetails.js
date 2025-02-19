import { Typography, Divider } from "@mui/material";
import Grid from "@mui/material/Grid2";

function minstohrs(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours} hr ${minutes} min`;
}

export default function FlightDetails({ segment }) {
  return (
    <Grid display="flex" flexDirection="column" gap={2} sx={{ p: 2 }}>
        
      <Grid display={"flex"} columnGap={1}  alignItems={"center"}>
        <Typography variant="h6" color="text.primary">
          {new Date(segment.departure).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Typography>
        <Typography color="text.primary">
          {segment.origin.name} ({segment.origin.displayCode})
        </Typography>
      </Grid>

          {/* Flight Duration */}
          <Grid>
          <Typography variant="caption" align="center" color="text.secondary">
        Travel time: {minstohrs(segment.durationInMinutes)}
      </Typography>
          </Grid>
     

      {/* Arrival Info */}
      <Grid display={"flex"} columnGap={1}  alignItems={"center"}>
        <Typography variant="h6" color="text.primary">
          {new Date(segment.arrival).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Typography>
        <Typography color="text.primary">
          {segment.destination.name} ({segment.destination.displayCode})
        </Typography>
      </Grid>

      {/* Divider for segments */}
      <Divider sx={{ my: 2 }} />
    </Grid>
  );
}
