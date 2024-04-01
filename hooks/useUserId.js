import useSWR from 'swr';
import { useStorage } from '../context/Storage';
import { fetcher } from '../util/fetcher';
import { swrConfig } from '../constants/fetch';

export default function useUserId() {
    const { token } = useStorage()
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
