import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


const LocateUs = () => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);

    useEffect(() => {
        if (mapRef.current) return;

        mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;


        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [101.62130949718583, 3.0460596462300527],
            zoom: 16, //zoomlevel
        });

        // marker for shop location
        const marker = new mapboxgl.Marker()
            .setLngLat([101.62130949718583, 3.0460596462300527])
            .addTo(mapRef.current);

        marker.setPopup(new mapboxgl.Popup().setText('Your Shop Location'));
    }, []);

    return (
        <div className="locate-us-container">
            <div
                ref={mapContainerRef}
                className="map-container w-full h-lvh rounded-lg shadow-md"
            ></div>
        </div>
    );
};

export default LocateUs;
