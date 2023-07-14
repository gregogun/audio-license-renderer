import { styled } from "@/stitches.config";

interface CircularProgressProps {
  progress: number;
}

const ProgressWrapper = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
});

const SVG = styled("svg", {
  width: "136px",
  height: "136px",
});

const Circle = styled("circle", {
  fill: "none",
  strokeWidth: "4px",
});

const ProgressArc = styled("path", {
  fill: "none",
  stroke: "$whiteA12",
  strokeWidth: "6px",
  strokeLinecap: "round",
  transformOrigin: "center",
  transition: "stroke-dasharray 0.3s",
});

export const CircularProgress = ({ progress }: CircularProgressProps) => {
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const progressValue = (progress / 100) * circumference;
  const dashArray = `${progressValue} ${circumference}`;

  return (
    <ProgressWrapper>
      <SVG viewBox="0 0 136 136">
        <Circle cx="68" cy="68" r={radius} />
        <ProgressArc
          d={`M68 ${68 - radius}
              a ${radius} ${radius} 0 0 1 0 ${2 * radius}
              a ${radius} ${radius} 0 0 1 0 -${2 * radius}`}
          style={{ strokeDasharray: dashArray }}
        />
      </SVG>
    </ProgressWrapper>
  );
};
