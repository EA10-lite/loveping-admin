import { CircleAlert, RefreshCw } from "lucide-react";
import Text from "./Text";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { getRequestErrorMessage } from "../../utils/request-error";

export type QueryErrorStateProps = {
    error: unknown;
    onRetry?: () => void;
    title?: string;
    className?: string;
};

/**
 * Inline error state for failed TanStack Query (or similar) GET requests.
 * Matches app panels: secondary-foreground surface, primary border, Text + Button.
 */
const QueryErrorState = ({
    error,
    onRetry,
    title = "Couldn't load this data",
    className,
}: QueryErrorStateProps) => {
    const message = getRequestErrorMessage(error);

    return (
        <div
            className={cn(
                "rounded-xl border border-primary/10 bg-secondary-foreground/80 p-8 sm:p-10",
                "flex flex-col items-center justify-center gap-4 text-center",
                className
            )}
            role="alert"
        >
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-destructive/25 bg-destructive/10">
                <CircleAlert className="size-6 text-destructive" aria-hidden />
            </div>
            <div className="max-w-md space-y-1">
                <Text title={title} type="h4" className="text-base font-medium text-white" />
                <Text
                    title={message}
                    type="p"
                    className="text-sm text-grey break-words"
                />
            </div>
            {onRetry ? (
                <Button
                    type="button"
                    variant="default"
                    className="rounded-sm px-4"
                    onClick={onRetry}
                >
                    <RefreshCw className="size-4" />
                    <span className="text-sm font-medium">Try again</span>
                </Button>
            ) : null}
        </div>
    );
};

export default QueryErrorState;
