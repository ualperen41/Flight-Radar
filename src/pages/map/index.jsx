import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { getIcon } from "../../utils/helpers";
import { open } from "../../redux/slices/detailSlice";
import AirportMarker from "../../components/marker/airport-marker";

import { getFlights } from "../../redux/actions";
const Map = () => {
  const dispatch = useDispatch();
  const { flights } = useSelector((store) => store.flight);
  const { isLoading, info, route } = useSelector((store) => store.detail);
  // useEffect(() => {
  //   const id = setInterval(() => dispatch(getFlights()), 5000);
  //   // //   /// kullanıcı bu sayfadan ayrılınca intervalı durdur
  //   return () => clearInterval(id);
  // }, []);
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

      {/*  Kalkış Noktasını İşaretle  */}
      {!isLoading && info && (
        <AirportMarker info={info?.airport?.origin} title={"Kalkış"} />
      )}
      {/*  Varış Noktasını İşaretle  */}
      {!isLoading && info && (
        <AirportMarker info={info?.airport?.destination} title={"Varış"} />
      )}
      {/*  Uçağın rotasını çiz  */}
      {!isLoading && route && (
        <Polyline positions={route} pathOptions={{ color: "red" }} />
      )}
      {/*  Uçakları Listele  */}
      {flights.map((flight) => (
        <Marker
          position={[flight.lat, flight.lon]}
          icon={getIcon(
            flight.direction,
            flight.flightId === info?.identification?.id,
            info?.identification?.id
          )}
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
