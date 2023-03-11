import useSWR from 'swr';

const fetcher = url => fetch(url).then(r => r.json())

export default function useGoogleSheet() {
    const { data, error } = useSWR(`/api/sheet`,
        fetcher,
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
