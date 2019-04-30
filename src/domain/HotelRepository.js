import geolib from "geolib";

import Rakuten from "../lib/Rakuten";

const APP_ID = "";

export const searchByLocation = location => {
  const params = {
    applicationId: APP_ID,
    datumType: 1,
    latitude: location.lat,
    longitude: location.lng
  };
  return Rakuten.Travel.simpleHotelSearch(params).then(result => 
     result.data.hotels.map(hotel => {
       const basicInfo = hotel.hotel[0].hotelBasicInfo;
       const price = basicInfo.hotelMinCharge;
       const distance = geolib.getDistance(
         { latitude: location.lat, longitude: location.lng },
         { latitude: basicInfo.latitude, longitude: basicInfo.latitude}
       );
      return {
        id: basicInfo.hotelNo,
        name: basicInfo.hotelName,
        url: basicInfo.hotelInformationUrl,
        thumbUrl: basicInfo.hotelThumbnailUrl,
        price: price ? `${price}円` : "空室なし",
        reviewAverage: basicInfo.reviewAverage,
        reviewCount: basicInfo.reviewCount,
        distance
      };
    }),
  );
};
