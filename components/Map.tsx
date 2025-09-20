"use client";

import Image from "next/image";

import { APIProvider, AdvancedMarker, Map } from "@vis.gl/react-google-maps";
import React from "react";

import MapPinIcon from "@/assets/icn_map_pin.svg";

type GoogleMapProps = {
  center: { lat: number; lng: number };
  key?: string;
  style?: React.CSSProperties;
  zoom?: number;
};

function GoogleMap({
  center,
  key,
  style = { width: "100%", height: "500px" },
  zoom = 5,
}: GoogleMapProps) {
  return (
    <div className="w-full">
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
        <Map
          mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
          defaultCenter={center}
          defaultZoom={zoom}
          gestureHandling="greedy"
          disableDefaultUI
          style={style}
        >
          <AdvancedMarker key={key} position={center}>
            <Image src={MapPinIcon} alt="map pin icon" width={96} />
          </AdvancedMarker>
        </Map>
      </APIProvider>
    </div>
  );
}

export default GoogleMap;
