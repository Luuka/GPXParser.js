export type MetaData = {
  name: string
  desc: string
  link: string
  author: number
  time: Date
}

export type Waypoint = {
  name: string
  cmt: string
  desc: string
  lat: number
  lon: number
  ele: number
  time: Date
}

export type Track = {
  name: string
  cmt: string
  desc: string
  src: string
  number: string
  link: Link
  type: string
  points: Point[]
  distance: Distance
  elevation: Elevation
  slopes: number[]
}

export type Route = {
  name: string
  cmt: string
  desc: string
  src: string
  number: string
  link: string
  type: string
  points: Point[]
  distance: Distance
  elevation: Elevation
  slopes: number[]
}

export type Point = {
  lat: number
  lon: number
  ele: number
  time: Date
}

export type Distance = {
  total: number
  cumul: number
}

export type Elevation = {
  max: number
  min: number
  pos: number
  neg: number
  avg: number
}

export type Author = {
  name: string
  email: Email
  link: Link
}

export type Email = {
  id: string
  domain: string
}

export type Link = {
  href: string
  text: string
  type: string
}

export type GeoJSONFeature = {
  type: string
  geometry: {
      type: string
      coordinates: Point[]
  }
  properties: {
    name: any
    cmt: any
    desc: any
    src: any | null
    number: any | null
    link: any | null
    type: any | null
    sym: any | null
  }
}

export type GeoJSON = {
  type: string
  features: GeoJSONFeature[]
  properties: {
      name: any
      desc: any
      time: any
      author: any
      link: any
  }
}

export type ElevationObject = {
  max: any
  min: any
  pos: number | null
  neg: number | null
  avg: number | null
}

declare class GpxParser {
  xmlSource: string
  metadata: MetaData
  waypoints: Waypoint[]
  tracks: Track[]
  routes: Route[]
  parse(xml: string): any
  getElementValue(element: Element, needle: string): Element
  queryDirectSelector(element: Element, needle: string): Element
  calculDistance(points: Point[]): Distance
  calcDistanceBetween(wpt1: Point, wpt2: Point): number
  calcElevation(points: Point[]): ElevationObject
  calculSlope(points: Point[], cumul: number[]): number[]
  toGeoJSON(): GeoJSON
}

export default GpxParser
