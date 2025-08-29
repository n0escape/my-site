import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr";
import { defineConfig } from "vite"
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(), 
		svgr()
	],
	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
		}
	}
})
