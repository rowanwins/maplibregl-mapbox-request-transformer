This library provides a request transforming function enabling the consumption of MapboxGL Styles in MapLibreGL. 

By default Mapbox styles are referenced by, and include others to mapbox URLs such as `mapbox://styles/mapbox/satellite-streets-v11`, however MapLibreGL, since version 2, does not know how to handle these references. This library parsers the mapbox URL and converts into a valid http urls usable by MapLibreGL.

Also compatible with react-map-gl.

## Install
````
npm install maplibregl-mapbox-url-transformer --save
````

## Usage
````
import { isMapboxURL, transformMapboxUrl } from 'maplibregl-mapbox-url-transformer'

const mapboxKey = 'pk.123'

const transformRequest = (url: string, resourceType: string) => {
  if (isMapboxURL(url)) {
    return transformMapboxUrl(url, resourceType, mapboxKey)
  }
  
  // Do any other transforms you want
  return {url}
}

var map = new maplibregl.Map({
  container: 'map',
  center: [-122.420679, 37.772537],
  zoom: 13,
  style: 'mapbox://styles/mapbox/satellite-streets-v11',
  transformRequest
});
````

## Acknowledgements
This code was mostly taken and adpted from [here](https://github.com/maplibre/maplibre-gl-js/blob/04ff47d53ec16e17b92475fe9028c1477f6df02f/src/util/mapbox.ts).