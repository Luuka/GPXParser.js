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

declare class GpxParser {
  xmlSource: string
  metadata: MetaData
  waypoints: Waypoint[]
  tracks: Track[]
  routes: Route[]
  parse(xml: string): any
  getElementValue(element: Element, needle: string): any
}

export default GpxParser
