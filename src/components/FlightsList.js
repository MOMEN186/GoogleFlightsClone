import {
  Paper,
  Table,
  TableBody,
  TableContainer,
} from "@mui/material";

import Grid from "@mui/material/Grid2";
import FlightRow from "./FlightRow";

export default function SearchResults({ results }) {
  console.log(results);
  return (
    <Grid container display="flex" flexDirection="row">
      <TableContainer>
        <Table component={Paper} aria-label="collapsible table">
          <TableBody>
            {results?.length &&
              results?.map((item, index) => {
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
