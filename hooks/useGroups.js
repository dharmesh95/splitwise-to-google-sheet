import useSWR from 'swr';
import { useLocalStorage } from '../context/LocalStorage';

const fetcher = url => fetch(url).then(r => r.json())

export default function useGroups() {
    const { token } = useLocalStorage()
    const { data, error } = useSWR(`/api/groups?token=${token}`,
        token ? fetcher : null,
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
