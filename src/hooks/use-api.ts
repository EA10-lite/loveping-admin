import {
    useQuery,
    useMutation,
} from "@tanstack/react-query";
import type {
    UseQueryOptions,
    UseMutationOptions,
} from "@tanstack/react-query";
import client from "../services/client.service";
import { AxiosError } from "axios";

// --- GET Hook ---
export const useGet = <T = any>(
    key: string[],
    url: string,
    options?: Omit<UseQueryOptions<T, AxiosError>, "queryKey" | "queryFn">
) => {
    const query = useQuery<T, AxiosError>({
        queryKey: key,
        queryFn: async () => {
            const { data } = await client.get<T>(url);
            return data;
        },
        ...options,
    });

    return query;
};

// --- POST Hook ---
export const usePost = <T = any, V = any>(
    url: string,
    options?: UseMutationOptions<T, AxiosError, V>
) => {
    const mutation = useMutation<T, AxiosError, V>({
        mutationFn: async (payload: V) => {
            const { data } = await client.post<T>(url, payload);
            return data;
        },
        ...options,
    });

    return {
        ...mutation,
        post: mutation.mutate,
        postAsync: mutation.mutateAsync,
        isLoading: mutation.isPending,
    };
};

// --- PATCH Hook ---
export const usePatch = <T = any, V = any>(
    url: string,
    options?: UseMutationOptions<T, AxiosError, V>
) => {
    const mutation = useMutation<T, AxiosError, V>({
        mutationFn: async (payload: V) => {
            const { data } = await client.patch<T>(url, payload);
            return data;
        },
        ...options,
    });

    return {
        ...mutation,
        patch: mutation.mutate,
        patchAsync: mutation.mutateAsync,
        isLoading: mutation.isPending,
    };
};

// --- DELETE Hook ---
export const useDelete = <T = any>(
    url: string,
    options?: UseMutationOptions<T, AxiosError, void>
) => {
    const mutation = useMutation<T, AxiosError, void>({
        mutationFn: async () => {
            const { data } = await client.delete<T>(url);
            return data;
        },
        ...options,
    });

    return {
        ...mutation,
        remove: mutation.mutate,
        removeAsync: mutation.mutateAsync,
        isLoading: mutation.isPending,
    };
};
