import { Post, PostQuery, Response, Page, Message, GlobalData, Integrations, CookieConfig } from './Models';
import { stringify } from 'qs';
import config from '../../config.json';

const { apiBaseUrl } = config;

const invokeApi = async <T>(path: string, query: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', body?: any, noAuth?: boolean): Promise<Response<T>> => {
    try {
        const token = !noAuth && localStorage.getItem('masteringcreditstoken');
        const response = await fetch(apiBaseUrl + path + query, {
            headers: {
                'Content-Type': 'application/json',
                ...(!noAuth && token && { Authorization: 'Bearer ' + token })
            },
            method,
            body: body ? JSON.stringify(body) : null
        });
        const data = await response.json();
        if (response.status !== 200) {
            return { status: response.status, isError: true, errorMessage: data.message[0]?.messages[0]?.message, data };
        }
        return { status: response.status, isError: false, errorMessage: undefined, data };
    }
    catch (e) {
        return { status: 500, isError: true, errorMessage: 'Unknown Error' };
    }
};

export const getPost = async (identifier: string): Promise<Response<Post>> => {
    const query = stringify({ q: identifier }).substring(2);
    return await invokeApi(`/posts/${query}`, '', 'GET', undefined, true);
};

export const getPosts = async (query: PostQuery): Promise<Response<Post[]>> => {
    const _query = stringify(query);
    return await invokeApi(`/posts${_query ? `?${_query}` : ''}`, '', 'GET', undefined, true);
};

export const countPosts = async (query: PostQuery): Promise<Response<number>> => {
    const _query = stringify(query);
    return await invokeApi(`/posts/count${_query ? `?${_query}` : ''}`, '', 'GET', undefined, true);
};

export const getPage = async (path: string): Promise<Response<Page>> => {
    return await invokeApi('/pages/' + path, '', 'GET', undefined, true);
};

export const getGlobalData = async (): Promise<Response<GlobalData>> => {
    return await invokeApi('/global', '', 'GET', undefined, true);
};

export const getIntegrations = async (): Promise<Response<Integrations>> => {
    return await invokeApi('/integrations', '', 'GET', undefined, true);
};

export const getCookieConfig = async (): Promise<Response<CookieConfig>> => {
    return await invokeApi('/cookies', '', 'GET', undefined, true);
};

export const createMessage = async (message: Message): Promise<Response<Page>> => {
    return await invokeApi('/messages', '', 'POST', { ...message }, true);
};