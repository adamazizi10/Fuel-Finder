export const getDomain = () => {
    return new URL(process.env.NODE_ENV === 'production'
        ? 'https://fuel-finder.vercel.app'
        : 'http://localhost:3000'
    )
}

export const  haversine = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371.0; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180.0;
    const dLon = (lon2 - lon1) * Math.PI / 180.0;
  
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180.0) * Math.cos(lat2 * Math.PI / 180.0) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
      
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c; // Distance in km
    return distance;
  }