import {
  Collapse,
  IconButton,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";

import Grid from "@mui/material/Grid2";
import { useState } from "react";
import FlightRow from "./FlightRow";


export default function SearchResults({ results }) {
  return (
    <Grid container display="flex" flexDirection="row">
      <TableContainer>
        <Table component={Paper} aria-label="collapsible table">
          <TableBody>
            {results?.length &&
              results[0]?.map((item, index) => {
                // console.log(item.outbound.segments[0]);

                return (
                  <Grid display="flex" flexDirection="column">
                  <FlightRow item={ item} index={index} />

                  </Grid>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
