// src/components/DrumMachine.tsx
import { useState } from "react";
import { drumData } from "./data/DrumPad";
import DrumPad from "./DrumPad";
import Display from "./Display";

export default function DrumMachine() {
    const [displayText, setDisplayText] = useState("");

    const updateDisplay = (text: string) => {
        setDisplayText(text);
    };

    return (
        <div id="drum-machine">
            <Display text={displayText} />
            <div className="pad-bank">
                {drumData.map((pad) => (
                    <DrumPad
                        key={pad.id}
                        keyTrigger={pad.key}
                        url={pad.url}
                        id={pad.id}
                        onPlay={updateDisplay}
                    />
                ))}
            </div>
        </div>
    );
}
