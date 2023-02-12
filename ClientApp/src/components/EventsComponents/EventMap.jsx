import * as React from 'react';
import { MapContainer, TileLayer, Circle, Popup, Marker } from "react-leaflet";
import { useMapEvents, useMap } from 'react-leaflet/hooks'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import { useDispatch, useSelector } from 'react-redux'
import { coordinatesChange, addressChange, addressGetFromMap } from '../../store/map.js'

//formatam adresa frumos
const formatAddress = (json) => {
    let tourism = json.address.tourism ? json.address.toursim : '';
    let road = json.address.road ? json.address.road : '';
    let houseNumber = json.address.house_number ? json.address.house_number : '';
    let amenity = json.address.amenity ? json.address.amenity : '';
    return tourism + " " + amenity + " " + road + " " + houseNumber;
}

//o componenta externa ce returneaza nimic ,dar ofera functionalitatea sa putem da click pe harta
export const LocationMarker = () => {
    const dispatch = useDispatch();

   

    //cand dam clic schimbam coordonatele din state-ul global si apoi dam fetch 
    //pentru a primi adresa si spunem ca am luat adresa din harta
    const _map = useMapEvents({
        click(e) {
            const coordinates = {
                lat: e.latlng.lat,
                lng: e.latlng.lng
            }

            dispatch(coordinatesChange(coordinates));
            fetch("https://nominatim.openstreetmap.org/reverse?" + new URLSearchParams({
                format: 'jsonv2',
                lat: e.latlng.lat,
                lon: e.latlng.lng,
            }))
                .then(res => res.json().then(json => ({
                    headers: res.headers,
                    json
                })))
                .then(({ headers, json }) => {
                    dispatch(addressChange(formatAddress(json)))
                    dispatch(addressGetFromMap())
                })
                .catch((err) => console.log('Error!!!!' + err));

        },
    })

    return null
}

//ca sa se vada Marker-ul
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

//ca sa putem schimba centrul 
const ChangeCenter = (props) => {
    const map = useMap();
    map.setView(props.coords, 16);
    return null;
}

export const EventMap = (props) => {
    const { map } = useSelector(state => state.map)

    const zoom = 16;
    return (
        <MapContainer center={[map.latitude, map.longitude]} zoom={zoom} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
            <TileLayer
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
            />
            {props.type === 'details' ? (<Circle center={[map.latitude, map.longitude]} radius={20}>
                <Popup >
                    <div>
                        {map.address}
                    </div>
                </Popup>
            </Circle>) :
                <Marker position={[map.latitude, map.longitude]}>
                    <Popup >
                        <div>
                            Location of the event
                        </div>
                    </Popup>
                </Marker>}
            {props.type === 'details' ? (<LocationMarker />) : (null)}
            <ChangeCenter coords={[map.latitude, map.longitude]} />
        </MapContainer>)
}