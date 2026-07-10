const isLngLatBoundsArray = (bounds) => {
    return Array.isArray(bounds)
        && bounds.length === 2
        && Array.isArray(bounds[0])
        && Array.isArray(bounds[1])
        && bounds[0].length === 2
        && bounds[1].length === 2
        && bounds.flat().every(Number.isFinite);
};

export const combineLngLatBounds = (boundsList) => {
    return boundsList.reduce((combined, bounds) => {
        if (!isLngLatBoundsArray(bounds)) return combined;
        if (!combined) return bounds;

        return [
            [
                Math.min(combined[0][0], bounds[0][0]),
                Math.min(combined[0][1], bounds[0][1]),
            ],
            [
                Math.max(combined[1][0], bounds[1][0]),
                Math.max(combined[1][1], bounds[1][1]),
            ],
        ];
    }, null);
};
