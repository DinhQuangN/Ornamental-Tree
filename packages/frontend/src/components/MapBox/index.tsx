import { Input } from 'antd'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import axios from 'axios'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from 'react-map-gl'

interface MapBoxProps {
  height: string
  sizeInput: SizeType
  onSearch: (value: string) => void
}

const MapBox = ({
  height = '60vh',
  sizeInput = 'large',
  onSearch,
}: MapBoxProps) => {
  const { t } = useTranslation('common', { keyPrefix: 'common.headerBottom' })
  const [viewPort, setViewPort] = useState({
    latitude: 21.2333817,
    longitude: 105.6416595,
    zoom: 13,
  })
  const fetchAddress = async () => {
    const data = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${
        viewPort.longitude
      },${viewPort.latitude}.json?access_token=${import.meta.env.VITE_MAPBOX}`,
      { withCredentials: false }
    )
    onSearch(data.data.features[0].place_name)
  }
  const handleSearch = async (value: string) => {
    const data = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?access_token=${
        import.meta.env.VITE_MAPBOX
      }`,
      { withCredentials: false }
    )
    onSearch(data.data.features[0].place_name)
    setViewPort({
      ...viewPort,
      longitude: data.data.features[0].center[0],
      latitude: data.data.features[0].center[1],
    })
  }
  return (
    <div id="bg-dark">
      <div className="shops" style={{ width: '500px' }}>
        <Input.Search
          onSearch={handleSearch}
          allowClear
          size={sizeInput}
          placeholder={t('search')}
          enterButton={t('search')}
        />
      </div>
      <div className="shops container">
        <ReactMapGL
          style={{ height: height }}
          initialViewState={{
            latitude: viewPort.latitude,
            longitude: viewPort.longitude,
            zoom: viewPort.zoom,
          }}
          mapboxAccessToken={import.meta.env.VITE_MAPBOX}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          onClick={(e) =>
            setViewPort({
              ...viewPort,
              latitude: e.lngLat.lat,
              longitude: e.lngLat.lng,
            })
          }
        >
          <div style={{ position: 'absolute', right: 10, top: 10, zIndex: 1 }}>
            <NavigationControl />
          </div>

          <Marker
            longitude={viewPort.longitude}
            latitude={viewPort.latitude}
            draggable
            onDragEnd={(e) =>
              setViewPort({
                ...viewPort,
                latitude: e.lngLat.lat,
                longitude: e.lngLat.lng,
              })
            }
          >
            <i
              className="fas fa-map-marker"
              style={{
                fontSize: '50px',
                color: 'red',
              }}
            ></i>
          </Marker>
          <div
            style={{
              right: 100,
              top: 200,
            }}
          ></div>
          <GeolocateControl
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
            onGeolocate={(e) => console.log(e)}
          />
        </ReactMapGL>
      </div>
    </div>
  )
}

export default MapBox
