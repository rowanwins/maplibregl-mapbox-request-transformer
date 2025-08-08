This library provides a request transforming function enabling the consumption of MapboxGL Styles in MapLibreGL.

By default Mapbox styles are referenced by, and include others to mapbox URLs such as `mapbox://styles/mapbox/satellite-streets-v11`, however MapLibreGL, since version 2, does not know how to handle these references. This library parsers the mapbox URL and converts into a valid http urls usable by MapLibreGL.

Also compatible with react-map-gl.

## Install
````
npm install maplibregl-mapbox-request-transformer --save
````

## Usage
### For v12 mapbox styles
For v12 styles you can either use the built in style transformer
````
import {
  isMapboxURL,
  transformMapboxUrl,
  transformMapboxStyle
} from 'maplibregl-mapbox-request-transformer'

const mapboxKey = 'pk.123'

const transformRequest = (url: string, resourceType: string) => {
  if (isMapboxURL(url)) {
    return transformMapboxUrl(url, resourceType, mapboxKey)
  }
    return {url}
}

var map = new maplibregl.Map({
  container: 'map',
  center: [-122.420679, 37.772537],
  zoom: 13,
  transformRequest
});

// For V12 Styles you'll also need to add
map.setStyle('mapbox://styles/mapbox/streets-v12', {
   transformStyle: transformMapboxStyle
})
````
Or pass you can pass in `validateStyle: false` to the map options
````
import {
  isMapboxURL,
  transformMapboxUrl
} from 'maplibregl-mapbox-request-transformer'

const mapboxKey = 'pk.123'

const transformRequest = (url: string, resourceType: string) => {
  if (isMapboxURL(url)) {
    return transformMapboxUrl(url, resourceType, mapboxKey)
  }
    return {url}
}

var map = new maplibregl.Map({
  container: 'map',
  center: [-122.420679, 37.772537],
  zoom: 13,
  style: 'mapbox://styles/mapbox/streets-v12'
  transformRequest,
  validateStyle: false,
});

````

### For < v12 mapbox styles
````
import { isMapboxURL, transformMapboxUrl } from 'maplibregl-mapbox-request-transformer'

const mapboxKey = 'pk.123'

const transformRequest = (url: string, resourceType: string) => {
  if (isMapboxURL(url)) {
    return transformMapboxUrl(url, resourceType, mapboxKey)
  }
  return {url}
}

var map = new maplibregl.Map({
  container: 'map',
  center: [-122.420679, 37.772537],
  zoom: 13,
  style: 'mapbox://styles/mapbox/streets-v11'
  transformRequest
});

````

## Notes on Mapbox Pricing
When upgrading from MapLibre v1 to >= v2 or react-map-gl, and using this transformer, be advised that Mapbox bills tile requests using their Vector Tiles API requests. A standard Mapbox GL JS application is billed using the Map Loads API, which includes unlimited Vector Tiles API requests ([see pricing docs](https://docs.mapbox.com/mapbox-gl-js/guides/pricing/)). This billing difference could make hosting an often-visited map more expensive. As of Feb 2023 Mapbox offers 200,000 monthly tile requests on their free tier (see their [pricing page](https://www.mapbox.com/pricing#vector-tiles-api) for current details).

## Acknowledgements
This code was mostly taken and adpted from [here](https://github.com/maplibre/maplibre-gl-js/blob/04ff47d53ec16e17b92475fe9028c1477f6df02f/src/util/mapbox.ts).
