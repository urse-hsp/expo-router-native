import {
  useGetRequest, useTriggerRequest
} from '@/hooks/useRequest';
import apiList from '@/utils/apiList';



export const useTopicDetails = (id?: number | string) => {
  return useGetRequest(
    {
      ...apiList.demo,
      // data: { id },
    }
  );
};

export const useTopicDetailsTrigger = () => {
  return useTriggerRequest(
    {
      ...apiList.demo,
    }
  );
};
