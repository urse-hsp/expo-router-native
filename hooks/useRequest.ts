/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */
import { dataType, urlProps } from '@/utils/apiList'
import { useFetcher } from '@/utils/fetch'
import { useEffect, useMemo, useState } from 'react'

interface fetcherDataProps extends urlProps {
  data?: dataType<any>
  body?: any // post请求数据
}

export interface useGetRequestType<Data = any, Error = any> {
  data?: Data //  通过 fetcher 用给定的 key 获取的数据（如未完全加载，返回 undefined）
  error?: Error //  fetcher 抛出的错误（或者是 undefined）
  isValidating?: boolean // 是否有请求或重新验证加载
  loading?: boolean // 是否有一个正在进行中的请求且当前没有“已加载的数据“。预设数据及之前的数据不会被视为“已加载的数据“
}

// GET请求
// useGetRequest
export function useGetRequest(options: fetcherDataProps): useGetRequestType {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const request = useFetcher()

  // GET 请求示例
  const fetchData = async () => {
    setLoading(true)

    try {
      const { data } = await request(
        options?.url,
        options?.method,
        options?.data || undefined,
      )
      setLoading(false)
      setData(data)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!options?.url) return
    fetchData()
  }, [options?.url])

  return useMemo(() => {
    return {
      data,
      loading,
    }
  }, [data, loading])
}

interface useTriggerRequest {
  trigger: (data: any) => Promise<any>
  loading: boolean
}
// trigger(arg, options)：一个用于触发远程数据更改的函数
// loading

export function useTriggerRequest(
  options: fetcherDataProps,
): useTriggerRequest {
  const [loading, setLoading] = useState(false)
  const request = useFetcher()

  // // POST 请求示例
  const trigger = async (data: any) => {
    setLoading(true)
    const data_ = {
      ...options?.data,
      ...data,
    }
    const body = Object.keys(data_).length === 0 ? null : data_

    try {
      const trigger_ = await request(options?.url, options?.method, body)
      setLoading(false)
      return trigger_
    } catch (error) {
      setLoading(false)
      console.error(error)
    }
  }

  return { trigger, loading }
}

// 分页请求
interface PaginationParams {
  initialPage?: number
  pageSize?: number
  options: fetcherDataProps
}
export const usePaginationRequest = ({
  initialPage = 0,
  pageSize = 10,
  options,
}: PaginationParams) => {
  const [page, setPage] = useState(initialPage)
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const request = useFetcher()

  const loadMoreData = async (page_ = page) => {
    if (loading || !hasMore) return
    setLoading(true)

    try {
      const { data: data_, total_count } = await request(
        options?.url,
        options?.method,
        {
          offset: page_,
          limit: pageSize,
        },
      )
      setData((prevData) => [...prevData, ...data_?.data])
      setPage((prevPage) => prevPage + 1)

      // 判断最后一页
      if (data?.length < pageSize) {
        setHasMore(false)
      }
    } catch (error) {
      console.error('Failed to load data:', error)
    } finally {
      setLoading(false)
    }
  }

  const Next = () => {
    setPage((prevPage) => {
      const page_ = prevPage + 1
      loadMoreData(page_)
      return page_
    })
  }

  const reset = () => {
    setPage(initialPage)
    setData([])
    setHasMore(true)
  }

  useEffect(() => {
    loadMoreData()
  }, [initialPage, pageSize])

  return { data, loading, loadMoreData, hasMore, Next, reset }
}
