import useSWR from 'swr';
import { useStorage } from '../context/Storage';
import { fetcher } from '../util/fetcher';
import { swrConfig } from '../constants/fetch';

export default function useExpenses(groupId) {
    const { token } = useStorage()
    const { data, error } = useSWR(`/api/expenses?token=${token}&groupId=${groupId}`,
        (groupId && token) ? fetcher : null,
        swrConfig
    );

    return {
        data,
        error,
        isLoading: !error && !data,
    };
}
