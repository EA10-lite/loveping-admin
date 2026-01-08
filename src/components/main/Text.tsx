import { mergeClasses } from "../../lib/mergeclasses"

type TextProps = {
    title: string;
    className?: string;
    type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
    letterSpacing?: string | number; // Optional letter spacing prop
}

/**
 * Text component that renders text with customizable typography
 * 
 * @param title - The text content to display
 * @param className - Additional CSS classes to apply
 * @param type - HTML element type (h1-h6, p, span). Defaults to "p"
 * @param letterSpacing - Optional letter spacing value (e.g., "-2%", "0.1em", 2)
 * 
 * @example
 * <Text title="Hello" type="h1" letterSpacing="-2%" />
 * <Text title="World" type="p" />
 */
const Text = ({ title, className, type = "p", letterSpacing }: TextProps) => {
    // Build style object conditionally - only include letterSpacing if provided
    const style = letterSpacing ? { letterSpacing } : undefined;
    
    // Base classes that apply to all text elements
    const baseClasses = "text-sm font-normal text-white";
    
    // Common props for all elements
    const commonProps = {
        className: mergeClasses(baseClasses, className),
        style,
        children: title
    };
    
    // Render the appropriate element based on type
    switch (type) {
        case "h1":
            return <h1 {...commonProps} />;
        case "h2":
            return <h2 {...commonProps} />;
        case "h3":
            return <h3 {...commonProps} />;
        case "h4":
            return <h4 {...commonProps} />;
        case "h5":
            return <h5 {...commonProps} />;
        case "h6":
            return <h6 {...commonProps} />;
        case "span":
            return <span {...commonProps} />;
        case "p":
        default:
            return <p {...commonProps} />;
    }
}

export default Text;