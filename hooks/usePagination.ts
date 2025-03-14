import { useState, useEffect } from 'react'
import { useFetcher } from '@/utils/fetch'

interface PaginationParams {
  initialPage?: number
  pageSize?: number
  // options: (page: number, pageSize: number) => Promise<any[]>
  options: any
}

const usePagination = ({
  initialPage = 1,
  pageSize = 10,
  options = {},
}: PaginationParams) => {
  const [page, setPage] = useState(initialPage)
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const request = useFetcher()

  const loadMoreData = async () => {
    if (loading || !hasMore) return
    setLoading(true)

    try {
      const newData = await request(options?.url, options?.method, {
        offset: page,
        limit: pageSize,
      })
      setData((prevData) => [...prevData, ...newData])
      setPage((prevPage) => prevPage + 1)
      if (newData.length < pageSize) {
        setHasMore(false)
      }
    } catch (error) {
      console.error('Failed to load data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMoreData()
  }, [initialPage, pageSize])

  return { data, loading, loadMoreData, hasMore }
}

export default usePagination
