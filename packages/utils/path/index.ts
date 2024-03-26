import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)

export const __dirname = path.dirname(__filename)

export const ROOT_DIR = process.cwd()

export const PACKAGE_JSON = path.join(ROOT_DIR, 'package.json')
