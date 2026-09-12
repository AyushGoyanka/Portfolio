import { useEffect, useState } from 'react';
import Icon from './Icon';

export default function SafeImage({
  src,
  alt = '',
  className = '',
  loading = 'lazy',
  decoding = 'async',
  onError,
  ...props
}) {
  const [failed, setFailed] = useState(false);
  const hasSource = typeof src === 'string' ? Boolean(src.trim()) : Boolean(src);
  const descriptiveAlt = typeof alt === 'string' ? alt.trim() : '';

  useEffect(() => {
    setFailed(false);
  }, [src]);

  const handleError = (event) => {
    setFailed(true);
    onError?.(event);
  };

  if (!hasSource || failed) {
    return (
      <div
        className={`image-fallback ${className}`.trim()}
        role="img"
        aria-label={descriptiveAlt ? `${descriptiveAlt} unavailable` : 'Image preview unavailable'}
      >
        <Icon name="sparkles" size={28} />
        <span>Preview unavailable</span>
      </div>
    );
  }

  return (
    <img
      className={className}
      src={src}
      alt={typeof alt === 'string' ? alt : ''}
      loading={loading}
      decoding={decoding}
      onError={handleError}
      {...props}
    />
  );
}
