import React from "react";

interface LogoProps {
  variant?: "full" | "icon";
  color?: "primary" | "white" | "accent";
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Logo: React.FC<LogoProps> = ({ 
  color = "primary", 
  className = "", 
  size = "md" 
}) => {
  // Size based on prop
  const sizes = {
    sm: { fontSize: 18, lineHeight: "24px" },
    md: { fontSize: 24, lineHeight: "32px" },
    lg: { fontSize: 32, lineHeight: "40px" },
  };
  
  // Color based on prop
  const colors = {
    primary: { main: "#1e40af", accent: "#f59e0b" }, // Blue primary, Yellow accent
    white: { main: "#ffffff", accent: "#f59e0b" }, // White primary, Yellow accent
    accent: { main: "#f59e0b", accent: "#1e40af" }, // Yellow primary, Blue accent
  };

  const { main, accent } = colors[color];
  
  // Simple text-based logo with blue and yellow theme
  return (
    <div className={`inline-flex items-center font-brand ${className}`} style={{ whiteSpace: "nowrap" }}>
      <span style={{ 
        fontWeight: 600,
        fontSize: sizes[size].fontSize, 
        lineHeight: sizes[size].lineHeight,
        color: main,
        letterSpacing: "0.02em"
      }}>
        Kleaos <span style={{ color: accent }}>Lifescience</span>
      </span>
    </div>
  );
};

export default Logo;