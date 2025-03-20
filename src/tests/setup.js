import '@testing-library/jest-dom'
import { readFile } from 'fs/promises'
import { fileURLToPath } from 'url'
import path from 'path'
import { beforeAll } from 'vitest'


beforeAll(async () => {
  const fileName = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(fileName)
  const filePath = path.resolve(__dirname, '../../public/data.json')
  globalThis.data = (JSON.parse(await readFile(filePath)))
})