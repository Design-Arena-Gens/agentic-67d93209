'use client';

import { useMemo, useState } from 'react';
import styles from './page.module.css';
import { ParameterControls } from './components/ParameterControls';
import { IndicatorChart } from './components/IndicatorChart';
import { computeZeroLagMacd, type ZeroLagMacdParams } from './lib/zlmacd';
import { defaultData } from './lib/sampleData';

const initialParams: ZeroLagMacdParams = {
  fastLength: 12,
  slowLength: 26,
  signalLength: 9,
  macdEmaLength: 9,
  algorithm: 'glaz',
  signalAveraging: 'ema',
  showDots: true
};

export default function HomePage() {
  const [params, setParams] = useState<ZeroLagMacdParams>(initialParams);

  const indicatorData = useMemo(() => computeZeroLagMacd(defaultData, params), [params]);
  const latest = indicatorData.at(-1);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Zero Lag MACD Enhanced 1.2</h1>
        <p className={styles.subtitle}>
          Web-native interpretation of the Zero Lag MACD Enhanced indicator. Adjust smoothing algorithms, experiment with
          zero-lag variants, and visualise histogram dynamics directly in your browser.
        </p>
      </header>

      <div className={styles.content}>
        <ParameterControls params={params} onChange={setParams} />

        <section className={styles.summary}>
          <article className={styles.summaryCard}>
            <span className={styles.summaryLabel}>Latest Close</span>
            <span className={styles.summaryValue}>{latest ? latest.close.toFixed(5) : '—'}</span>
          </article>
          <article className={styles.summaryCard}>
            <span className={styles.summaryLabel}>MACD</span>
            <span className={styles.summaryValue}>
              {latest?.macd != null ? latest.macd.toFixed(5) : '—'}
            </span>
          </article>
          <article className={styles.summaryCard}>
            <span className={styles.summaryLabel}>Signal</span>
            <span className={styles.summaryValue}>
              {latest?.signal != null ? latest.signal.toFixed(5) : '—'}
            </span>
          </article>
          <article className={styles.summaryCard}>
            <span className={styles.summaryLabel}>Histogram</span>
            <span className={styles.summaryValue}>
              {latest?.histogram != null ? latest.histogram.toFixed(5) : '—'}
            </span>
          </article>
        </section>

        <section className={styles.chartSection}>
          <IndicatorChart data={indicatorData} />
        </section>
      </div>
    </main>
  );
}
