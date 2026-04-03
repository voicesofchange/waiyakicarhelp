import { useState, useRef, useCallback } from "react";
import { Loader2 } from "lucide-react";

const THRESHOLD = 72;

export default function PullToRefresh({ onRefresh, children }) {
  const [pulling, setPulling] = useState(false);
  const [pullY, setPullY] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const startY = useRef(null);
  const containerRef = useRef(null);

  const onTouchStart = useCallback((e) => {
    const scrollTop = containerRef.current?.scrollTop ?? 0;
    if (scrollTop === 0) startY.current = e.touches[0].clientY;
  }, []);

  const onTouchMove = useCallback((e) => {
    if (startY.current === null) return;
    const dy = e.touches[0].clientY - startY.current;
    if (dy <= 0) { startY.current = null; return; }
    e.preventDefault();
    setPulling(true);
    setPullY(Math.min(dy * 0.45, THRESHOLD + 16));
  }, []);

  const onTouchEnd = useCallback(async () => {
    if (pullY >= THRESHOLD && !refreshing) {
      setRefreshing(true);
      setPullY(THRESHOLD);
      await onRefresh();
      setRefreshing(false);
    }
    startY.current = null;
    setPulling(false);
    setPullY(0);
  }, [pullY, refreshing, onRefresh]);

  return (
    <div
      ref={containerRef}
      className="relative overflow-y-auto h-full"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{ overscrollBehavior: "none" }}
    >
      {/* Pull indicator */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center justify-center transition-all pointer-events-none z-10"
        style={{ height: pullY, overflow: "hidden" }}
      >
        <div className={`flex flex-col items-center gap-1 ${pullY >= THRESHOLD ? "text-amber-600" : "text-gray-400"}`}>
          <Loader2 className={`w-5 h-5 ${refreshing ? "animate-spin" : ""}`} />
          <span className="text-xs font-medium">
            {refreshing ? "Refreshing..." : pullY >= THRESHOLD ? "Release to refresh" : "Pull to refresh"}
          </span>
        </div>
      </div>

      {/* Content shifted down while pulling */}
      <div style={{ transform: `translateY(${pulling || refreshing ? pullY : 0}px)`, transition: pulling ? "none" : "transform 0.3s ease" }}>
        {children}
      </div>
    </div>
  );
}