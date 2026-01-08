import React from "react";

interface ErrorProps {
    error?:       string | null;
    visible: boolean;
}

const Error: React.FC<ErrorProps> = ({ error, visible }) => {
    if(!visible) return null;

    return (
        <p className="text-xs text-[#FF0000]"> {error} </p>
    )
}

export default Error;