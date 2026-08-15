export type Rm1EmotionLog = {
  readonly id: string
  readonly feltAt: string
  readonly moodValue: number
  readonly emoji: string
}

export type MockFetchRange = {
  readonly from: string
  readonly to: string
}

export type MockFetchResponse = {
  readonly items: readonly Rm1EmotionLog[]
  readonly range: MockFetchRange
  readonly hasEarlier: boolean
}

type MockFetchScenario = {
  readonly itemIds: readonly string[]
  readonly range: MockFetchRange
  readonly hasEarlier: boolean
}

const PROTOTYPE_FETCH_DELAY_MS = 1000

// RM1-T008で固定した16件を正本とする。RM 1検証用であり、本番のEmotionLogモデルではない。
const FIXED_RM1_EMOTION_LOGS: readonly Rm1EmotionLog[] = [
  {
    id: 'log-001',
    feltAt: '2026-08-15T09:00:00+09:00',
    moodValue: 75,
    emoji: '🙂',
  },
  {
    id: 'log-002',
    feltAt: '2026-08-08T20:30:00+09:00',
    moodValue: 25,
    emoji: '😞',
  },
  {
    id: 'log-003',
    feltAt: '2026-07-31T12:00:00+09:00',
    moodValue: 100,
    emoji: '😄',
  },
  {
    id: 'log-004',
    feltAt: '2026-07-17T00:00:00+09:00',
    moodValue: 50,
    emoji: '😐',
  },
  {
    id: 'log-005',
    feltAt: '2026-07-17T00:00:00+09:00',
    moodValue: 50,
    emoji: '😶',
  },
  {
    id: 'log-006',
    feltAt: '2026-07-16T23:00:00+09:00',
    moodValue: 60,
    emoji: '🙂',
  },
  {
    id: 'log-007',
    feltAt: '2026-07-03T07:30:00+09:00',
    moodValue: 0,
    emoji: '😢',
  },
  {
    id: 'log-008',
    feltAt: '2026-06-25T12:00:00+09:00',
    moodValue: 80,
    emoji: '😄',
  },
  {
    id: 'log-009',
    feltAt: '2026-06-17T00:00:00+09:00',
    moodValue: 40,
    emoji: '😕',
  },
  {
    id: 'log-010',
    feltAt: '2026-06-16T23:00:00+09:00',
    moodValue: 30,
    emoji: '😞',
  },
  {
    id: 'log-011',
    feltAt: '2026-06-05T08:00:00+09:00',
    moodValue: 90,
    emoji: '😄',
  },
  {
    id: 'log-012',
    feltAt: '2026-05-25T21:00:00+09:00',
    moodValue: 20,
    emoji: '😢',
  },
  {
    id: 'log-013',
    feltAt: '2026-05-18T00:00:00+09:00',
    moodValue: 70,
    emoji: '🙂',
  },
  {
    id: 'log-014',
    feltAt: '2026-05-17T23:00:00+09:00',
    moodValue: 35,
    emoji: '😕',
  },
  {
    id: 'log-015',
    feltAt: '2026-05-01T10:00:00+09:00',
    moodValue: 65,
    emoji: '🙂',
  },
  {
    id: 'log-016',
    feltAt: '2026-04-18T00:00:00+09:00',
    moodValue: 50,
    emoji: '😐',
  },
]

const RM1_EMOTION_LOG_BY_ID: ReadonlyMap<string, Rm1EmotionLog> = new Map(
  FIXED_RM1_EMOTION_LOGS.map((emotionLog) => [emotionLog.id, emotionLog]),
)

const INITIAL_FETCH_SCENARIO: MockFetchScenario = {
  itemIds: ['log-001', 'log-002', 'log-003', 'log-004', 'log-005'],
  range: {
    from: '2026-07-17T00:00:00+09:00',
    to: '2026-08-16T00:00:00+09:00',
  },
  hasEarlier: true,
}

const EARLIER_FETCH_SCENARIOS_BY_TO_EXCLUSIVE: ReadonlyMap<
  string,
  MockFetchScenario
> = new Map([
  [
    '2026-07-17T00:00:00+09:00',
    {
      itemIds: ['log-005', 'log-006', 'log-007', 'log-008', 'log-009'],
      range: {
        from: '2026-06-17T00:00:00+09:00',
        to: '2026-07-17T00:00:00+09:00',
      },
      hasEarlier: true,
    },
  ],
  [
    '2026-06-17T00:00:00+09:00',
    {
      itemIds: ['log-009', 'log-010', 'log-011', 'log-012', 'log-013'],
      range: {
        from: '2026-05-18T00:00:00+09:00',
        to: '2026-06-17T00:00:00+09:00',
      },
      hasEarlier: true,
    },
  ],
  [
    '2026-05-18T00:00:00+09:00',
    {
      itemIds: ['log-013', 'log-014', 'log-015', 'log-016'],
      range: {
        from: '2026-04-18T00:00:00+09:00',
        to: '2026-05-18T00:00:00+09:00',
      },
      hasEarlier: false,
    },
  ],
  [
    '2026-04-18T00:00:00+09:00',
    {
      itemIds: [],
      range: {
        from: '2026-03-19T00:00:00+09:00',
        to: '2026-04-18T00:00:00+09:00',
      },
      hasEarlier: false,
    },
  ],
])

function findRm1EmotionLogsByIds(
  emotionLogIds: readonly string[],
): readonly Rm1EmotionLog[] {
  return emotionLogIds.map((emotionLogId) => {
    const emotionLog = RM1_EMOTION_LOG_BY_ID.get(emotionLogId)

    if (emotionLog === undefined) {
      throw new Error(`RM1の正本に未定義のIDです: ${emotionLogId}`)
    }

    return emotionLog
  })
}

function createMockFetchResponse(
  fetchScenario: MockFetchScenario,
): MockFetchResponse {
  return {
    items: findRm1EmotionLogsByIds(fetchScenario.itemIds),
    range: {
      from: fetchScenario.range.from,
      to: fetchScenario.range.to,
    },
    hasEarlier: fetchScenario.hasEarlier,
  }
}

function resolveAfterPrototypeFetchDelay(
  response: MockFetchResponse,
): Promise<MockFetchResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(response)
    }, PROTOTYPE_FETCH_DELAY_MS)
  })
}

export function fetchInitialEmotionLogs(): Promise<MockFetchResponse> {
  return resolveAfterPrototypeFetchDelay(
    createMockFetchResponse(INITIAL_FETCH_SCENARIO),
  )
}

export function fetchEarlierEmotionLogs(
  toExclusive: string,
): Promise<MockFetchResponse> {
  const fetchScenario = EARLIER_FETCH_SCENARIOS_BY_TO_EXCLUSIVE.get(toExclusive)

  if (fetchScenario === undefined) {
    return Promise.reject(
      new Error(`RM1で未定義の取得境界です: ${toExclusive}`),
    )
  }

  return resolveAfterPrototypeFetchDelay(createMockFetchResponse(fetchScenario))
}
