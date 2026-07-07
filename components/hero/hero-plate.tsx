import { cn } from "@/lib/utils";

/**
 * Static hero plate — the settled "flow of commerce" frame, drawn in pure CSS
 * (zero image bytes). Serves mobile, prefers-reduced-motion, and no-WebGL.
 * Monochrome: white light blooms and hub dots on deep black.
 */
export function HeroPlate({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("absolute inset-0 overflow-hidden bg-background", className)}
    >
      {/* Soft light blooms */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: [
            "radial-gradient(42% 34% at 50% 44%, rgba(255,255,255,0.10), transparent 70%)",
            "radial-gradient(24% 20% at 24% 30%, rgba(255,255,255,0.07), transparent 70%)",
            "radial-gradient(30% 24% at 78% 60%, rgba(255,255,255,0.06), transparent 70%)",
            "radial-gradient(16% 14% at 64% 22%, rgba(255,255,255,0.05), transparent 70%)",
          ].join(", "),
        }}
      />
      {/* Hub dots with glow */}
      {[
        { left: "24%", top: "30%", size: 5, o: 0.9 },
        { left: "50%", top: "44%", size: 7, o: 1 },
        { left: "78%", top: "60%", size: 5, o: 0.85 },
        { left: "64%", top: "22%", size: 4, o: 0.7 },
        { left: "38%", top: "66%", size: 4, o: 0.65 },
        { left: "12%", top: "58%", size: 3, o: 0.5 },
        { left: "88%", top: "34%", size: 3, o: 0.5 },
      ].map((hub, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: hub.left,
            top: hub.top,
            width: hub.size,
            height: hub.size,
            opacity: hub.o,
            boxShadow: `0 0 ${hub.size * 4}px ${hub.size}px rgba(255,255,255,0.25)`,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
      {/* Connection threads */}
      <svg
        className="absolute inset-0 h-full w-full opacity-25"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          d="M24,30 C34,34 42,40 50,44 S68,52 78,60 M50,44 C55,36 60,28 64,22 M50,44 C46,52 42,60 38,66 M24,30 C20,40 16,50 12,58 M64,22 C72,26 80,30 88,34"
          fill="none"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="0.15"
        />
      </svg>
      {/* Grain to prevent banding on the gradients */}
      <div className="texture-grain absolute inset-0 text-white/[0.04]" />
    </div>
  );
}
