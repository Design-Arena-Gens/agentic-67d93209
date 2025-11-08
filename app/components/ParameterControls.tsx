'use client';

import { ChangeEvent } from 'react';
import styles from './ParameterControls.module.css';
import type { ZeroLagMacdParams } from '../lib/zlmacd';

interface ParameterControlsProps {
  params: ZeroLagMacdParams;
  onChange: (params: ZeroLagMacdParams) => void;
}

const toNumber = (value: string) => (Number.isNaN(Number(value)) ? 0 : Number(value));

const handleNumericChange = <K extends 'fastLength' | 'slowLength' | 'signalLength' | 'macdEmaLength'>(
  event: ChangeEvent<HTMLInputElement>,
  key: K,
  params: ZeroLagMacdParams,
  onChange: ParameterControlsProps['onChange']
) => {
  onChange({
    ...params,
    [key]: toNumber(event.target.value)
  });
};

const handleSelectChange = <K extends 'algorithm' | 'signalAveraging'>(
  event: ChangeEvent<HTMLSelectElement>,
  key: K,
  params: ZeroLagMacdParams,
  onChange: ParameterControlsProps['onChange']
) => {
  onChange({
    ...params,
    [key]: event.target.value as ZeroLagMacdParams[K]
  });
};

export function ParameterControls({ params, onChange }: ParameterControlsProps) {
  return (
    <section className={styles.panel}>
      <div className={styles.grid}>
        <label className={styles.label}>
          Fast ZLEMA
          <input
            className={styles.input}
            type="number"
            min={1}
            value={params.fastLength}
            onChange={(event) => handleNumericChange(event, 'fastLength', params, onChange)}
          />
        </label>

        <label className={styles.label}>
          Slow ZLEMA
          <input
            className={styles.input}
            type="number"
            min={1}
            value={params.slowLength}
            onChange={(event) => handleNumericChange(event, 'slowLength', params, onChange)}
          />
        </label>

        <label className={styles.label}>
          Signal Length
          <input
            className={styles.input}
            type="number"
            min={1}
            value={params.signalLength}
            onChange={(event) => handleNumericChange(event, 'signalLength', params, onChange)}
          />
        </label>

        <label className={styles.label}>
          MACD EMA Length
          <input
            className={styles.input}
            type="number"
            min={0}
            value={params.macdEmaLength}
            onChange={(event) => handleNumericChange(event, 'macdEmaLength', params, onChange)}
          />
        </label>

        <label className={styles.label}>
          Algorithm
          <select
            className={styles.select}
            value={params.algorithm}
            onChange={(event) => handleSelectChange(event, 'algorithm', params, onChange)}
          >
            <option value="glaz">Glaz (Zero-Lag Blend)</option>
            <option value="legacy">Legacy (Double EMA Compensation)</option>
          </select>
        </label>

        <label className={styles.label}>
          Signal Average
          <select
            className={styles.select}
            value={params.signalAveraging}
            onChange={(event) => handleSelectChange(event, 'signalAveraging', params, onChange)}
          >
            <option value="ema">EMA</option>
            <option value="sma">SMA (Glaz Mode)</option>
          </select>
        </label>
      </div>

      <label className={styles.checkboxRow}>
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={params.showDots}
          onChange={(event) =>
            onChange({
              ...params,
              showDots: event.target.checked
            })
          }
        />
        Show Positive Histogram Dots on Price
      </label>
    </section>
  );
}
