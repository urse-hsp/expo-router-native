import { AppContext } from '@/models/app'
import { useContext } from 'react'

export const useAuth = () => {
  const { appInfo }: any = useContext(AppContext)
  return appInfo?.token || false
}

export default useAuth
