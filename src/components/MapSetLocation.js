import React, { useRef } from "react";
import { Feature, Map, Overlay, View } from "ol/index.js";
import { OSM, Vector as VectorSource } from "ol/source.js";
import { Point } from "ol/geom.js";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer.js";
import { useGeographic } from "ol/proj.js";

function formatCoordinate(coordinate) {
  return `
    <table>
      <tbody>
        <tr><th>lon</th><td>${coordinate[0].toFixed(2)}</td></tr>
        <tr><th>lat</th><td>${coordinate[1].toFixed(2)}</td></tr>
      </tbody>
    </table>`;
}

function MapSetLocation(props) {
  useGeographic();
  let infoRef = useRef();
  let popupRef = useRef();

  const place = [-110, 45];

  const point = new Point(place);

  const map = new Map({
    target: props.id,
    view: new View({
      center: place,
      zoom: 8,
    }),
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
      new VectorLayer({
        source: new VectorSource({
          features: [new Feature(point)],
        }),
        style: {
          "circle-radius": 9,
          "circle-fill-color": "red",
        },
      }),
    ],
  });

  const element = document.getElementById("popup");

  const popup = new Overlay({
    element: element,
    stopEvent: false,
  });
  map.addOverlay(popup);

  const info = document.getElementById("info");
  map.on("moveend", function () {
    const view = map.getView();
    const center = view.getCenter();
    info.innerHTML = formatCoordinate(center);
  });

  // const onMoveEndMap = () => {
  //   const view = map.getView();
  //   const center = view.getCenter();
  //   info.innerHTML = formatCoordinate(center);
  // };

  let popover;
  const onClickMap = (event) => {
    if (popover) {
      popover.dispose();
      popover = undefined;
    }
    const feature = map.getFeaturesAtPixel(event.pixel)[0];
    if (!feature) {
      return;
    }
    const coordinate = feature.getGeometry().getCoordinates();
    popup.setPosition([
      coordinate[0] + Math.round(event.coordinate[0] / 360) * 360,
      coordinate[1],
    ]);

    // popover = new bootstrap.Popover(element, {
    //   container: element.parentElement,
    //   content: formatCoordinate(coordinate),
    //   html: true,
    //   offset: [0, 20],
    //   placement: "top",
    //   sanitize: false,
    // });
    // popover.show();
  };

  const onPointerMoveMap = (event) => {
    const type = map.hasFeatureAtPixel(event.pixel) ? "pointer" : "inherit";
    map.getViewport().style.cursor = type;
  };
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: "13vw",
          left: "14vw",
          zIndex: "10",
        }}
      >
        <i
          class="bi bi-geo-alt-fill"
          style={{ fontSize: "2vw", color: "blue" }}
        ></i>
      </div>

      <div
        id={props.id}
        className="map"
        style={{ width: "30vw", height: "30vw" }}
        onPointerMove={(e) => onPointerMoveMap(e)}
        onClick={onClickMap}
        // onMoveEnd={onMoveEndMap}
      >
        <div id="popup"></div>
      </div>
      <div id="info"></div>
    </div>
  );
}

export default MapSetLocation;
