import { dataType, urlProps } from '@/utils/apiList'

interface fetcherDataProps extends urlProps {
  data?: dataType<any>
  body?: any // post请求数据
}
// 处理URL参数拼接
export const setGetPath = (
  url: string,
  options: fetcherDataProps | null | undefined,
) => {
  // 判断需要拼接参数
  const isQuery =
    options && options.method?.toLowerCase() !== 'post' && options.data
  console.log(isQuery, 'isQuery', options)

  return url + (isQuery ? paramsQueryString(options?.data) : '')
}

/**
 * @function 参数拼接
 * @param {object} obj 只支持非嵌套的对象
 * @returns {string}
 * @author  20223.12.12
 */
export function paramsQueryString(params: any) {
  let result = ''
  let item
  for (item in params) {
    if ((params[item] ?? '') !== '') {
      result += `&${item}=${params[item]}`
    }
  }
  if (result) {
    result = '?' + result.slice(1)
  }
  return result
}
