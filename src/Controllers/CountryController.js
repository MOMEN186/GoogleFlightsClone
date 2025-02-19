const ApiKey = "22b9458ea5msh12551b7e7cd0e42p17b753jsn94c9215c26fb";

export async function getNearByAirPorts(location) {
  const url = `https://sky-scrapper.p.rapidapi.com/api/v1/flights/getNearByAirports?lat=${location.latitude}&lng=${location.longitude}&locale=en-US`;

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": ApiKey,
      "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
    },
  };
  try {
    const response = await fetch(url, options);

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("API Error:", error);
    return { status: false, message: "API request failed" };
  }
}

export async function getPriceCalendar(
  origin,
  destination,
  departureDate,
  returnDate
) {
  try {
    console.log(origin);
    const originSkyId = origin[0].skyId;
    const destinationSkyId =
      destination[0]?.navigation?.relevantFlightParams?.skyId;
    const departureDateStr = departureDate.format("YYYY-MM-DD");
    const returnDateStr =
      returnDate === undefined ? undefined : returnDate.format("YYYY-MM-DD");

    const url = `https://sky-scrapper.p.rapidapi.com/api/v1/flights/getPriceCalendar?originSkyId=${originSkyId}&destinationSkyId=${destinationSkyId}&fromDate=${departureDateStr}&toDate=${
      returnDateStr ? `${returnDateStr}` : ""
      }&currency=USD`;
    console.log(url);
    const result = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-key": ApiKey,
        "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
      },
    });
    const data = await result.json();
    // console.log("API Response:", data); // Debugging log

    const prices = {};

    if (data.data?.flights?.days && Array.isArray(data.data.flights.days)) {
      data.data.flights.days.forEach((flight) => {
        const formattedDate = flight.day; // Already in "YYYY-MM-DD" format
        prices[formattedDate] = {
          price: flight.price,
          group: flight.group,
        };
      });
    } else {
      console.error("Unexpected API response structure:", data);
    }

    return prices;
  } catch (error) {
    console.error("Error fetching price calendar:", error);
    return {};
  }
}

export async function searchFlights(
  Class,
  passengers,
  departureDate,
  returnDate,
  origin,
  destination,
  sortBy
) {
  const originSkyId = origin.skyId;
  const originEntityId = Number(origin.entityId);
  const destinationSkyId = destination.skyId;
  const destinationEntityId = Number(destination.entityId);
  const departureDateStr = departureDate.format("YYYY-MM-DD");
  console.log(destinationSkyId,destinationEntityId)
  const returnDateStr =
    returnDate === undefined ? undefined : returnDate.format("YYYY-MM-DD");
  const url = `https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlights?originSkyId=${originSkyId}&destinationSkyId=${destinationSkyId}&originEntityId=${originEntityId}&destinationEntityId=${destinationEntityId}&date=${departureDateStr}&returnDate=${
    returnDateStr ? `${returnDateStr}` : ""
  }&cabinClass=${Class.toLowerCase()}&adults=${
    passengers.adults || 0
  }&children=${passengers.children || 0}&infants=${
    (passengers.infantsLap || 0) + (passengers.infantsSeat || 0)
  }&sortBy=${
    sortBy || "cheapest"
  }&limit=10&currency=USD&market=en-US&countryCode=US`;
  console.log(url);
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": ApiKey,
      "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    console.log("API Response:", result);

    if (!result?.data?.itineraries || result.data.itineraries.length === 0) {
      console.warn("No flights found!");
      return [];
    }

    let flights = [];
    const carriers = result?.data?.filterStats?.carriers;
    console.log(carriers)
    result?.data?.itineraries?.forEach((itinerary) => {

      const outboundLeg = itinerary.legs.find((leg) =>
        leg.departure.includes(departureDateStr)
      );

      const returnLeg = itinerary.legs.find((leg) =>
        leg.departure.includes(returnDateStr)
      );
      const outbound = {
        durationInMinutes: outboundLeg.durationInMinutes,
        departureDate: outboundLeg.departure,
        arrivalDate: outboundLeg.arrival,
        stopCount: outboundLeg.stopCount,
        segments: outboundLeg.segments,
          carrier:outboundLeg?.carriers?.marketing[0],
        origin: {
          entityId: outboundLeg.origin.entityId,
          city: outboundLeg.origin.city,
          country: outboundLeg.origin.country,
          displayCode: outboundLeg.origin.displayCode,
        },
        destination: {
          entityId: outboundLeg.destination.entityId,
          city: outboundLeg.destination.city,
          country: outboundLeg.destination.country,
          displayCode: outboundLeg.destination.displayCode,
        },
      };

      
      if (returnLeg) {
        var Return = {
          durationInMinutes: returnLeg.durationInMinutes,
          departureDate: returnLeg.departure,
          arrivalDate: returnLeg.arrival,
          stopCount: returnLeg.stopCount,
          segments: outboundLeg.segments,
       
          origin: {
            entityId: returnLeg.origin.entityId,
            city: returnLeg.origin.city,
            country: returnLeg.origin.country,
            displayCode: returnLeg.origin.displayCode,
          },
          destination: {
            entityId: returnLeg.destination.entityId,
            city: returnLeg.destination.city,
            country: returnLeg.destination.country,
            displayCode: returnLeg.destination.displayCode,
          },
        };
      }
      flights.push({
        price: itinerary.price.formatted,
        outbound,
        Return,
      });
    });

    console.log("Processed Flights:", flights);
    return flights;
  } catch (error) {
    console.error("API Error:", error);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
}

export async function getCountryName(longitude, latitude) {
  const result = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
  );
  const data = await result.json();
  return data.address.country;
}

export async function searchAirports(countryName) {
  const url = `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=${countryName}&locale=en-US`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": ApiKey,
      "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    const airports = [];
    data?.data?.forEach((item) => {
      const entityId = item?.entityId;
      const entityType = item?.navigation?.entityType;
      const skyId = item?.skyId;
      const suggestionTitle = item?.presentation?.suggestionTitle;
      const localizedName = item?.navigation?.localizedName;
      airports.push({
        entityId,
        entityType,
        skyId,
        suggestionTitle,
        localizedName,
      });
    });
    return airports;
  } catch (error) {
    console.error(error);
  }
}
