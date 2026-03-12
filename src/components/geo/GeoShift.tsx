'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import IsoLevelWarp from '@/components/ui/IsoLevelWarp';

interface GeoShiftProps {
  eyebrow: string;
  headline: string;
  body: string;
}

const LOGOS = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    color: '#10a37f',
    pos: { x: 6, y: 14 },
    mobilePos: { x: 4, y: 8 },
    depth: 28,
    rotate: -8,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28" aria-hidden>
        <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08-4.778 2.758a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>
      </svg>
    ),
  },
  {
    id: 'gemini',
    name: 'Gemini',
    color: '#4285f4',
    pos: { x: 80, y: 10 },
    mobilePos: { x: 52, y: 5 },
    depth: 38,
    rotate: 10,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28" aria-hidden>
        <path d="M12 24A14.304 14.304 0 0 0 0 12 14.304 14.304 0 0 0 12 0a14.305 14.305 0 0 0 12 12 14.305 14.305 0 0 0-12 12"/>
      </svg>
    ),
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    color: '#20b2aa',
    pos: { x: 74, y: 80 },
    mobilePos: { x: 55, y: 82 },
    depth: 22,
    rotate: -5,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28" aria-hidden>
        <path d="M22.3977 7.0896h-2.3106V.0676l-7.5094 6.3542V.1577h-1.1554v6.1966L4.4904 0v7.0896H1.6023v10.3976h2.8882V24l6.932-6.3591v6.2005h1.1554v-6.0469l6.9318 6.1807v-6.4879h2.8882V7.0896zm-3.4657-4.531v4.531h-5.355l5.355-4.531zm-13.2862.0676 4.8691 4.4634H5.6458V2.6262zM2.7576 16.332V8.245h7.8476l-6.1149 6.1147v1.9723H2.7576zm2.8882 5.0404v-3.8852h.0001v-2.6488l5.7763-5.7764v7.0111l-5.7764 5.2993zm12.7086.0248-5.7766-5.1509V9.0618l5.7766 5.7766v6.5588zm2.8882-5.0652h-1.733v-1.9723L13.3948 8.245h7.8478v8.087z"/>
      </svg>
    ),
  },
  {
    id: 'claude',
    name: 'Claude',
    color: '#d97757',
    pos: { x: 8, y: 82 },
    mobilePos: { x: 4, y: 80 },
    depth: 32,
    rotate: 12,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28" aria-hidden>
        <path d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z"/>
      </svg>
    ),
  },
  {
    id: 'copilot',
    name: 'Copilot',
    color: '#0078d4',
    pos: { x: 50, y: 5 },
    mobilePos: { x: 28, y: 14 },
    depth: 16,
    rotate: -3,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28" aria-hidden>
        <path d="M23.922 16.997C23.061 18.492 18.063 22.02 12 22.02 5.937 22.02.939 18.492.078 16.997A.641.641 0 0 1 0 16.741v-2.869a.883.883 0 0 1 .053-.22c.372-.935 1.347-2.292 2.605-2.656.167-.429.414-1.055.644-1.517a10.098 10.098 0 0 1-.052-1.086c0-1.331.282-2.499 1.132-3.368.397-.406.89-.717 1.474-.952C7.255 2.937 9.248 1.98 11.978 1.98c2.731 0 4.767.957 6.166 2.093.584.235 1.077.546 1.474.952.85.869 1.132 2.037 1.132 3.368 0 .368-.014.733-.052 1.086.23.462.477 1.088.644 1.517 1.258.364 2.233 1.721 2.605 2.656a.841.841 0 0 1 .053.22v2.869a.641.641 0 0 1-.078.256Zm-11.75-5.992h-.344a4.359 4.359 0 0 1-.355.508c-.77.947-1.918 1.492-3.508 1.492-1.725 0-2.989-.359-3.782-1.259a2.137 2.137 0 0 1-.085-.104L4 11.746v6.585c1.435.779 4.514 2.179 8 2.179 3.486 0 6.565-1.4 8-2.179v-6.585l-.098-.104s-.033.045-.085.104c-.793.9-2.057 1.259-3.782 1.259-1.59 0-2.738-.545-3.508-1.492a4.359 4.359 0 0 1-.355-.508Zm2.328 3.25c.549 0 1 .451 1 1v2c0 .549-.451 1-1 1-.549 0-1-.451-1-1v-2c0-.549.451-1 1-1Zm-5 0c.549 0 1 .451 1 1v2c0 .549-.451 1-1 1-.549 0-1-.451-1-1v-2c0-.549.451-1 1-1Zm3.313-6.185c.136 1.057.403 1.913.878 2.497.442.544 1.134.938 2.344.938 1.573 0 2.292-.337 2.657-.751.384-.435.558-1.15.558-2.361 0-1.14-.243-1.847-.705-2.319-.477-.488-1.319-.862-2.824-1.025-1.487-.161-2.192.138-2.533.529-.269.307-.437.808-.438 1.578v.021c0 .265.021.562.063.893Zm-1.626 0c.042-.331.063-.628.063-.894v-.02c-.001-.77-.169-1.271-.438-1.578-.341-.391-1.046-.69-2.533-.529-1.505.163-2.347.537-2.824 1.025-.462.472-.705 1.179-.705 2.319 0 1.211.175 1.926.558 2.361.365.414 1.084.751 2.657.751 1.21 0 1.902-.394 2.344-.938.475-.584.742-1.44.878-2.497Z"/>
      </svg>
    ),
  },
  {
    id: 'meta',
    name: 'Meta AI',
    color: '#0668E1',
    pos: { x: 87, y: 44 },
    mobilePos: { x: 30, y: 86 },
    depth: 42,
    rotate: 7,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28" aria-hidden>
        <path d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z"/>
      </svg>
    ),
  },
];

// CSS animation name + duration per logo (pure CSS float, no JS state)
const FLOAT_CSS: Record<string, { name: string; duration: string; delay: string }> = {
  chatgpt:    { name: 'geoFloat0', duration: '6.2s',  delay: '0s'    },
  gemini:     { name: 'geoFloat1', duration: '7.8s',  delay: '-2.1s' },
  perplexity: { name: 'geoFloat2', duration: '6.9s',  delay: '-4.5s' },
  claude:     { name: 'geoFloat3', duration: '8.3s',  delay: '-1.8s' },
  copilot:    { name: 'geoFloat4', duration: '7.1s',  delay: '-3.3s' },
  meta:       { name: 'geoFloat5', duration: '6.6s',  delay: '-5.0s' },
};

// Pre-defined scatter offsets per logo when any other logo is hovered.
// Each entry: [scatterX, scatterY] in px — gives each logo a unique "jump" direction.
const SCATTER: Record<string, [number, number]> = {
  chatgpt:    [-18, -12],
  gemini:     [ 16, -14],
  perplexity: [ 14,  16],
  claude:     [-16,  18],
  copilot:    [  6, -20],
  meta:       [ 20,   8],
};

export function GeoShift({ eyebrow, headline, body }: GeoShiftProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouse({ x: 0.5, y: 0.5 });
    setHoveredId(null);
  }, []);

  return (
    <div
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative py-32 sm:py-48 select-none"
    >
      {/* Animated topographic grid background — mask fades it in/out vertically */}
      <IsoLevelWarp
        aria-hidden
        className="pointer-events-none"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)',
        }}
      />

      {/* Floating AI logo chips */}
      {LOGOS.map((logo) => {
        const isHovered = hoveredId === logo.id;
        const isOtherHovered = hoveredId !== null && !isHovered;

        // Cursor parallax
        const dx = (mouse.x - 0.5) * logo.depth;
        const dy = (mouse.y - 0.5) * logo.depth;

        // Scatter when another chip is hovered
        const [sx, sy] = isOtherHovered ? SCATTER[logo.id] : [0, 0];

        const scale = isHovered ? 1.28 : 1;
        const anim = FLOAT_CSS[logo.id];
        const pos = isMobile ? logo.mobilePos : logo.pos;

        return (
          <div
            key={logo.id}
            onMouseEnter={() => setHoveredId(logo.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="absolute flex items-center gap-2 lg:gap-3 rounded-full border px-3 py-2 lg:px-5 lg:py-3 backdrop-blur-sm cursor-default"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              animation: `${anim.name} ${anim.duration} ease-in-out ${anim.delay} infinite`,
              transform: `translate(${dx + sx}px, ${dy + sy}px) rotate(${logo.rotate}deg) scale(${scale})`,
              transition: isHovered
                ? 'transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease'
                : isOtherHovered
                  ? 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease'
                  : 'box-shadow 0.3s ease',
              borderColor: `${logo.color}30`,
              backgroundColor: isHovered ? `${logo.color}22` : `${logo.color}12`,
              boxShadow: isHovered
                ? `0 8px 32px ${logo.color}40, inset 0 1px 0 ${logo.color}30`
                : `0 4px 24px ${logo.color}25, inset 0 1px 0 ${logo.color}20`,
              color: logo.color,
              zIndex: isHovered ? 20 : 10,
            }}
          >
            <span className="[&>svg]:w-5 [&>svg]:h-5 lg:[&>svg]:w-7 lg:[&>svg]:h-7">{logo.icon}</span>
            <span className="text-xs lg:text-sm font-semibold whitespace-nowrap" style={{ color: logo.color }}>
              {logo.name}
            </span>
          </div>
        );
      })}

      {/* Text content */}
      <div className="relative z-10 mx-auto max-w-2xl px-6 flex flex-col items-center text-center gap-6">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {headline.split('\n').map((line, i) => (
            <span key={i} className="block">{line}</span>
          ))}
        </h2>
        <p className="text-base leading-relaxed text-zinc-400 max-w-xl">{body}</p>
      </div>
    </div>
  );
}
