import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";

const NotFound = () => {
    return (
        <div className="bg-secondary flex min-h-screen items-center justify-center px-6">
            <div className="text-center">
                <h1 className="text-[56px] font-bold leading-none text-white md:text-[106px]">404</h1>
                <p className="mt-4 text-sm text-muted-foreground md:text-base">
                    The page you are looking for does not exist.
                </p>
                <Button asChild className="mt-8 rounded-full px-6">
                    <Link to="/">Go to Homepage</Link>
                </Button>
            </div>
        </div>
    );
};

export default NotFound;
