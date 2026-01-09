import { FaStar } from "react-icons/fa"


const StarRating = ({ rating } : { rating: number }) => {
    return (
        <span className="text-sm text-white flex items-center gap-0.5">
            {Array.from({ length: rating }).map((_i, index) => (
                <FaStar key={index} color="gold" />
            ))}
        </span>
    )
}

export default StarRating;