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
                    primary: '#0F0C29',
                    secondary: '#302B63',
                    tertiary: '#24243E',
                },
                accent: {
                    primary: '#00D2FF',
                    secondary: '#9D50BB',
                },
                text: {
                    primary: '#FFFFFF',
                    secondary: '#B0B0B0',
                },
            },
            backgroundImage: {
                'neon-gradient': 'linear-gradient(135deg, #0F0C29, #302B63, #24243E)',
            },
            boxShadow: {
                'neon': '0 0 10px rgba(0, 210, 255, 0.5)',
                'neon-purple': '0 0 15px rgba(157, 80, 187, 0.4)',
            },
        },
    },
    plugins: [],
}
