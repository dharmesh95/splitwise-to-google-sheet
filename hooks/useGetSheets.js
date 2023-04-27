import useSWR from 'swr';
import { useLocalStorage } from '../context/LocalStorage';
import { fetcher } from '../util/fetcher';
import { useEffect, useState } from 'react';

export default function useGetSheets() {
    const [data, setData] = useState(null);
    const { googleResponse } = useLocalStorage()
    const accessToken = googleResponse ? googleResponse['access_token'] : undefined

    useEffect(() => {
        if (accessToken) {
            async function fetchData() {
                const response = await fetch(`/api/sheets/list?access_token=${accessToken}`);
                const data = await response.json();
                setData(data);
            }
            
            fetchData();
        }
    }, [accessToken]);

    return data
}
