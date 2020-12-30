import { useState, useCallback, useRef } from 'react';
import { Response } from '../tools/Models';

export function useInfiniteItems<T>(getItems: (page: number, pageSize: number) => Promise<Response<T[]>>, initialValue?: T[], pageSize: number = 30) {
    const [items, setItems] = useState<T[]>(initialValue || []);
    const [isLoading, setIsLoading] = useState(false);
    const [isReloading, setIsReloading] = useState(false);
    const [pageLimitReached, setPageLimitReached] = useState(initialValue ? initialValue.length < pageSize : false);
    const latestReload = useRef(0);
    const latestLoad = useRef(0);
    const currentPage = useRef(0);
    const preventNextPage = useRef(false);

    const reloadItems = useCallback(async () => {
        preventNextPage.current = true;
        currentPage.current = 0;
        const time = Date.now();
        setIsLoading(true);
        setIsReloading(true);
        const itemsResponse = await getItems(0, pageSize);
        const newItems = (!itemsResponse.isError && itemsResponse.data) || [];
        if (time <= latestReload.current) {
            return;
        }
        latestReload.current = time;
        setItems(newItems);
        setIsLoading(false);
        setIsReloading(false);
        if (newItems?.length < pageSize) {
            setPageLimitReached(true);
            preventNextPage.current = true;
        } else {
            setPageLimitReached(false);
            preventNextPage.current = false;
        }
    }, [getItems]);

    const loadNextItems = useCallback(async () => {
        if (preventNextPage.current) {
            return;
        }
        preventNextPage.current = true;
        const time = Date.now();
        setIsLoading(true);
        currentPage.current += 1;
        const itemsResponse = await getItems(currentPage.current, pageSize);
        const newItems = (!itemsResponse.isError && itemsResponse.data) || [];
        if (time <= latestLoad.current) {
            return;
        }
        latestLoad.current = time;
        setItems([...items, ...newItems]);
        if (newItems.length < pageSize) {
            setPageLimitReached(true);
            preventNextPage.current = true;
        } else {
            setPageLimitReached(false);
            preventNextPage.current = false;
        }
        setIsLoading(false);
    }, [items, getItems]);

    return { items, reloadItems, loadNextItems, isLoading, isReloading, pageLimitReached };
}