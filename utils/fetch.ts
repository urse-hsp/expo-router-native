import { API_BASE_URL } from '@/constants/config'

export const request = async (endpoint: string, method = 'GET', body = null) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: {
        // 'Content-Type': 'application/json',
        // 如果需要添加 token 或其他认证信息，可以在这里加
        // 'Authorization': `Bearer ${token}`,
      },
      body: body ? JSON.stringify(body) : null,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Something went wrong!');
    }

    if (result?.code === 401) {
      // 权限过期
      // remove();
      return result;
    }

    // 报错
    if (result?.code !== 200) {
      // message.error({
      //   content: data?.msg,
      //   key: data?.msg,
      // });
    }


    return result;
  } catch (error) {
    console.error('Request error:', error);
    throw error;  // 可以根据需要自定义错误处理
  }
};

export const get = (endpoint: string) => request(endpoint, 'GET');
export const post = (endpoint: string, body: any) => request(endpoint, 'POST', body);
export const put = (endpoint: string, body: any) => request(endpoint, 'PUT', body);
export const del = (endpoint: string) => request(endpoint, 'DELETE');
