import React, { useEffect, useState } from "react";
import "./ClockSlider.css";

const ClockSlider = ({ remainingTime, setRemainingTime }) => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    document
      .querySelector(".clockSlider")
      ?.addEventListener("mousedown", captureMouseEvents);
    document.addEventListener("mouseup", mouseupListener);
  }, []);

  useEffect(() => {
    setRotation((remainingTime * 360) / (60 * 60 * 1000));
  }, [remainingTime]);

  const captureMouseEvents = () => {
    document
      .querySelector(".App")
      .addEventListener("mousemove", mousemoveListener);
  };

  const mouseupListener = () => {
    document
      .querySelector(".App")
      .removeEventListener("mousemove", mousemoveListener);
  };

  const mousemoveListener = (evt) => {
    evt.preventDefault();
    setRemainingTime(-evt.movementX * 0.02 * 60 * 1000);
  };

  return (
    <div
      className="clockSlider"
      style={{
        transform: `rotateY(calc(${-rotation}deg)) translateZ(250px)`,
      }}
    >
      <div className="circle">
        {[...new Array(60).keys()].map((i) => {
          const tickRotation = (i * 6) % 360;
          return (
            <div
              className="tick"
              style={{
                transform: `rotateY(${tickRotation}deg) translateZ(250px)`,
                zIndex: `${
                  (tickRotation + rotation) % 360 > 270 ||
                  (tickRotation + rotation) % 360 < 90
                    ? 1
                    : -1
                }`,
              }}
            >
              <svg height="80" width="20">
                <line
                  x1="10"
                  y1={i % 5 === 0 ? "0" : "40"}
                  x2="10"
                  y2="80"
                  style={{
                    stroke: "rgb(255,255,255)",
                    strokeWidth: 5,
                  }}
                />
              </svg>
              {i % 5 === 0 && <span class="minute">{i}</span>}
            </div>
          );
        })}
        <div
          className="background"
          style={{
            transform: `rotateY(calc(${rotation}deg)) `,
          }}
        />
      </div>
    </div>
  );
};

export default ClockSlider;
