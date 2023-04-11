import { useRef, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import Map from "@arcgis/core/Map"
import MapView from "@arcgis/core/views/MapView"
import * as intl from "@arcgis/core/intl.js";
// import SGSTileLayer from "@arcgis/core/"

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
        basemap: "gray-vector", // 灰，風格不錯
        // basemap: "dark-gray-vector", // 全黑，風格不錯
        // basemap: "oceans", // 土地是白的，方便看清楚其他資訊
      })

      // 2. 加入地籍底圖
      map.add(Land.layer);

      // 5. 顯示畫面
      const view = new MapView({
        container: mapDiv.current,
        map: map,
        zoom: 10,
        center: [120.919, 24.230], // 本專案使用的中心點座標，顯示台中
        // center: [118.7441, 23.8160], // 台灣本島放置於右方，其他資訊放置於其他位置
      });

      view.ui.add(new CoordinateConversion({
        view: view
      }), "top-right");
    }
  }, []);

  return <div className="mapDiv" ref={mapDiv} style={{ padding: '0px 10px', position: 'fixed' }}></div>;
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <MainMap />
)
