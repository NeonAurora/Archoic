import { useState, useRef, useEffect, useCallback } from 'react';

// ===== DEBUG CONTROLS - REMOVE IN PRODUCTION =====
// This component provides sliders to control 3D rotation
// Delete this file and remove its import from ThreeScene.jsx when done

export default function DebugControls({ onRotationChange, initialRotation }) {
  const [isOpen, setIsOpen] = useState(false);
  const [rotation, setRotation] = useState(initialRotation);
  // Safe default for SSR, will update on client mount
  const [position, setPosition] = useState({ x: 0, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Track if component is mounted
  const dragOffset = useRef({ x: 0, y: 0 });
  const isInitialized = useRef(false);

  // Initialize position on client side only
  useEffect(() => {
    setIsMounted(true); // Component is now mounted
    if (!isInitialized.current && typeof window !== 'undefined') {
      setPosition({ x: window.innerWidth - 320, y: 60 });
      isInitialized.current = true;
    }
  }, []);

  const handleSliderChange = (axis, value) => {
    const newRotation = { ...rotation, [axis]: parseFloat(value) };
    setRotation(newRotation);
    onRotationChange(newRotation);
  };

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  // Drag handlers with useCallback
  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragOffset.current.x,
      y: e.clientY - dragOffset.current.y,
    });
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseDown = (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') return; // Don't drag when using sliders/buttons
    setIsDragging(true);
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  // Add global event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <>
      {/* Only render on client side after mount */}
      {isMounted && (
        <>
          {/* Toggle Button */}
          <button
            onClick={togglePanel}
            style={{
              position: 'fixed',
              top: '80px',
              right: '20px',
              zIndex: 10000,
              padding: '10px 18px',
              background: '#1f2937',
              color: 'white',
              border: '2px solid #374151',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
            }}
          >
            {isOpen ? '✕ Close' : '⚙️ Debug'}
          </button>

          {/* Debug Panel */}
          {isOpen && (
        <div
          onMouseDown={handleMouseDown}
          style={{
            position: 'fixed',
            left: `${position.x}px`,
            top: `${position.y}px`,
            zIndex: 1000,
            background: 'rgba(31, 41, 55, 0.95)',
            padding: '20px',
            borderRadius: '8px',
            minWidth: '280px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
            backdropFilter: 'blur(10px)',
            cursor: isDragging ? 'grabbing' : 'grab',
            userSelect: 'none',
          }}
        >
          <h3
            style={{
              margin: '0 0 20px 0',
              color: 'white',
              fontSize: '16px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{ cursor: 'grab' }}>⋮⋮</span>
            Rotation Controls
            <span style={{ fontSize: '12px', color: '#9ca3af', fontStyle: 'italic', marginLeft: 'auto' }}>
              (drag me)
            </span>
          </h3>

          {/* X Rotation Slider */}
          <div style={{ marginBottom: '20px' }}>
            <label
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                color: '#e5e7eb',
                fontSize: '14px',
                marginBottom: '8px',
              }}
            >
              <span>X Rotation (Tilt Up/Down)</span>
              <span style={{ fontWeight: '600', color: '#60a5fa' }}>
                {rotation.x.toFixed(1)}°
              </span>
            </label>
            <input
              type="range"
              min="-90"
              max="90"
              step="1"
              value={rotation.x}
              onChange={(e) => handleSliderChange('x', e.target.value)}
              style={{
                width: '100%',
                cursor: 'pointer',
              }}
            />
          </div>

          {/* Y Rotation Slider */}
          <div style={{ marginBottom: '20px' }}>
            <label
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                color: '#e5e7eb',
                fontSize: '14px',
                marginBottom: '8px',
              }}
            >
              <span>Y Rotation (Turn Left/Right)</span>
              <span style={{ fontWeight: '600', color: '#34d399' }}>
                {rotation.y.toFixed(1)}°
              </span>
            </label>
            <input
              type="range"
              min="-90"
              max="90"
              step="1"
              value={rotation.y}
              onChange={(e) => handleSliderChange('y', e.target.value)}
              style={{
                width: '100%',
                cursor: 'pointer',
              }}
            />
          </div>

          {/* Z Rotation Slider */}
          <div style={{ marginBottom: '20px' }}>
            <label
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                color: '#e5e7eb',
                fontSize: '14px',
                marginBottom: '8px',
              }}
            >
              <span>Z Rotation (Roll)</span>
              <span style={{ fontWeight: '600', color: '#f472b6' }}>
                {rotation.z.toFixed(1)}°
              </span>
            </label>
            <input
              type="range"
              min="-90"
              max="90"
              step="1"
              value={rotation.z}
              onChange={(e) => handleSliderChange('z', e.target.value)}
              style={{
                width: '100%',
                cursor: 'pointer',
              }}
            />
          </div>

          {/* Copy Values Button */}
          <button
            onClick={() => {
              const text = `cardRotationX: ${rotation.x},\ncardRotationY: ${rotation.y},\ncardRotationZ: ${rotation.z},`;
              navigator.clipboard.writeText(text);
              alert('Values copied to clipboard!');
            }}
            style={{
              width: '100%',
              padding: '8px',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '600',
            }}
          >
            📋 Copy Values to Clipboard
          </button>

          <p
            style={{
              marginTop: '12px',
              fontSize: '12px',
              color: '#9ca3af',
              fontStyle: 'italic',
            }}
          >
            💡 Adjust sliders, then copy values to CONFIG in ThreeScene.jsx
          </p>
        </div>
      )}
        </>
      )}
    </>
  );
}