// src/components/Display.tsx
type DisplayProps = {
    text: string;
};

export default function Display({ text }: DisplayProps) {
    return <div id="display">{text}</div>;
}
