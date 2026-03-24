import { writable } from "svelte/store";

export type UserRole = 'admin' | 'user' | null;

interface AuthState {
    isAuthenticated: boolean;
    role: UserRole;
    username: string | null;
    email: string | null;
}

// 2. Estado inicial por defecto
const EMPTY_STATE: AuthState = {
    isAuthenticated: false,
    role: null,
    username: null,
    email: null,
}

const getInitialValue = (): AuthState => {
    if (typeof window === 'undefined') return EMPTY_STATE;

    const saved = localStorage.getItem('zbot-session');
    return saved ? JSON.parse(saved) : EMPTY_STATE;
}

const authStore = writable<AuthState>(getInitialValue());

authStore.subscribe((state) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('zbot-session', JSON.stringify(state));
    }
})

export const auth = {
    subscribe: authStore.subscribe,

    // Script de prueba
    login: (email: string, role: UserRole) => {
        const username = email.split('@')[0]; // Extraemos nombre por email
        authStore.set({
            isAuthenticated: true,
            role,
            username,
            email
        });
    },

    logout: () => {
        authStore.set(EMPTY_STATE);
        if (typeof window !== 'undefined') {
            localStorage.removeItem('zbot-session');
        }
        window.location.href = '/login';
    }
};

export const MOCK_USERS = [
    { email: 'admin@zaltor.com', pass: 'admin', role: 'admin' as UserRole },
    { email: 'user@zaltor.com', pass: 'user', role: 'user' as UserRole }
]
