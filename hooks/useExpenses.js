import useSWR from 'swr';
import { useSessionStorage } from '../context/SessionStorage';
import { fetcher } from '../util/fetcher';

export default function useExpenses(groupId) {
    const { token } = useSessionStorage()
    const { data, error } = useSWR(`/api/expenses?token=${token}&groupId=${groupId}`,
        (groupId && token) ? fetcher : null,
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
            revalidateOnReconnect: false
        }
    );

    return {
        data,
        error,
        isLoading: !error && !data,
    };
}
