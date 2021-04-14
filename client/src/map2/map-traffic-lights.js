// @ts-nocheck
/*!
 * Traffic Light Viewer
 */

import * as maptalks from 'maptalks'

import extent from './map-extent'
import mapService from '../service/map-service'

import signalGroups from '@/config/junction-config'

const addLayerTo = map => name => new maptalks.VectorLayer(name, [], {}).addTo(map)

const { log } = console

function makeGroupPolygon (group) {
  const geometry = new maptalks.Polygon(
    group.features.geometry.coordinates
    , {
      visible: true,
      editable: true,
      cursor: 'pointer',
      shadowBlur: 0,
      shadowColor: 'black',
      draggable: false,
      dragShadow: false, // display a shadow during dragging
      drawOnAxis: null, // force dragging stick on a axis, can be: x, y
      symbol: {
        lineColor: '#34495e',
        lineWidth: 2,
        polygonFill: group.properties.color,
        polygonOpacity: 0.2
      }
    })
  geometry.properties = group.properties
  return geometry
}

const [SA101, SA107, SA111] = signalGroups.map(value => {
  return {
    junctions: value.properties.junctions,
    color: value.properties.color
  }
})

const groupColor = (nodeId) => {
  let color = 'grey'
  if (SA101.junctions.includes(nodeId)) {
    color = SA101.color
  }
  if (SA107.junctions.includes(nodeId)) {
    color = SA107.color
  }
  if (SA111.junctions.includes(nodeId)) {
    color = SA111.color
  }
  return color
}

function makeLinkLine (link) {
  return new maptalks.LineString(link.geometry, {
    linkId: link.LINK_ID,
    isForward: link.isForward,
    arrowStyle: [2, 2],
    arrowPlacement: 'vertex-last',
    visible: true,
    editable: true,
    cursor: null,
    shadowBlur: 0,
    shadowColor: 'black',
    draggable: false,
    dragShadow: false,
    drawOnAxis: null,
    symbol: {
      lineColor: '#1bbc9b',
      lineWidth: 3
    }
  })
}

async function getLinkIds (map, { properties }) {
  const nodeId = properties.NODE_ID
  const { features } = await mapService.getLinks(extent(map))
  const filtered = features.filter(
    feature =>
      feature.properties.ED_ND_ID === nodeId ||
      feature.properties.ST_ND_ID === nodeId
  )

  return filtered.map((feature) => {
    const { properties, geometry } = feature
    const { ST_ND_ID } = properties

    properties.isForward = (ST_ND_ID === nodeId)

    return {
      LINK_ID: properties.LINK_ID,
      LANE: properties.LANE,
      // geometry: geometry.coordinates[0], // from MultiLineString
      geometry: geometry.coordinates,
      isForward: properties.isForward || false
    }
  })
}

export default function SaltTrafficLightsLoader (map, element, events) {
  const addLayer = addLayerTo(map)
  const trafficLightsLayer = addLayer('trafficLightsLayer')
  const linkLayer = addLayer('tmpLinkLayer')
  const signalGroupLayer = addLayer('signalGroupLayer')

  new maptalks.control.Toolbar({
    position: 'top-left',
    items: [{
      item: 'Toggle Signal Group',
      click: () => toggleGroupLayer()
    }]
  })
    .addTo(map)

  const groups = signalGroups.map(group => {
    const area = makeGroupPolygon(group)
    area.on('click', (e) => {
      events.$emit('signalGroup:clicked', e.target.properties)
    })
    return area
  })

  signalGroupLayer.addGeometry(groups)

  const editConnection = async (target) => {
    const { owner } = target
    const [x, y] = owner.toGeoJSONGeometry().coordinates
    const linkIds = await getLinkIds(map, target.owner)

    const junction = { id: owner.properties.NODE_ID, x, y }

    const lines = linkIds.map(link => makeLinkLine(link))

    linkLayer.addGeometry(lines)
    map.addLayer(linkLayer)
    events.$emit('junction:selected', {
      junction,
      linkIds
    })
  }

  const deleteConnection = (target) => {
    const { owner } = target
    const [x, y] = owner.toGeoJSONGeometry().coordinates

    events.$emit('junction:delete', {
      id: owner.properties.NODE_ID,
      x,
      y
    })
  }
  const selectConnection = async (target) => {
    const linkIds = await getLinkIds(map, target.owner)

    const lines = linkIds.map(makeLinkLine)

    linkLayer.addGeometry(lines)
    map.addLayer(linkLayer)
  }

  function makeTrafficLight (feature, color) {
    const trafficLight = new maptalks.Marker(feature.geometry.coordinates, {
      symbol: [
        {
          markerType: 'ellipse',
          markerFill: color,
          markerFillOpacity: 0.6,
          markerWidth: 15,
          markerHeight: 15,
          markerLineWidth: 2
        }
      ]
    })
      .on('click', async (e) => {
        const target = e.target
        if (!target) {
          return
        }
        events.$emit('junction:clicked', {
          nodeId: target.properties.NODE_ID,
          coordinates: target.toGeoJSONGeometry().coordinates
        })
      })
      .on('mouseenter', (e) => {
        e.target.updateSymbol({
          textName: feature.properties.CROSS_NM,
          textSize: 20,
          markerFillOpacity: 1,
          textFaceName: 'sans-serif',
          textHaloFill: '#fff',
          textHaloRadius: 15
        })
        e.target.bringToFront()
      }).on('mouseout', (e) => {
        e.target.updateSymbol({
          markerFillOpacity: 0.7,
          textName: ''
        })
      })
      .setMenu({
        items: [
          {
            item: `편집(${feature.properties.NODE_ID.substring(0, 10)})`,
            click: editConnection
          },
          {
            item: '삭제',
            click: deleteConnection
          },
          {
            item: '선택',
            click: selectConnection
          }
        ]
      })
      .openMenu()

    trafficLight.properties = feature.properties
    return trafficLight
  }

  async function load () {
    if (!trafficLightsLayer.isVisible()) {
      return
    }
    const { features } = await mapService.getTrafficLights(extent(map))
    trafficLightsLayer.clear()
    const geometries = features.map((feature) => {
      const color = groupColor(feature.properties.NODE_ID)

      const trafficLight = makeTrafficLight(feature, color)
      return trafficLight
    })
    trafficLightsLayer.addGeometry(geometries)
  }

  const show = () => trafficLightsLayer.show()
  const hide = () => trafficLightsLayer.hide()

  const toggleGroupLayer = () => {
    if (signalGroupLayer.isVisible()) {
      signalGroupLayer.hide()
    } else {
      signalGroupLayer.show()
    }
  }

  const options = {
    animation: true,
    color: ['Red', 'Blue', 'Green', 'Yellow'],
    p: ['▖', '▘', '▝', '▗', '▗'],
    font: '20px san-serif'
  }

  class OptStatusLayer extends maptalks.Layer {
    constructor (id, data, options) {
      super(id, options)
      this.data = data
    }

    setData (data) {
      this.data = data
      return this
    }

    getData () {
      return this.data
    }
  }

  OptStatusLayer.mergeOptions(options)

  class OptStatusLayerRenderer extends maptalks.renderer.CanvasRenderer {
    checkResources () {
      return []
    }

    draw () {
      const colors = this.layer.options.color
      const now = Date.now()
      const rndIdx = Math.round(now / 300 % colors.length)
      const color = colors[rndIdx]
      const p = this.layer.options.p[rndIdx]
      const drawn = this._drawData(this.layer.getData(), color, p)
      this._drawnData = drawn
      this.completeRender()
    }

    drawOnInteracting (evtParam) {
      if (!this._drawnData || this._drawnData.length === 0) {
        return
      }
      const colors = this.layer.options.color
      const now = Date.now()
      const rndIdx = Math.round(now / 300 % colors.length)
      const color = colors[rndIdx]
      this._drawData(this._drawnData, color)
    }

    onSkipDrawOnInteracting () { }

    needToRedraw () {
      if (this.layer.options.animation) {
        return true
      }
      return super.needToRedraw()
    }

    _drawData (data, color, p) {
      if (!Array.isArray(data)) {
        return
      }
      const map = this.getMap()
      this.prepareCanvas()
      const ctx = this.context
      ctx.fillStyle = color
      ctx.font = this.layer.options.font

      const containerExtent = map.getContainerExtent()
      const drawn = []
      data.forEach(d => {
        const point = map.coordinateToContainerPoint(new maptalks.Coordinate(d.coord))
        if (!containerExtent.contains(point)) {
          return
        }
        const text = d.text + p
        const len = ctx.measureText(text)
        ctx.fillText(text, point.x - len.width / 2, point.y)
        drawn.push(d)
      })

      return drawn
    }
  }

  OptStatusLayer.registerRenderer('canvas', OptStatusLayerRenderer)
  const layer = new OptStatusLayer('hello')

  function setOptJunction (junctionId) {
    const tlayer = map.getLayer('trafficLightsLayer')
    tlayer.getGeometries().forEach(g => {
      if (g.properties.NODE_ID === junctionId) {
        layer.setData([
          {
            coord: g.getCoordinates().add(0.00, 0.0003).toArray(),
            text: '최적화 중 '
          }
        ])
      }
    })
    layer.addTo(map)
  }
  function clearOptJunction () {
    layer.setData([])
  }

  map.on('zoomend moveend', load)

  return {
    load,
    show,
    hide,
    toggleGroup: toggleGroupLayer,
    setOptJunction,
    clearOptJunction
  }
}
