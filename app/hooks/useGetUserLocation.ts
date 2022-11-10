import React, { useState, useEffect } from "react";
import * as Location from "expo-location";

export const useGetUserLocation = () => {
  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [address, setAddress] = useState<any>(null);

  async function getLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permissões para acessar localização negadas");
      return;
    }

    const locationResult = await Location.getCurrentPositionAsync({});
    setLocation(locationResult);
    if (locationResult) {
      const addressResult = await Location.reverseGeocodeAsync(
        locationResult.coords
      );
      setAddress(addressResult);
    }
  }
  useEffect(() => {
    getLocation();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  return { location, text, address };
};
