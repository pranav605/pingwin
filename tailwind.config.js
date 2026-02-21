/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                background: "#09090b", // zinc-950
                card: "#18181b", // zinc-900
                border: "#27272a", // zinc-800
                primary: "#3f3f46", // zinc-700
                accent: {
                    info: "#3b82f6", // blue-500
                    warning: "#f59e0b", // amber-500
                    error: "#ef4444", // red-500
                    success: "#10b981", // emerald-500
                }
            },
        },
    },
    plugins: [],
};
