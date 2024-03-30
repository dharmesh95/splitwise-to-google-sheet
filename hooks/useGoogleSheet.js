import useSWR from 'swr';
import { useSessionStorage } from '../context/Storage';
import { fetcher } from '../util/fetcher';
import { swrConfig } from '../constants/fetch';

export default function useGoogleSheet() {
    const { googleResponse, spreadsheet } = useSessionStorage()
    const { id, name, range } = spreadsheet ?? {}
    const accessToken = googleResponse ? googleResponse['access_token'] : undefined
    const { data, error } = useSWR(`/api/sheets/get?id=${id}&name=${name}&range=${range}&accessToken=${accessToken}`,
        (id && name && range && accessToken) ? fetcher : null,
        swrConfig
    );

    return {
        data,
        error,
        isLoading: !error && !data,
    };
}
