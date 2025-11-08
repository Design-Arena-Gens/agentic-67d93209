'use client';

import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import styles from './IndicatorChart.module.css';
import type { ZeroLagMacdPoint } from '../lib/zlmacd';

interface IndicatorChartProps {
  data: ZeroLagMacdPoint[];
}

type TooltipPayload = {
  dataKey?: string;
  value?: number | string;
  color?: string;
  name?: string;
};

type TooltipProps = {
  active?: boolean;
  label?: string;
  payload?: TooltipPayload[];
  descriptor: string;
};

const formatNumber = (value: number | null | undefined, digits = 5) =>
  value != null ? value.toFixed(digits) : '—';

const ChartTooltip = ({ active, label, payload, descriptor }: TooltipProps) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  return (
    <div className={styles.tooltip}>
      <h4 className={styles.tooltipTitle}>{label}</h4>
      <span className={styles.tooltipDescriptor}>{descriptor}</span>
      <ul className={styles.tooltipList}>
        {payload.filter(Boolean).map((item, index) => (
          <li key={item.dataKey ?? `${item.name ?? index}` ?? index} className={styles.tooltipRow}>
            <span className={styles.tooltipDot} style={{ backgroundColor: item.color ?? '#38bdf8' }} />
            <span>{item.name ?? item.dataKey}</span>
            <span className={styles.tooltipValue}>
              {typeof item.value === 'number' ? formatNumber(item.value, 5) : item.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export function IndicatorChart({ data }: IndicatorChartProps) {
  const priceDescriptor = 'Price & Zero-Lag Signals';
  const macdDescriptor = 'MACD, Signal & Histogram';
  const priceData = data.map((point) => ({ ...point, dotMarker: point.dotValue }));

  return (
    <div className={styles.wrapper}>
      <div className={styles.chartBlock}>
        <ResponsiveContainer width="100%" height={260}>
          <ComposedChart data={priceData}>
            <defs>
              <linearGradient id="priceGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="rgba(56, 189, 248, 0.55)" />
                <stop offset="100%" stopColor="rgba(15, 23, 42, 0.05)" />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(148, 163, 184, 0.08)" vertical={false} />
            <XAxis dataKey="time" stroke="rgba(148, 163, 184, 0.5)" minTickGap={32} tickLine={false} />
            <YAxis
              stroke="rgba(148, 163, 184, 0.5)"
              tickLine={false}
              domain={['auto', 'auto']}
              tickFormatter={(value) => value.toFixed(4)}
            />
            <Tooltip content={<ChartTooltip descriptor={priceDescriptor} />} />
            <Area
              type="monotone"
              dataKey="close"
              name="Close"
              stroke="#38bdf8"
              strokeWidth={2}
              fill="url(#priceGradient)"
              fillOpacity={1}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
            <Scatter
              dataKey="dotMarker"
              name="Positive Histogram"
              fill="#f97316"
              shape="circle"
              r={4}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.chartBlock}>
        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart data={data}>
            <CartesianGrid stroke="rgba(148, 163, 184, 0.08)" vertical={false} />
            <XAxis dataKey="time" stroke="rgba(148, 163, 184, 0.5)" minTickGap={32} tickLine={false} />
            <YAxis
              stroke="rgba(148, 163, 184, 0.5)"
              tickLine={false}
              domain={['auto', 'auto']}
              tickFormatter={(value) => value.toFixed(4)}
            />
            <Tooltip content={<ChartTooltip descriptor={macdDescriptor} />} />
            <Legend wrapperStyle={{ color: '#cbd5f5' }} />
            <ReferenceLine y={0} stroke="rgba(148, 163, 184, 0.25)" />
            <Area
              type="monotone"
              dataKey="histogram"
              name="Histogram"
              fill="#f97316"
              stroke="#f97316"
              fillOpacity={0.3}
            />
            <Line
              type="monotone"
              dataKey="macd"
              name="MACD"
              stroke="#60a5fa"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="signal"
              name="Signal"
              stroke="#facc15"
              strokeWidth={2}
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
