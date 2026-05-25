"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  AreaChart,
} from "recharts";

interface AnalysisChartsProps {
  screePlotData: number[];
  cumulativeEnergyData: number[];
  kValue: number;
}

interface TooltipPayload {
  value: number;
  name?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string | number;
  unit?: string;
  valueLabel?: string;
  color?: string;
}

function CustomTooltip({
  active,
  payload,
  label,
  unit,
  valueLabel,
  color = "#818cf8",
}: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div
      style={{
        background: "rgba(10, 10, 18, 0.92)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "12px",
        padding: "12px 16px",
        boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
      }}
    >
      <p
        style={{
          fontSize: "11px",
          color: "var(--text-muted)",
          marginBottom: "4px",
          fontWeight: 500,
        }}
      >
        Komponen ke-{label}
      </p>
      <p
        style={{
          fontSize: "15px",
          fontWeight: 700,
          color,
          fontFamily: "var(--font-mono)",
        }}
      >
        {valueLabel}: {Number(payload[0].value).toFixed(4)}
        {unit}
      </p>
    </div>
  );
}

export default function AnalysisCharts({
  screePlotData,
  cumulativeEnergyData,
  kValue,
}: AnalysisChartsProps) {
  const screeChartData = screePlotData.map((val, i) => ({
    index: i + 1,
    value: val,
  }));

  const energyChartData = cumulativeEnergyData.map((val, i) => ({
    index: i + 1,
    value: val,
  }));

  return (
    <div className="card animate-fade-in-up">
      {/* Section Header */}
      <div className="section-header">
        <div
          className="section-icon"
          style={{
            background:
              "linear-gradient(135deg, rgba(245,158,11,0.2), rgba(249,115,22,0.15))",
            border: "1px solid rgba(245,158,11,0.2)",
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
        </div>
        <div>
          <h2 className="section-title">Analisis Singular Values</h2>
          <p className="section-subtitle">
            Distribusi energi dan penurunan nilai singular (k={kValue})
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
        }}
      >
        {/* Scree Plot */}
        <div className="chart-container">
          <p className="chart-title">Scree Plot</p>
          <p className="chart-subtitle">
            Penurunan nilai singular (log₁₀)
          </p>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart
              data={screeChartData}
              margin={{ top: 8, right: 12, left: -12, bottom: 4 }}
            >
              <defs>
                <linearGradient id="screeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.04)"
                vertical={false}
              />
              <XAxis
                dataKey="index"
                tick={{ fontSize: 11, fill: "var(--text-dim)" }}
                tickLine={false}
                axisLine={{ stroke: "rgba(255,255,255,0.06)" }}
                label={{
                  value: "Komponen ke-",
                  position: "insideBottom",
                  offset: -2,
                  fontSize: 10,
                  fill: "var(--text-dim)",
                }}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "var(--text-dim)" }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                content={
                  <CustomTooltip
                    unit=""
                    valueLabel="log₁₀(σ)"
                    color="#818cf8"
                  />
                }
              />
              <ReferenceLine
                x={kValue}
                stroke="rgba(99,102,241,0.5)"
                strokeDasharray="4 3"
                strokeWidth={1.5}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#6366f1"
                strokeWidth={2}
                fill="url(#screeGradient)"
                dot={false}
                activeDot={{
                  r: 5,
                  fill: "#818cf8",
                  strokeWidth: 2,
                  stroke: "#0e0e18",
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Cumulative Energy */}
        <div className="chart-container">
          <p className="chart-title">Energi Kumulatif</p>
          <p className="chart-subtitle">
            Persentase energi yang dipertahankan (%)
          </p>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart
              data={energyChartData}
              margin={{ top: 8, right: 12, left: -12, bottom: 4 }}
            >
              <defs>
                <linearGradient
                  id="energyGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.04)"
                vertical={false}
              />
              <XAxis
                dataKey="index"
                tick={{ fontSize: 11, fill: "var(--text-dim)" }}
                tickLine={false}
                axisLine={{ stroke: "rgba(255,255,255,0.06)" }}
                label={{
                  value: "Komponen ke-",
                  position: "insideBottom",
                  offset: -2,
                  fontSize: 10,
                  fill: "var(--text-dim)",
                }}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "var(--text-dim)" }}
                tickLine={false}
                axisLine={false}
                domain={[0, 100]}
              />
              <Tooltip
                content={
                  <CustomTooltip
                    unit="%"
                    valueLabel="Energi"
                    color="#10b981"
                  />
                }
              />
              <ReferenceLine
                x={kValue}
                stroke="rgba(99,102,241,0.5)"
                strokeDasharray="4 3"
                strokeWidth={1.5}
              />
              <ReferenceLine
                y={90}
                stroke="rgba(16,185,129,0.25)"
                strokeDasharray="4 3"
                label={{
                  value: "90%",
                  position: "right",
                  fontSize: 10,
                  fill: "rgba(16,185,129,0.6)",
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#10b981"
                strokeWidth={2}
                fill="url(#energyGradient)"
                dot={false}
                activeDot={{
                  r: 5,
                  fill: "#34d399",
                  strokeWidth: 2,
                  stroke: "#0e0e18",
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
