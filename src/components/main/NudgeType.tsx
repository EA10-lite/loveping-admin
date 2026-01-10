

const NudgeType = ({ type } : { type : string }) => {
    let img = "/icons/message.svg";

    if(type.toLowerCase() === "gift") img = "/icons/gift.svg";
    if(type.toLowerCase() === "call") img = "/icons/call.svg";
    return (
        <div className="flex items-center gap-1">
            <img src={img} alt={type} />
            <span className="text-white capitalize">{type}</span>
        </div>
    )
}

export default NudgeType;