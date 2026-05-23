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
}

function CustomTooltip({ active, payload, label, unit, valueLabel }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-bright)",
        borderRadius: "10px",
        padding: "10px 14px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
      }}
    >
      <p style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "4px" }}>
        Komponen ke-{label}
      </p>
      <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--accent-hover)" }}>
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

  const chartContainerStyle: React.CSSProperties = {
    background: "var(--bg-secondary)",
    borderRadius: "12px",
    padding: "20px",
    border: "1px solid var(--border)",
  };

  const chartTitleStyle: React.CSSProperties = {
    fontSize: "14px",
    fontWeight: 700,
    color: "var(--text-primary)",
    marginBottom: "4px",
  };

  const chartSubtitleStyle: React.CSSProperties = {
    fontSize: "11px",
    color: "var(--text-muted)",
    marginBottom: "16px",
  };

  return (
    <div className="card animate-fade-in-up">
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
        <div
          style={{
            width: "40px",
            height: "40px",
            background: "linear-gradient(135deg, rgba(245,158,11,0.3), rgba(249,115,22,0.2))",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            border: "1px solid rgba(245,158,11,0.3)",
          }}
        >
          📊
        </div>
        <div>
          <h2 style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-primary)" }}>
            Analisis Singular Values
          </h2>
          <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
            Distribusi energi dan penurunan nilai singular (k={kValue})
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div style={chartContainerStyle}>
          <p style={chartTitleStyle}>Scree Plot</p>
          <p style={chartSubtitleStyle}>Penurunan nilai singular (log₁₀)</p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={screeChartData} margin={{ top: 4, right: 8, left: -8, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="index"
                tick={{ fontSize: 11, fill: "var(--text-muted)" }}
                tickLine={false}
                axisLine={{ stroke: "var(--border)" }}
                label={{ value: "Komponen ke-", position: "insideBottom", offset: -2, fontSize: 10, fill: "var(--text-muted)" }}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "var(--text-muted)" }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip unit="" valueLabel="log₁₀(σ)" />} />
              <ReferenceLine x={kValue} stroke="rgba(99,102,241,0.6)" strokeDasharray="4 2" />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#6366f1"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 5, fill: "#818cf8", strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={chartContainerStyle}>
          <p style={chartTitleStyle}>Energi Kumulatif</p>
          <p style={chartSubtitleStyle}>Persentase energi yang dipertahankan (%)</p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={energyChartData} margin={{ top: 4, right: 8, left: -8, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="index"
                tick={{ fontSize: 11, fill: "var(--text-muted)" }}
                tickLine={false}
                axisLine={{ stroke: "var(--border)" }}
                label={{ value: "Komponen ke-", position: "insideBottom", offset: -2, fontSize: 10, fill: "var(--text-muted)" }}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "var(--text-muted)" }}
                tickLine={false}
                axisLine={false}
                domain={[0, 100]}
              />
              <Tooltip content={<CustomTooltip unit="%" valueLabel="Energi" />} />
              <ReferenceLine x={kValue} stroke="rgba(99,102,241,0.6)" strokeDasharray="4 2" />
              <ReferenceLine y={90} stroke="rgba(16,185,129,0.4)" strokeDasharray="4 2" />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#10b981"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 5, fill: "#34d399", strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
