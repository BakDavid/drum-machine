// src/components/DrumPad.tsx
import { useEffect } from "react";

type DrumPadProps = {
    keyTrigger: string;
    url: string;
    id: string;
    onPlay: (id: string) => void;
};

export default function DrumPad({ keyTrigger, url, id, onPlay }: DrumPadProps) {
    const playSound = () => {
        const audio = document.getElementById(keyTrigger) as HTMLAudioElement;
        audio.currentTime = 0;
        audio.play();
        onPlay(id);
    };

    const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key.toUpperCase() === keyTrigger) playSound();
    };

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);
        return () => document.removeEventListener("keydown", handleKeyPress);
    }, []);

    return (
        <div id={id} className="drum-pad" onClick={playSound}>
            {keyTrigger}
            <audio id={keyTrigger} className="clip" src={url} />
        </div>
    );
}
