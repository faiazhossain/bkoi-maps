export const MAP_API_ACCESS_TOKEN =
  process.env.NEXT_PUBLIC_MAP_API_ACCESS_TOKEN || "";

export const LOCAL_BASE_URL = "http://maps.barikoi.com" || "";
// http://maps.barikoi.com/?place=OCTV3052#12.58/24.1907/90.41679
// export const LOCAL_BASE_URL = "http://localhost:3000/" || "";

export const API = {
  // AUTOCOMPLETE: `https://barikoi.xyz/v1/api/search/autocomplete/${MAP_API_ACCESS_TOKEN}/place?q=`,
  AUTOCOMPLETE: `https://elastic.bmapsbd.com/test/autocomplete/search?q=`,
  REVERSE_GEO: `https://api.admin.barikoi.com/api/v2/search/reverse/geocode?`,
  // SEARCH_BY_CODE: `https://api.bmapsbd.com/place/`,
  SEARCH_BY_CODE: `https://api.admin.barikoi.com/api/v2/place/without/auth`,
  RUPANTOR: `https://barikoi.xyz/v2/api/search/rupantor/geocode?api_key=${MAP_API_ACCESS_TOKEN}`,
  NEARBY_URL: `https://elastic.bmapsbd.com/test/parse/search`,
  USAGE_DATA: `https://api.bmapsbd.com/insert-search-log`,
  
  // Layers
  DEFAULT_LAYER: `https://map.barikoi.com/styles/osm-liberty/style.json?key=${MAP_API_ACCESS_TOKEN}`,
  DARK_LAYER: `https://map.barikoi.com/styles/barikoi-dark/style.json?key=${MAP_API_ACCESS_TOKEN}`,
  BANGLA_LAYER: `https://map.barikoi.com/styles/barikoi-bangla/style.json?key=${MAP_API_ACCESS_TOKEN}`,
  TRAVEL_LAYER: `https://travel.map.barikoi.com/styles/barikoi/style.json?key=${MAP_API_ACCESS_TOKEN}`
};
