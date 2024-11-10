// src/components/DrumPad.tsx
import { useEffect, useState } from "react";

type DrumPadProps = {
    keyTrigger: string;
    url: string;
    id: string;
    volume: number;
    isPowerOn: boolean;
    onPlay: (id: string) => void;
};

export default function DrumPad({
    keyTrigger,
    url,
    id,
    volume,
    isPowerOn,
    onPlay,
}: DrumPadProps) {
    const [isActive, setIsActive] = useState(false);

    const playSound = () => {
        if (!isPowerOn) return; // Do nothing if power is off

        const audio = document.getElementById(keyTrigger) as HTMLAudioElement;
        audio.volume = volume; // Set the volume
        audio.currentTime = 0;
        audio.play();
        onPlay(id);
        setIsActive(true);
        setTimeout(() => setIsActive(false), 100); // Deactivate after 100ms
    };

    const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key.toUpperCase() === keyTrigger) playSound();
    };

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);
        return () => document.removeEventListener("keydown", handleKeyPress);
    }, [isPowerOn, volume]);

    return (
        <div
            id={id}
            className={`drum-pad ${isActive ? "active" : ""}`}
            onClick={playSound}
        >
            {keyTrigger}
            <audio id={keyTrigger} className="clip" src={url} />
        </div>
    );
}
