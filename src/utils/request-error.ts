import { AxiosError } from "axios";

/**
 * Human-readable message for failed HTTP requests (Axios) and generic Errors.
 */
export function getRequestErrorMessage(error: unknown): string {
    if (error instanceof AxiosError) {
        const data = error.response?.data;
        if (data && typeof data === "object") {
            const msg = (data as Record<string, unknown>).message;
            if (typeof msg === "string" && msg.trim()) return msg;
            if (Array.isArray(msg)) return msg.filter(Boolean).join(", ");
            if (msg && typeof msg === "object") {
                const parts = Object.values(msg as Record<string, unknown>).flat();
                const strings = parts.filter((p): p is string => typeof p === "string");
                if (strings.length) return strings.join(", ");
            }
            const err = (data as Record<string, unknown>).error;
            if (typeof err === "string" && err.trim()) return err;
        }
        if (error.message) return error.message;
        const status = error.response?.status;
        if (status === 404) return "The requested resource was not found.";
        return "Unable to load data. Please try again.";
    }
    if (error instanceof Error) return error.message;
    return "Something went wrong.";
}
