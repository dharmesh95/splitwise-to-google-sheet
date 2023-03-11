import useSWR from 'swr';
import { useLocalStorage } from '../context/LocalStorage';

const fetcher = url => fetch(url).then(r => r.json())

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
