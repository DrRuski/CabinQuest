import { useState } from "react";

export default function useHover() {
  const [hover, setHover] = useState(false);
  const onHoverProps = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
  };
  return [hover, onHoverProps];
}
