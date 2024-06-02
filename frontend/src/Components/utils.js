// utils.js
import axios from 'axios';

const GOONG_API_KEY = 'IjDAiJRt75F1n7QSaKLAhzO5b4s1uAreTjS4Q53c';

export const getRouteDetails = async (item) => {

    // nhận vào đối tượng kiểu route
    console.log("item: ",item);
    const url = `https://rsapi.goong.io/Geocode?address=${encodeURIComponent(item.end_address)}&api_key=${GOONG_API_KEY}`;
    const url1 = `https://rsapi.goong.io/Geocode?address=${encodeURIComponent(item.start_address)}&api_key=${GOONG_API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const response1 = await fetch(url1);
        const data1 = await response1.json();
        const endLocation = data.results[0]?.geometry.location || null;
        const startLocation = data1.results[0]?.geometry.location || null;
        
        
        
        const busStopsResponse = await axios.get(`http://localhost:3001/bus-stop/all`);
        // busStopsResponse.data.map(item1 => console.log("item1.route_no: ", typeof(item1.route_no.toString())));
        const filteredBusStops = item.route_no
            ? busStopsResponse.data.filter(item1 => item1.route_no === item.route_no)
            : busStopsResponse.data;
        // console.log(filteredBusStops)
        return {
            startLocation,
            endLocation,
            busStops: filteredBusStops
        };
    } catch (error) {
        throw new Error('Error fetching route details: ' + error.message);
    }
};
const decodePolyline = (encoded) => {
    let index = 0;
    const len = encoded.length;
    const polyline = [];
    let lat = 0;
    let lng = 0;

    while (index < len) {
        let b;
        let shift = 0;
        let result = 0;
        do {
            b = encoded.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);

        const dlat = ((result & 1) !== 0 ? ~(result >> 1) : (result >> 1));
        lat += dlat;

        shift = 0;
        result = 0;
        do {
            b = encoded.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);

        const dlng = ((result & 1) !== 0 ? ~(result >> 1) : (result >> 1));
        lng += dlng;

        const latlng = [lng / 1e5, lat / 1e5];
        polyline.push(latlng);
    }

    return polyline;
};

const processResponse = (data) => {
    if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        const legs = route.legs;
        const routeCoordinates = [];

        legs.forEach((leg) => {
            const steps = leg.steps;
            steps.forEach((step) => {
                const polyline = step.polyline;
                const decodedPolyline = decodePolyline(polyline.points);
                routeCoordinates.push(...decodedPolyline);
            });
        });
        return routeCoordinates;
    } else {
        console.error('No routes found');
        return [];
    }
};

const fetchDirections = async (startAddress, endAddress) => {
    const url = `https://rsapi.goong.io/Direction?origin=${startAddress.lat},${startAddress.lng}&destination=${endAddress.lat},${endAddress.lng}&vehicle=car&api_key=${GOONG_API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.routes && data.routes.length > 0) {
            return processResponse(data);
        } else {
            console.error('No routes found');
            return [];
        }
    } catch (error) {
        console.error('Error fetching directions:', error);
        return [];
    }
};
export default fetchDirections;