import React, { useEffect, useState } from "react";
import "./Coin.css";
import headsImg from "../assets/images/heads.svg";
import tailsImg from "../assets/images/tails.svg";

const Coin = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0); // for locking rotation
  const [side, setSide] = useState("heads");
  const [showWinner, setShowWinner] = useState(false);

  useEffect(() => {
    if (!showWinner) return;
    const timer = setTimeout(() => {
      setShowWinner(false);
    }, 3000);

    return () => clearTimeout(timer); // cleanup on unmount
  }, [side]); // restart timer if side changes

  const handleFlip = () => {
    // Prevent multiple flips while one is in progress
    if (isSpinning) return;

    setIsSpinning(true);

    // Generate truly random result using crypto API if available
    const getRandomResult = () => {
      if (window.crypto && window.crypto.getRandomValues) {
        const array = new Uint32Array(1);
        window.crypto.getRandomValues(array);
        return array[0] % 2 === 0 ? "Heads" : "Tails";
      }
      // Fallback to Math.random() with additional randomness
      return Math.random() < 0.5 ? "Heads" : "Tails";
    };

    // Pre-determine the result for fairness
    const result = getRandomResult();

    // Create realistic spinning motion (multiple full rotations + final position)
    const baseRotations = 8 + Math.floor(Math.random() * 4); // 8-11 full spins
    const finalRotation = result === "Heads" ? 0 : 180;
    const totalRotation = baseRotations * 360 + finalRotation;

    // Set the spinning rotation immediately
    setRotation(totalRotation);

    // Variable duration for more natural feel (3-5 seconds)
    const duration = 3000 + Math.random() * 2000;

    setTimeout(() => {
      setSide(result);
      setShowWinner(true);
      setIsSpinning(false);
    }, duration);
  };

  return (
    <>
      <header className="flex justify-center items-center rounded-[5rem] shadow-sm shadow-green-500/75 ml-4 pl-4 mr-4 pr-4 mt-2 mb-2 pt-2 pb-2 font-extrabold">
        <h1 className="text-2xl font-gray-500">Click on Heads or Tails</h1>
      </header>

      <div className="flex justify-center items-center h-[85vh] w-auto">
        <div className="w-[150px] h-[150px] perspective-[1000px] m-[2px] p-[2px]">
          <div
            className={`coin ${isSpinning ? "spinning" : ""}`}
            style={{
              transform: isSpinning ? undefined : `rotateY(${rotation}deg)`,
            }}
          >
            <img src={headsImg} alt="Heads" className="front" />
            <img src={tailsImg} alt="Tails" className="back" />
          </div>

          <br />

          <div className="flex justify-between flex-col items-center h-[10vh] w-auto font-semibold">
            <button
              className="bg-red-500 shadow-md w-24 h-12 rounded-[5rem] cursor-pointer"
              onClick={handleFlip}
            >
              Heads
            </button>

            <br />

            <button
              className="bg-amber-300 rounded-[5rem] w-24 h-12 shadow-md cursor-pointer"
              onClick={handleFlip}
            >
              Tails
            </button>

            <br />

            {showWinner && <p>Winner: {side}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Coin;
