import useSWR from 'swr';
import { useSessionStorage } from '../context/Storage';
import { fetcher } from '../util/fetcher';
import { swrConfig } from '../constants/fetch';

export default function useGroups() {
    const { token } = useSessionStorage()
    const { data, error } = useSWR(`/api/groups?token=${token}`,
        token ? fetcher : null,
        swrConfig
    );

    return {
        data,
        error,
        isLoading: !error && !data,
    };
}
