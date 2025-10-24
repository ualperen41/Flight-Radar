import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { getIcon } from "../../utils/helpers";
import { open } from "../../redux/slices/detailSlice";
const Map = () => {
  const dispatch = useDispatch();
  const { isLoading, error, flights } = useSelector((store) => store.flight);
  return (
    <MapContainer
      center={[38.957334, 35.404276]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {flights.map((flight) => (
        <Marker
          position={[flight.lat, flight.lon]}
          icon={getIcon(flight.direction)}
        >
          <Popup>
            <div className="popup">
              <span>Kod: {flight.callsign}</span>
              <button onClick={() => dispatch(open(flight.flightId))}>
                Detay
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
