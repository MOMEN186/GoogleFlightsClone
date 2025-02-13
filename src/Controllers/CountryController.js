export async function getNearByAirPorts(location) {


    // if (!location || typeof location.latitude !== "number" || typeof location.longitude !== "number") {
    //     console.error("Invalid location data:", location);
    //     return { status: false, message: "Invalid location data" };
    // }

    const url = `https://sky-scrapper.p.rapidapi.com/api/v1/flights/getNearByAirports?lat=${(location.latitude)}&lng=${location.longitude}&locale=en-US`;
    
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'fd779e3271msh5dd082ef62549a6p1ed2abjsn646d723154e2',
            'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
        }
    };
    try {
        const response = await fetch(url, options);

        const result = await response.json();
        // console.log(result);
        return result;
    } catch (error) {
        console.error("API Error:", error);
        return { status: false, message: "API request failed" };
    }
}
