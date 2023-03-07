import useSWR from 'swr';
import { useToken } from '../context/token';

const fetcher = url => fetch(url).then(r => r.json())

export default function useGroups() {
    const { token } = useToken()
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
