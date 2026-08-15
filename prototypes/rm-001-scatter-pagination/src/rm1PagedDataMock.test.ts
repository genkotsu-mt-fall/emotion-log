import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  fetchEarlierEmotionLogs,
  fetchInitialEmotionLogs,
  type MockFetchResponse,
} from './rm1PagedDataMock'

const PROTOTYPE_FETCH_DELAY_MS = 1000

async function resolvePrototypeFetch(
  fetchPromise: Promise<MockFetchResponse>,
): Promise<MockFetchResponse> {
  await vi.advanceTimersByTimeAsync(PROTOTYPE_FETCH_DELAY_MS)
  return fetchPromise
}

function getEmotionLogIds(response: MockFetchResponse): string[] {
  return response.items.map((emotionLog) => emotionLog.id)
}

describe('rm1PagedDataMock', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.clearAllTimers()
    vi.useRealTimers()
  })

  it('初期取得で5件と取得範囲を返す', async () => {
    const response = await resolvePrototypeFetch(fetchInitialEmotionLogs())

    expect(getEmotionLogIds(response)).toEqual([
      'log-001',
      'log-002',
      'log-003',
      'log-004',
      'log-005',
    ])
    expect(response.range).toEqual({
      from: '2026-07-17T00:00:00+09:00',
      to: '2026-08-16T00:00:00+09:00',
    })
    expect(response.hasEarlier).toBe(true)
  })

  it('追加取得1で境界のlog-005を再掲載する', async () => {
    const response = await resolvePrototypeFetch(
      fetchEarlierEmotionLogs('2026-07-17T00:00:00+09:00'),
    )

    expect(getEmotionLogIds(response)).toEqual([
      'log-005',
      'log-006',
      'log-007',
      'log-008',
      'log-009',
    ])
    expect(response.range).toEqual({
      from: '2026-06-17T00:00:00+09:00',
      to: '2026-07-17T00:00:00+09:00',
    })
    expect(response.hasEarlier).toBe(true)
  })

  it('追加取得2で境界のlog-009を再掲載する', async () => {
    const response = await resolvePrototypeFetch(
      fetchEarlierEmotionLogs('2026-06-17T00:00:00+09:00'),
    )

    expect(getEmotionLogIds(response)).toEqual([
      'log-009',
      'log-010',
      'log-011',
      'log-012',
      'log-013',
    ])
    expect(response.range).toEqual({
      from: '2026-05-18T00:00:00+09:00',
      to: '2026-06-17T00:00:00+09:00',
    })
    expect(response.hasEarlier).toBe(true)
  })

  it('追加取得3で境界のlog-013を再掲載し最古到達を返す', async () => {
    const response = await resolvePrototypeFetch(
      fetchEarlierEmotionLogs('2026-05-18T00:00:00+09:00'),
    )

    expect(getEmotionLogIds(response)).toEqual([
      'log-013',
      'log-014',
      'log-015',
      'log-016',
    ])
    expect(response.range).toEqual({
      from: '2026-04-18T00:00:00+09:00',
      to: '2026-05-18T00:00:00+09:00',
    })
    expect(response.hasEarlier).toBe(false)
  })

  it('最古より過去では0件かつhasEarlier=falseを返す', async () => {
    const response = await resolvePrototypeFetch(
      fetchEarlierEmotionLogs('2026-04-18T00:00:00+09:00'),
    )

    expect(response.items).toEqual([])
    expect(response.range).toEqual({
      from: '2026-03-19T00:00:00+09:00',
      to: '2026-04-18T00:00:00+09:00',
    })
    expect(response.hasEarlier).toBe(false)
  })

  it('4取得の延べ件数19件とユニーク累計5→9→13→16を再現する', async () => {
    const responses = [
      await resolvePrototypeFetch(fetchInitialEmotionLogs()),
      await resolvePrototypeFetch(
        fetchEarlierEmotionLogs('2026-07-17T00:00:00+09:00'),
      ),
      await resolvePrototypeFetch(
        fetchEarlierEmotionLogs('2026-06-17T00:00:00+09:00'),
      ),
      await resolvePrototypeFetch(
        fetchEarlierEmotionLogs('2026-05-18T00:00:00+09:00'),
      ),
    ]

    expect(responses.map((response) => response.items.length)).toEqual([
      5, 5, 5, 4,
    ])
    expect(
      responses.reduce(
        (receivedCount, response) => receivedCount + response.items.length,
        0,
      ),
    ).toBe(19)

    const uniqueEmotionLogIds = new Set<string>()
    const cumulativeUniqueCounts = responses.map((response) => {
      for (const emotionLog of response.items) {
        uniqueEmotionLogIds.add(emotionLog.id)
      }

      return uniqueEmotionLogIds.size
    })

    expect(cumulativeUniqueCounts).toEqual([5, 9, 13, 16])
    expect(uniqueEmotionLogIds.size).toBe(16)
  })

  it('未定義のtoExclusiveは1000ms待たずにrejectする', async () => {
    await expect(
      fetchEarlierEmotionLogs('2026-07-10T00:00:00+09:00'),
    ).rejects.toThrow('RM1で未定義の取得境界です')

    expect(vi.getTimerCount()).toBe(0)
  })

  it('正常取得は999msでは完了せず1000msで完了する', async () => {
    let isSettled = false
    const fetchPromise = fetchInitialEmotionLogs().finally(() => {
      isSettled = true
    })

    await vi.advanceTimersByTimeAsync(999)
    expect(isSettled).toBe(false)

    await vi.advanceTimersByTimeAsync(1)
    await expect(fetchPromise).resolves.toBeDefined()
    expect(isSettled).toBe(true)
  })
})
