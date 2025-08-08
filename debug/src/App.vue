<template>
  <div id="map"></div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'

import { Map, ResourceType, RequestTransformFunction, TransformStyleFunction } from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

import {
  isMapboxURL,
  transformMapboxUrl,
  transformMapboxStyle
} from '../../src/index'

const mapboxKey = import.meta.env.VITE_APP_MAPBOX_API_KEY

function transformRequest (url: string, resourceType?: ResourceType) {
  if (isMapboxURL(url)) {
    return transformMapboxUrl(url, resourceType, mapboxKey)
  }
  return {url}
}

onMounted(() => {
  const map = new Map({
    container: 'map',
    zoom: 15,
    center: [-105.00284, 39.72524],
    style: 'mapbox://styles/mapbox/satellite-streets-v12',
    transformRequest: transformRequest as RequestTransformFunction,
    validateStyle: false
  })

  // map.setStyle('mapbox://styles/mapbox/streets-v12', {
  //  transformStyle: transformMapboxStyle as TransformStyleFunction
  // })
})
</script>

<style scoped>
#map {
  height: 700px;
  width: 700px;
}
</style>
