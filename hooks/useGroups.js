import useSWR from 'swr';
import { useSessionStorage } from '../context/SessionStorage';
import { fetcher } from '../util/fetcher';

export default function useGroups() {
    const { token } = useSessionStorage()
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
