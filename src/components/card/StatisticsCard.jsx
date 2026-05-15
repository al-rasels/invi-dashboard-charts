"use client";

import { useState, useRef, useEffect, memo } from "react";
import styled from "styled-components";
import { ShoppingCart, PieChart, Users, DollarSign } from "lucide-react";

// ------------------------------------------------------------
// Data
// ------------------------------------------------------------
const CARDS = [
  {
    key: "opening_balance",
    label: "Opening balance",
    Icon: ShoppingCart,
    iconBg: "#f3f0ff",
    iconColor: "#7c6ff7",
  },
  {
    key: "todays_income",
    label: "Today's income",
    Icon: PieChart,
    iconBg: "#ecfdf5",
    iconColor: "#059669",
  },
  {
    key: "todays_expense",
    label: "Today's expense",
    Icon: Users,
    iconBg: "#fffbeb",
    iconColor: "#d97706",
  },
  {
    key: "total_balance",
    label: "Total balance",
    Icon: DollarSign,
    iconBg: "#fff1f2",
    iconColor: "#e11d48",
  },
];

// ------------------------------------------------------------
// Hook: auto‑shrink text to fit container
// ------------------------------------------------------------
function useFitText(text) {
  const wrapRef = useRef(null);
  const textRef = useRef(null);
  const [fontSize, setFontSize] = useState(28);

  useEffect(() => {
    const fit = () => {
      const wrap = wrapRef.current;
      const el = textRef.current;
      if (!wrap || !el) return;
      const maxWidth = wrap.clientWidth - 4;
      el.style.fontSize = "28px";
      const overflow = el.scrollWidth / maxWidth;
      const newSize = overflow > 1 ? Math.max(14, Math.floor(28 / overflow)) : 28;
      setFontSize(newSize);
    };
    fit();
    const observer = new ResizeObserver(fit);
    if (wrapRef.current) observer.observe(wrapRef.current);
    return () => observer.disconnect();
  }, [text]);

  return { wrapRef, textRef, fontSize };
}

// ------------------------------------------------------------
// Styled Components
// ------------------------------------------------------------
const Section = styled.section`
  font-family: 'Plus Jakarta Sans', 'DM Sans', system-ui, sans-serif;
  background: rgba(15, 23, 42, 0.55) !important;
  border-radius: 28px;
  padding: 32px 24px 34px;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  box-shadow: 
    0 32px 90px rgba(0, 0, 0, 0.3),
    inset 0 1px 1px rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(16px) saturate(1.8) !important;
  -webkit-backdrop-filter: blur(16px) saturate(1.8) !important;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  color: #ffffff !important;
`;

const Blob = styled.div`
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 26px;
  position: relative;
  z-index: 2;
`;

const TitleGroup = styled.div``;

const Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.4px;
  color: #ffffff;
  margin: 0;
  line-height: 1;
`;

const TitleAccent = styled.span`
  color: #a78bfa;
`;

const Subtitle = styled.p`
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 5px;
`;

const LiveBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 999px;
  padding: 9px 16px;
  backdrop-filter: blur(4px);
`;

const LiveDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #34d399;
  box-shadow: 0 0 10px #34d399;
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.2); opacity: 0.7; }
    100% { transform: scale(1); opacity: 1; }
  }
`;

const LiveText = styled.span`
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #ffffff;
`;

const Divider = styled.div`
  height: 1px;
  margin-bottom: 22px;
  position: relative;
  z-index: 2;
  background: linear-gradient(90deg, transparent, rgba(124, 111, 247, 0.15), transparent);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px;
  position: relative;
  z-index: 2;
  width: 100%;
`;

// Card sub‑components
const CardContainer = styled.div`
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid ${props => props.borderColor || 'rgba(255, 255, 255, 0.1)'} !important;
  border-radius: 24px;
  padding: 22px 18px 18px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  min-width: 0;
  backdrop-filter: blur(8px);

  &:hover {
    transform: translateY(-5px) scale(1.02);
    background: rgba(255, 255, 255, 0.1) !important;
    border-color: ${props => props.borderColor ? props.borderColor.replace('44', 'aa') : 'rgba(255, 255, 255, 0.3)'} !important;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 
                0 0 20px ${props => props.borderColor ? props.borderColor.replace('44', '22') : 'transparent'};
  }
`;

const IconWrapper = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
  flex-shrink: 0;

  ${CardContainer}:hover & {
    transform: scale(1.05);
  }
`;

const CardLabel = styled.p`
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
  margin: 0 0 4px 0;
`;

const ValueRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 6px;
  min-width: 0;
  overflow: hidden;
`;

const CurrencySymbol = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.5);
  flex-shrink: 0;
`;

const ValueText = styled.span`
  font-weight: 700;
  letter-spacing: -0.5px;
  line-height: 1.1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
  transition: font-size 0.15s ease;
`;

// ------------------------------------------------------------
// Card Component (memoised)
// ------------------------------------------------------------
const MilkyCard = memo(function MilkyCard({ card, value }) {
  const isNegative = typeof value === "number" && value < 0;
  const absFormatted = value != null ? Math.abs(value).toLocaleString() : "0";
  const display = isNegative ? `-${absFormatted}` : absFormatted;
  const { wrapRef, textRef, fontSize } = useFitText(display);
  const valueColor = isNegative ? "#fb7185" : "#ffffff";

  return (
    <CardContainer borderColor={card.iconColor + '44'}>
      <IconWrapper style={{ background: "rgba(255,255,255,0.1)", color: "#ffffff", backdropBlur: "4px" }}>
        <card.Icon size={20} strokeWidth={2} />
      </IconWrapper>
      <div>
        <CardLabel>{card.label}</CardLabel>
        <ValueRow ref={wrapRef}>
          <CurrencySymbol>৳</CurrencySymbol>
          <ValueText ref={textRef} style={{ fontSize, color: valueColor }}>
            {display}
          </ValueText>
        </ValueRow>
      </div>
    </CardContainer>
  );
});

// ------------------------------------------------------------
// Main Component (memoised)
// ------------------------------------------------------------
const StatisticsCard = memo(function StatisticsCard({ stats = {} }) {
  const blobs = [
    { w: 320, h: 320, top: -80, left: -60, color: "rgba(196,181,253,0.28)" },
    { w: 260, h: 260, bottom: -60, right: 20, color: "rgba(167,243,208,0.22)" },
    { w: 200, h: 200, top: 50, right: -40, color: "rgba(251,207,232,0.25)" },
  ];

  return (
    <Section>
      {blobs.map((blob, i) => (
        <Blob
          key={i}
          style={{
            width: blob.w,
            height: blob.h,
            top: blob.top,
            left: blob.left,
            bottom: blob.bottom,
            right: blob.right,
            background: `radial-gradient(circle, ${blob.color} 0%, transparent 68%)`,
          }}
        />
      ))}
      <Header>
        <TitleGroup>
          <Title>
            Invi <TitleAccent>dashboard</TitleAccent>
          </Title>
          <Subtitle>Real-time performance metrics</Subtitle>
        </TitleGroup>
        <LiveBadge>
          <LiveDot />
          <LiveText>Live stats</LiveText>
        </LiveBadge>
      </Header>
      <Divider />
      <Grid>
        {CARDS.map((card) => (
          <MilkyCard key={card.key} card={card} value={stats[card.key]} />
        ))}
      </Grid>
    </Section>
  );
});

export default StatisticsCard;