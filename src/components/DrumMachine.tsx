// src/components/DrumMachine.tsx
import { useState } from "react";
import { drumData } from "./data/DrumPad";
import DrumPad from "./DrumPad";
import Display from "./Display";

export default function DrumMachine() {
    const [displayText, setDisplayText] = useState("Push a button..."); // Default text
    const [volume, setVolume] = useState(0.5); // Default volume
    const [isPowerOn, setIsPowerOn] = useState(true); // Power toggle

    const updateDisplay = (text: string) => {
        if (isPowerOn) setDisplayText(text); // Only update display if power is on
    };

    const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(event.target.value);
        setVolume(newVolume);
        updateDisplay(`Volume: ${Math.round(newVolume * 100)}`);
    };

    const togglePower = () => {
        setIsPowerOn(!isPowerOn);
        setDisplayText(isPowerOn ? "Drum is turned off" : "Drum is turned on"); // Show power state in display
    };

    return (
        <div id="drum-machine">
            <Display text={displayText} />
            <div className="controls">
                <button
                    onClick={togglePower}
                    className={`power-btn ${isPowerOn ? "on" : "off"}`}
                >
                    {isPowerOn ? "Turn Off" : "Turn On"}
                </button>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="volume-slider"
                />
            </div>
            <div className="pad-bank">
                {drumData.map((pad) => (
                    <DrumPad
                        key={pad.id}
                        keyTrigger={pad.key}
                        url={pad.url}
                        id={pad.id}
                        volume={volume}
                        isPowerOn={isPowerOn}
                        onPlay={updateDisplay}
                    />
                ))}
            </div>
        </div>
    );
}
