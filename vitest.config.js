import { defineConfig } from "vitest/config";
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
    plugins: [react()],
    test: {
        reporters: ['verbose'],
        globals: true,
        include: ['**/*.{test,spec}.{js,jsx}'],
        environment: 'jsdom',
        setupFiles: ['./src/tests/setup.js']
    }
})