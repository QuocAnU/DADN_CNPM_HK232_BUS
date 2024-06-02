import React, { useEffect } from 'react';
import goongjs from '@goongmaps/goong-js';
import '@goongmaps/goong-js/dist/goong-js.css';

const addMarker = (map, coordinates) => {
    const a = { lat: coordinates[1], lng: coordinates[0] }; // Correct lat/lng order
    new goongjs.Marker().setLngLat(a).addTo(map);
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

        const latlng = [lng / 1e5, lat / 1e5]; // Note the order: lng/lat
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

const convertToGeoJSON = (routeCoordinates) => {
    const geoJSON = {
        type: 'Feature',
        properties: {},
        geometry: {
            type: 'LineString',
            coordinates: routeCoordinates
        }
    };

    return geoJSON;
};

const addRouteLayer = (map, routeCoordinates) => {
    const geoJSON = convertToGeoJSON(routeCoordinates);

    if (map.isStyleLoaded()) {
        map.addSource('route', {
            type: 'geojson',
            data: geoJSON
        });

        map.addLayer({
            id: 'route',
            type: 'line',
            source: 'route',
            layout: {
                'line-join': 'round',
                'line-cap': 'round'
            },
            paint: {
                'line-color': '#000000',
                'line-width': 5
            }
        });
    } else {
        map.on('load', () => {
            map.addSource('route', {
                type: 'geojson',
                data: geoJSON
            });

            map.addLayer({
                id: 'route',
                type: 'line',
                source: 'route',
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': '#000000',
                    'line-width': 5
                }
            });
        });
    }
};

const MapWithDirections = ({ startAddress, endAddress }) => {
    useEffect(() => {
        goongjs.accessToken = 'zmriqrF5QScgd1LQ4yIxJ4itVMjQBsqFMxpkSeVG'; // Set your goong maptiles key here
        const map = new goongjs.Map({
            container: 'map', // Container ID
            style: `https://tiles.goong.io/assets/goong_light_v2.json?key=${goongjs.accessToken}`, // Map style
            center: [105.790168203000060, 21.046623224000029], // Tọa độ trung tâm
            zoom: 12 // Mức độ zoom ban đầu
        });

        fetchDirections(startAddress, endAddress)
            .then(routeCoordinates => {
                if (routeCoordinates.length > 0) {
                    addRouteLayer(map, routeCoordinates);

                    // Đánh dấu điểm đầu và điểm cuối
                    addMarker(map, routeCoordinates[0]); // Điểm đầu
                    addMarker(map, routeCoordinates[routeCoordinates.length - 1]); // Điểm cuối
                }
            });

        // Xóa bản đồ khi component bị xóa
        return () => map.remove();

    }, [startAddress, endAddress]);

    const fetchDirections = async (startAddress, endAddress) => {
        const url = `https://rsapi.goong.io/Direction?origin=${startAddress.lat},${startAddress.lng}&destination=${endAddress.lat},${endAddress.lng}&vehicle=car&api_key=IjDAiJRt75F1n7QSaKLAhzO5b4s1uAreTjS4Q53c`;

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

    return <div id="map" style={{ width: '100%', height: '1000px' }} />;
};

export default MapWithDirections;
