import { ResourceType } from 'maplibre-gl';
import { StyleSpecification, RequestParameters } from 'maplibre-gl'

export function isMapboxURL(url: string): boolean;

export function transformMapboxUrl(url: string, resourceType?: ResourceType, accessToken?: string): RequestParameters

export function transformMapboxStyle(_previousStyle: StyleSpecification, nextStyle: StyleSpecification): StyleSpecification
