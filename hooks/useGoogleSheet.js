import useSWR from 'swr';
import { useLocalStorage } from '../context/LocalStorage';
import { fetcher } from '../util/fetcher';

export default function useGoogleSheet() {
    const { googleResponse, spreadsheet } = useLocalStorage()
    const { id, name, range } = spreadsheet ?? {}
    const accessToken = googleResponse ? googleResponse['access_token'] : undefined
    const { data, error } = useSWR(`/api/sheets/get?id=${id}&name=${name}&range=${range}&accessToken=${accessToken}`,
        (id && name && range && accessToken) ? fetcher : null,
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
