import { useState } from 'react'
import Plot, { type Figure } from 'react-plotly.js'

type FixedEmotionLog = {
  readonly feltAt: string
  readonly moodValue: number
  readonly emoji: string
}

type VisibleRange = {
  readonly start: string
  readonly end: string
}

const MIN_MOOD_VALUE = 0
const MAX_MOOD_VALUE = 100

// T006で過去方向の移動制約を確認するための仮下限。本番で扱う最古日時ではない。
const PROTOTYPE_EARLIEST_ALLOWED_DATE_TIME = '1989-01-01T00:00:00+09:00'

// ページを開いた時点より未来へ移動させないため、ブラウザでこのmoduleを読み込んだ時刻を上限にする。
const PROTOTYPE_LATEST_ALLOWED_DATE_TIME = new Date().toISOString()

// T006で初期表示範囲を確実に取得するための検証用の仮値。本番の初期表示仕様ではない。
const PROTOTYPE_INITIAL_VISIBLE_START = '2026-08-10T00:00:00+09:00'
const PROTOTYPE_CONFIGURED_INITIAL_VISIBLE_END = '2026-08-15T00:00:00+09:00'

/** 初期表示終了がページ読込時刻より未来にならないよう、T006の仮値を上限日時で抑える。 */
function getPrototypeInitialVisibleEnd(): string {
  const configuredInitialEndTime = Date.parse(
    PROTOTYPE_CONFIGURED_INITIAL_VISIBLE_END,
  )
  const latestAllowedTime = Date.parse(PROTOTYPE_LATEST_ALLOWED_DATE_TIME)

  return configuredInitialEndTime <= latestAllowedTime
    ? PROTOTYPE_CONFIGURED_INITIAL_VISIBLE_END
    : PROTOTYPE_LATEST_ALLOWED_DATE_TIME
}

const PROTOTYPE_INITIAL_VISIBLE_END = getPrototypeInitialVisibleEnd()

// 最小描画の成立確認に必要な固定データ。本番のEmotionLogモデルや保存形式を表すものではない。
const FIXED_EMOTION_LOGS: readonly FixedEmotionLog[] = [
  { feltAt: '2026-08-11T09:00:00+09:00', moodValue: 20, emoji: '😞' },
  { feltAt: '2026-08-12T15:00:00+09:00', moodValue: 50, emoji: '😐' },
  { feltAt: '2026-08-13T21:00:00+09:00', moodValue: 80, emoji: '😊' },
]

const emotionScatterPlotData: unknown[] = [
  {
    type: 'scatter',
    mode: 'text',
    x: FIXED_EMOTION_LOGS.map((emotionLog) => emotionLog.feltAt),
    y: FIXED_EMOTION_LOGS.map((emotionLog) => emotionLog.moodValue),
    text: FIXED_EMOTION_LOGS.map((emotionLog) => emotionLog.emoji),
    textfont: { size: 30 },
  },
]

const emotionScatterPlotLayout: unknown = {
  autosize: true,
  margin: { l: 64, r: 24, t: 24, b: 64 },
  showlegend: false,
  xaxis: {
    type: 'date',
    range: [
      PROTOTYPE_INITIAL_VISIBLE_START,
      PROTOTYPE_INITIAL_VISIBLE_END,
    ],
    minallowed: PROTOTYPE_EARLIEST_ALLOWED_DATE_TIME,
    maxallowed: PROTOTYPE_LATEST_ALLOWED_DATE_TIME,
    title: { text: '日時' },
  },
  yaxis: {
    range: [MIN_MOOD_VALUE, MAX_MOOD_VALUE],
    fixedrange: true,
    title: { text: '気分値' },
  },
}

const emotionScatterPlotConfig: unknown = {
  displaylogo: false,
  responsive: true,
  // Emotion Logでは範囲選択を使わないため、不要な選択ツールをmodebarから外す。
  // PNG保存の所有者別表示は、所有者判定を導入する後続タスクで扱う。
  modeBarButtonsToRemove: ['select2d', 'lasso2d'],
}

/** Plotlyから受け取るunknown値のプロパティを安全に読むための型ガード。 */
function isStringKeyedRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

/**
 * Plotlyのx軸range境界を、アプリ側で保持する文字列へ正規化する。
 * 読み取れない値は通常の変換失敗としてnullを返す。
 */
function normalizePlotlyRangeBoundary(
  plotlyRangeBoundary: unknown,
): string | null {
  if (typeof plotlyRangeBoundary === 'string') return plotlyRangeBoundary
  if (!(plotlyRangeBoundary instanceof Date)) return null
  if (Number.isNaN(plotlyRangeBoundary.getTime())) return null

  return plotlyRangeBoundary.toISOString()
}

/**
 * Plotly layoutのxaxis.rangeだけを取り出し、Plotlyに依存しないVisibleRangeへ変換する。
 * 初期化時にrangeを読み取れない場合はnullを返し、Plotly固有オブジェクトはアプリ状態へ残さない。
 */
function extractVisibleRangeFromPlotlyLayout(
  plotlyLayout: unknown,
): VisibleRange | null {
  if (!isStringKeyedRecord(plotlyLayout)) return null

  const plotlyXAxis = plotlyLayout.xaxis
  if (!isStringKeyedRecord(plotlyXAxis)) return null

  const plotlyXAxisRange = plotlyXAxis.range
  if (!Array.isArray(plotlyXAxisRange) || plotlyXAxisRange.length < 2) {
    return null
  }

  const visibleStart = normalizePlotlyRangeBoundary(plotlyXAxisRange[0])
  const visibleEnd = normalizePlotlyRangeBoundary(plotlyXAxisRange[1])
  if (visibleStart === null || visibleEnd === null) return null

  return { start: visibleStart, end: visibleEnd }
}

function App() {
  const [visibleRange, setVisibleRange] = useState<VisibleRange | null>(null)

  // T006では初期表示範囲だけを取り込む。パン後の範囲更新はRM1-T011で扱う。
  const handlePlotInitialized = (plotlyFigure: Figure) => {
    const initializedVisibleRange = extractVisibleRangeFromPlotlyLayout(
      plotlyFigure.layout,
    )
    if (initializedVisibleRange === null) return

    setVisibleRange(initializedVisibleRange)
  }

  return (
    <main className="prototype-shell">
      <header>
        <p className="eyebrow">RM1 prototype</p>
        <h1>Emotion Log</h1>
      </header>

      <section className="plot-panel" aria-label="Emotion log scatter plot">
        <Plot
          data={emotionScatterPlotData}
          layout={emotionScatterPlotLayout}
          config={emotionScatterPlotConfig}
          onInitialized={handlePlotInitialized}
          className="emotion-plot"
          style={{ width: '100%', height: '100%' }}
          useResizeHandler
        />
      </section>

      <section
        className="range-panel"
        aria-label="T006 visible time range verification"
      >
        {visibleRange === null ? (
          <p>表示時間範囲を取得中です。</p>
        ) : (
          <p>
            <code>{visibleRange.start}</code>
            <span aria-hidden="true"> 〜 </span>
            <code>{visibleRange.end}</code>
          </p>
        )}
      </section>
    </main>
  )
}

export default App
