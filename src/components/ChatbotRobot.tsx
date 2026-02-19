"use client";

import "./chatbot.css";

type RobotState = "idle" | "thinking" | "talking" | "waving" | "celebrating";

interface ChatbotRobotProps {
  state: RobotState;
  className?: string;
}

export default function ChatbotRobot({
  state,
  className = "",
}: ChatbotRobotProps) {
  return (
    <div className={`robot-container robot-${state} ${className}`}>
      <div className="robot-figure">
        {/* Head / Helmet */}
        <div className="robot-head">
          {/* Ears */}
          <div className="robot-ear robot-ear-left" />
          <div className="robot-ear robot-ear-right" />

          {/* Visor with Eyes */}
          <div className="robot-visor">
            <div className="robot-eye" />
            <div className="robot-eye" />
          </div>
        </div>

        {/* Body */}
        <div className="robot-body">
          <div className="robot-chest" />
        </div>

        {/* Arms */}
        <div className="robot-arm robot-arm-left" />
        <div className="robot-arm robot-arm-right" />
      </div>

      {/* Shadow (outside figure so it doesn't float) */}
      <div className="robot-shadow" />
    </div>
  );
}
