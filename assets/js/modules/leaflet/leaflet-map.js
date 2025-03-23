/* global L */
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
const tile = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'

document.querySelectorAll('div.leaflet-map').forEach(map => {
  const title = map.getAttribute('data-leaflet-view-title')
  const zoom = map.getAttribute('data-leaflet-view-zoom')
  const popup = map.getAttribute('data-leaflet-popup-caption')
  const popupLat = map.getAttribute('data-leaflet-popup-lat')
  const popupLong = map.getAttribute('data-leaflet-popup-long')
  const view = [popupLat, popupLong]

  if (popupLat === null || popupLong === null || zoom === null) {
    console.error('leaflet-map.js: expected lat, long, and zoom')
  } else {
    const bind = L.map(map).setView(view, zoom)
    L.tileLayer(tile, { attribution }).addTo(bind)

    if (popupLat !== null && popupLong !== null && popup !== null) {
      const popupContent = `
      <strong>${title}</strong><br>
      ${popup}<br>
    `
      L.marker([popupLat, popupLong]).addTo(bind)
        .bindPopup(popupContent)
        .openPopup()
    }
  }
})
