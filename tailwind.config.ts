// This TypeScript wrapper simply re-exports the canonical JS Tailwind config.
// Keeping a single source of truth avoids divergence and TS build noise.
import type { Config } from "tailwindcss";
 
const jsConfig = require("./tailwind.config.js");
export default jsConfig as Config;
