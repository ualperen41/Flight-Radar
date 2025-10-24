import { useDispatch, useSelector } from "react-redux";
import Head from "./head";
import { useEffect } from "react";
import { getDetails } from "../../redux/actions";
import Loader from "../loader";
import Airport from "./airport";
import Aircraft from "./aircraft";
import Gallery from "./gallery";
import Time from "./time";

const Modal = () => {
  const { flightId, isLoading, error, info } = useSelector(
    (store) => store.detail
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!flightId) return;
    dispatch(getDetails(flightId));
  }, [flightId]);

  // flightId state'i boş ise modalı gösterme
  if (!flightId) return;

  return (
    <div className="detail-modal">
      <div className="modal-inner">
        <Head isLoading={isLoading} error={error} info={info} />

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Error message={error} />
        ) : (
          info && (
            <div className="info-wrapper">
              <div className="info-box">
                <div>
                  <Gallery images={info.aircraft.images} />
                  <Airport airportData={info.airport} />
                  <Time timeData={info.time} />
                </div>

                <Aircraft AircraftData={info.aircraft} />
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Modal;
