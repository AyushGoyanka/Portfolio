import { useRef, useState } from 'react';
import SafeImage from './SafeImage';

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export default function HeroArtwork({
  imageSrc = '/images/developer-ai-workspace.png',
  imageAlt = 'Futuristic developer laptop with code and an illuminated neural network',
}) {
  const artworkRef = useRef(null);
  const pointerRef = useRef({ id: null, x: 0, y: 0 });
  const rotationRef = useRef({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const paintRotation = (x, y) => {
    const nextX = clamp(x, -14, 14);
    const nextY = clamp(y, -10, 10);
    rotationRef.current = { x: nextX, y: nextY };
    artworkRef.current.style.setProperty('--artwork-x', `${nextX}deg`);
    artworkRef.current.style.setProperty('--artwork-y', `${nextY}deg`);
  };

  const startDrag = (event) => {
    pointerRef.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const rotateArtwork = (event) => {
    const rect = artworkRef.current.getBoundingClientRect();
    artworkRef.current.style.setProperty('--artwork-light-x', `${((event.clientX - rect.left) / rect.width) * 100}%`);
    artworkRef.current.style.setProperty('--artwork-light-y', `${((event.clientY - rect.top) / rect.height) * 100}%`);

    if (pointerRef.current.id !== event.pointerId) return;
    const deltaX = event.clientX - pointerRef.current.x;
    const deltaY = event.clientY - pointerRef.current.y;
    paintRotation(
      rotationRef.current.x + deltaX * 0.11,
      rotationRef.current.y - deltaY * 0.09,
    );
    pointerRef.current.x = event.clientX;
    pointerRef.current.y = event.clientY;
  };

  const finishDrag = (event) => {
    if (pointerRef.current.id !== event.pointerId) return;
    pointerRef.current.id = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleKeyboard = (event) => {
    const step = event.shiftKey ? 4 : 2;
    const { x, y } = rotationRef.current;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      paintRotation(x + (event.key === 'ArrowLeft' ? -step : step), y);
    }
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      paintRotation(x, y + (event.key === 'ArrowUp' ? step : -step));
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      paintRotation(0, 0);
    }
  };

  return (
    <figure
      className={`hero-artwork${dragging ? ' is-dragging' : ''}`}
      ref={artworkRef}
      tabIndex="0"
      aria-label="Interactive developer illustration. Drag or use arrow keys to tilt it. Press Enter to reset."
      onKeyDown={handleKeyboard}
      onPointerDown={startDrag}
      onPointerMove={rotateArtwork}
      onPointerUp={finishDrag}
      onPointerCancel={finishDrag}
    >
      <span className="hero-artwork__halo" aria-hidden="true" />
      <span className="hero-artwork__orbit hero-artwork__orbit--one" aria-hidden="true" />
      <span className="hero-artwork__orbit hero-artwork__orbit--two" aria-hidden="true" />
      <SafeImage
        className="hero-artwork__image"
        src={imageSrc}
        alt={imageAlt}
        width="1000"
        height="1000"
        loading="eager"
        fetchPriority="high"
        draggable="false"
      />
      <figcaption className="sr-only">A visual representing software engineering, creative technology, and artificial intelligence.</figcaption>
    </figure>
  );
}
