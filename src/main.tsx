import React, { useRef, useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import Map from "@arcgis/core/Map"
import MapView from "@arcgis/core/views/MapView"
import Point from "@arcgis/core/geometry/Point"
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer"
import * as intl from "@arcgis/core/intl.js";
// import SGSTileLayer from "@arcgis/core/"

import Locate from "@arcgis/core/widgets/Locate"
import CoordinateConversion from "@arcgis/core/widgets/CoordinateConversion"

// layer
import { Land } from './layers/Land';

const MainMap = () => {

  const mapDiv = useRef(null);

  useEffect(() => {
    intl.setLocale("zh-tw");

    if (mapDiv.current) {
      // 1. 加入底圖
      const map = new Map({
        // basemap: "topo-vector",
        // basemap: "streets-relief-vector",
        basemap: "gray-vector", // 灰，風格不錯
        // basemap: "dark-gray-vector", // 全黑，風格不錯
        // basemap: "oceans", // 土地是白的，方便看清楚其他資訊
        // layers: [graphicsLayer]
      })

      // 2. 加入地籍底圖
      map.add(Land.layer);

      // const geojsonLayer = new GeoJSONLayer({
      //   url: "https://kiang.github.io/taiwan_basecode/city/city.topo.json",
      //   copyright: "kiang.github.io",
      //   // popupTemplate: template
      // });
      // map.add(geojsonLayer);

      // 5. 顯示畫面
      const view = new MapView({
        container: mapDiv.current,
        map: map,
        zoom: 10,
        // center: [118.7441, 23.8160], // 本專案使用的中心點座標，台灣本島放置於右方，其他資訊放置於其他位置
        center: [120.919, 24.230], // 本專案使用的中心點座標，台灣本島放置於右方，其他資訊放置於其他位置
        // center: [120.57889244754534, 24.159856487625685],
        // center: [-121.995, 45.241],
        // center: [120.57889244754534, 24.159856487625685]
      });

      view.ui.add(new Locate({
        view: view,   // Attaches the Locate button to the view
      }), "top-right");

      view.ui.add(new CoordinateConversion({
        view: view
      }), "bottom-left");
    }
  }, []);

  return <div className="mapDiv" ref={mapDiv} style={{ padding: '0px 10px', position: 'fixed' }}></div>;
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <MainMap />
)
