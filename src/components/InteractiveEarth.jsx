import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export default function InteractiveEarth() {
  const mapRef = useRef(null);
  const stageRef = useRef(null);
  const animationRef = useRef(0);
  const lastFrameRef = useRef(0);
  const longitudeRef = useRef(0);
  const latitudeRef = useRef(0);
  const pointerRef = useRef({ id: null, x: 0, y: 0, moved: false });
  const pausedRef = useRef(false);
  const draggingRef = useRef(false);
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);

  const paintEarth = () => {
    if (!mapRef.current || !stageRef.current) return;
    mapRef.current.style.backgroundPosition = `${longitudeRef.current}px center`;
    stageRef.current.style.setProperty('--earth-tilt-x', `${latitudeRef.current}deg`);
  };

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const animate = (time) => {
      const elapsed = lastFrameRef.current ? Math.min(time - lastFrameRef.current, 40) : 0;
      lastFrameRef.current = time;

      if (!reduceMotion.matches && !pausedRef.current && !draggingRef.current) {
        longitudeRef.current -= elapsed * 0.008;
        paintEarth();
      }

      animationRef.current = window.requestAnimationFrame(animate);
    };

    animationRef.current = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(animationRef.current);
  }, []);

  const setPauseState = (nextPaused) => {
    pausedRef.current = nextPaused;
    setPaused(nextPaused);
  };

  const startDrag = (event) => {
    pointerRef.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      moved: false,
    };
    draggingRef.current = true;
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const moveEarth = (event) => {
    if (!draggingRef.current || pointerRef.current.id !== event.pointerId) return;
    const deltaX = event.clientX - pointerRef.current.x;
    const deltaY = event.clientY - pointerRef.current.y;

    if (Math.abs(deltaX) + Math.abs(deltaY) > 2) pointerRef.current.moved = true;
    longitudeRef.current += deltaX * 1.25;
    latitudeRef.current = clamp(latitudeRef.current - deltaY * 0.16, -18, 18);
    pointerRef.current.x = event.clientX;
    pointerRef.current.y = event.clientY;
    paintEarth();
  };

  const finishDrag = (event) => {
    if (pointerRef.current.id !== event.pointerId) return;
    const wasClick = !pointerRef.current.moved;
    draggingRef.current = false;
    setDragging(false);
    pointerRef.current.id = null;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (wasClick) setPauseState(!pausedRef.current);
  };

  const rotateWithKeyboard = (event) => {
    const horizontalStep = event.shiftKey ? 42 : 22;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      longitudeRef.current += event.key === 'ArrowLeft' ? horizontalStep : -horizontalStep;
      paintEarth();
    }
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      latitudeRef.current = clamp(latitudeRef.current + (event.key === 'ArrowUp' ? 4 : -4), -18, 18);
      paintEarth();
    }
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      setPauseState(!pausedRef.current);
    }
  };

  return (
    <button
      className={`earth-stage interactive-earth${dragging ? ' is-dragging' : ''}${paused ? ' is-paused' : ''}`}
      ref={stageRef}
      type="button"
      aria-label={`Interactive Earth. Drag or use arrow keys to rotate. ${paused ? 'Rotation paused.' : 'Auto rotation active.'}`}
      aria-pressed={paused}
      onKeyDown={rotateWithKeyboard}
      onPointerDown={startDrag}
      onPointerMove={moveEarth}
      onPointerUp={finishDrag}
      onPointerCancel={finishDrag}
    >
      <span className="earth-orbit earth-orbit--outer" aria-hidden="true" />
      <span className="earth-orbit earth-orbit--inner" aria-hidden="true" />
      <span className="earth" aria-hidden="true">
        <span className="earth__map" ref={mapRef} />
        <span className="earth__clouds" />
        <span className="earth__light" />
        <span className="earth__grid" />
      </span>
      <span className="interactive-earth__hint">
        <Icon name="rotate" size={13} />
        <span>{dragging ? 'Rotating…' : paused ? 'Paused · tap to play' : 'Drag to rotate'}</span>
      </span>
    </button>
  );
}
