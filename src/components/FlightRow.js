import {
  Collapse,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
import FlightDetails from "./FlightDetails";

function minstohrs(totlalMinutes) {
  const hours = (totlalMinutes / 60) | 0;
  const minutes = ((totlalMinutes / 60 - hours) * 60) | 0;
  return `${hours} hr ${minutes} min`;
}
export default function FlightRow({ item, index }) {
  const [open, setOpen] = useState(-1);
  console.log(item?.carrier?.logoUrl);
  return (
    <TableRow key={index}>
      <TableCell>
              <img
                  width="30px"
    height="30px"
          src={item?.outbound?.carrier?.logoUrl}
          alt=""
          style={{ backgroundColor: "transparent" }}
        />{" "}
      </TableCell>
      <TableCell>
        <IconButton
          aria-label="expand row"
          size="small"
          onClick={() => {
            open === index ? setOpen(-1) : setOpen(index);
          }}
        >
          {open === index ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </TableCell>
      <TableCell>
        <Grid disaplay="flex">
          <Grid>
            <Typography color="text.primary">
              {new Date(item.outbound.departureDate).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              {` - `}
              {new Date(item.outbound.arrivalDate).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Typography>
          </Grid>
        </Grid>
      </TableCell>
      <TableCell>
        <Grid
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection={"column"}
        >
          <Grid>
            <Typography color="text.primary">
              {minstohrs(item.outbound.durationInMinutes)}
            </Typography>
          </Grid>
          <Grid>
            <Typography color="text.primary" variant="caption">
              {item.outbound.origin.displayCode}-
              {item.outbound.destination.displayCode}
            </Typography>
          </Grid>
        </Grid>
      </TableCell>
      <TableCell>
        <Typography color="text.primary">
          {`${item.outbound.stopCount} stops`}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography color="text.primary">{item.price}</Typography>
      </TableCell>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open === index} timeout="auto" unmountOnExit>
            <Grid
              display={"flex"}
              flexDirection={"column"}
              container
              spacing={2}
              sx={{ marginTop: 2, padding: 2 }}
            >
              {item.outbound.segments?.map((segment, i) => (
                <Grid
                  key={i}
                  item
                  xs={12}
                  display="flex"
                  flexDirection="column"
                >
                  <FlightDetails segment={segment} />
                </Grid>
              ))}
            </Grid>
          </Collapse>
        </TableCell>
      </TableRow>
    </TableRow>
  );
}
