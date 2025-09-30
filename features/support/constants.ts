// Application URLs
export const URLS = {
    BASE_URL: 'http://localhost:3456/',
} as const;

// Timeouts (in milliseconds)
export const TIMEOUTS = {
    SHORT: 5000,
    DEFAULT: 10000,
    LONG: 30000,
    SCORE_WAIT: 50000,
} as const;

// Arrow key mappings
export const ARROW_KEYS = {
    UP: 'ArrowUp',
    DOWN: 'ArrowDown',
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight',
} as const;

// Direction mappings
export const DIRECTIONS = {
    up: ARROW_KEYS.UP,
    down: ARROW_KEYS.DOWN,
    left: ARROW_KEYS.LEFT,
    right: ARROW_KEYS.RIGHT,
} as const;

export type Direction = keyof typeof DIRECTIONS;
