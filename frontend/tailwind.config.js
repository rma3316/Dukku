/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                bg: {
                    primary: '#0A0A0F',
                    secondary: '#111118',
                    tertiary: '#18181F',
                    elevated: '#1E1E28',
                },
                accent: {
                    primary: '#4F8EF7',
                    secondary: '#A78BFA',
                },
                border: {
                    subtle: 'rgba(255,255,255,0.06)',
                    default: 'rgba(255,255,255,0.1)',
                    focus: 'rgba(79,142,247,0.5)',
                },
                text: {
                    primary: '#F0F0F5',
                    secondary: '#7A7A8C',
                    muted: '#4A4A5A',
                },
            },
            boxShadow: {
                'neon': '0 0 16px rgba(79, 142, 247, 0.35)',
                'neon-purple': '0 0 16px rgba(167, 139, 250, 0.3)',
                'card': '0 4px 24px rgba(0,0,0,0.4)',
                'inset-top': 'inset 0 1px 0 rgba(255,255,255,0.06)',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
        },
    },
    plugins: [],
}
