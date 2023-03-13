import useSWR from 'swr';
import { useLocalStorage } from '../context/LocalStorage';
import { fetcher } from '../util/fetcher';

export default function useExpenses(groupId) {
    const { token } = useLocalStorage()
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
