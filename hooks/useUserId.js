import useSWR from 'swr';
import { useSessionStorage } from '../context/Storage';
import { fetcher } from '../util/fetcher';
import { swrConfig } from '../constants/fetch';

export default function useUserId() {
    const { token } = useSessionStorage()
    const { data, error } = useSWR(`/api/user?token=${token}`,
        fetcher,
        swrConfig
    );

    return {
        data,
        error,
        isLoading: !error && !data,
    };
}
