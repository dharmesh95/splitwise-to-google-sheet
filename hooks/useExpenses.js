import useSWR from 'swr';
import { useToken } from '../context/token';

const fetcher = url => fetch(url).then(r => r.json())

export default function useExpenses(groupId) {
    const { token } = useToken()
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
