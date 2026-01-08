
// Utility function to merge classes and handle overrides
export const mergeClasses = (baseClasses: string, overrideClasses?: string) => {
    if (!overrideClasses) return baseClasses;
    
    // Split classes into arrays
    const baseClassArray = baseClasses.split(' ');
    const overrideClassArray = overrideClasses.split(' ');
    
    // Create a map to track which properties are being overridden
    const overrideMap = new Map();
    
    // Process override classes first to identify which properties they affect
    overrideClassArray.forEach(cls => {
        if (cls.trim()) {
            // Extract the property prefix (e.g., 'min-w', 'w', 'h', etc.)
            const propertyMatch = cls.match(/^([a-z-]+)-/);
            if (propertyMatch) {
                const property = propertyMatch[1];
                overrideMap.set(property, cls);
            }
        }
    });
    
    // Filter out base classes that have overrides
    const filteredBaseClasses = baseClassArray.filter(cls => {
        if (!cls.trim()) return true;
        const propertyMatch = cls.match(/^([a-z-]+)-/);
        if (propertyMatch) {
            const property = propertyMatch[1];
            return !overrideMap.has(property);
        }
        return true;
    });
    
    // Combine filtered base classes with override classes
    return [...filteredBaseClasses, ...overrideClassArray].join(' ');
};