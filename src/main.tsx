import "leaflet/dist/leaflet.css";

import React from 'react'
import ReactDOM from 'react-dom/client'
// import ReactDOM from 'react-dom/client'
import './index.css'
// import "https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
import L from "leaflet";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const MainPage = () => {

  // const position: L.LatLngExpression = [25.03418, 121.564517]

  // return (
  //   <MapContainer center={position} zoom={8} scrollWheelZoom={false} >
  //     <TileLayer
  //       attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  //       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  //     />
  //     <Marker position={position}>
  //       <Popup>
  //         A pretty CSS3 popup. <br /> Easily customizable.
  //       </Popup>
  //     </Marker>
  //   </MapContainer >
  // )

  const mymap = L.map("mapid").setView([25.03418, 121.564517], 17);

  const OSMUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  L.tileLayer(OSMUrl).addTo(mymap);

  // 使用 leaflet-color-markers ( https://github.com/pointhi/leaflet-color-markers ) 當作 marker
  const greenIcon = new L.Icon({
    iconUrl:
      "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const marker = L.marker([25.03418, 121.564517], { icon: greenIcon }).addTo(
    mymap
  );

  marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

  L.circle([25.03418, 121.564517], {
    color: "red",
    fillColor: "#f03",
    fillOpacity: 0.5,
    radius: 10
  }).addTo(mymap);

  return <div id="mapid" style={{ height: "100vh", width: "100vw" }} />;

}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <MainPage />
)
