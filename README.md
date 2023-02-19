This library provides a request transforming function enabling the consumption of MapboxGL Styles in MapLibreGL. 

By default Mapbox styles are referenced by, and include others to mapbox URLs such as `mapbox://styles/mapbox/satellite-streets-v11`, however MapLibreGL, since version 2, does not know how to handle these references. This library parsers the mapbox URL and converts into a valid http urls usable by MapLibreGL.

Also compatible with react-map-gl.

When upgrading from MapLibre v1 to >= v2 or react-map-gl, and using this transformer, be advised that Mapbox bills tile requests differently from your previous setup. Any library that is not Mapbox GL JS v1.x.x (or its direct fork MapLibre GL v1.x.x), is not anymore billed with Mapbox GL JS "Map Loads", which includes unlimited Vector Tiles API requests ([see pricing docs](https://docs.mapbox.com/mapbox-gl-js/guides/pricing/)). Rather, every (vector) tile request is billed individually. This could make hosting an often-visited map more expensive.

## Install
````
npm install maplibregl-mapbox-request-transformer --save
````

## Usage
````
import { isMapboxURL, transformMapboxUrl } from 'maplibregl-mapbox-request-transformer'

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
