import { build } from 'esbuild'
import glob from 'fast-glob'
import { existsSync, rm } from 'fs'
import { resolve } from 'path'
import { promisify } from 'util'

const ROOT = resolve(__dirname, '..')
const TESTS_ROOT = resolve(ROOT, './test')
const DIST_ROOT = resolve(ROOT, './dist-test')

const run = async () => {
  const removeDistPromise = existsSync(DIST_ROOT)
    ? promisify(rm)(DIST_ROOT, {
        recursive: true,
      })
    : Promise.resolve()

  const files = await glob('./**', { cwd: TESTS_ROOT })

  await removeDistPromise
  await Promise.all(
    files.map(async (file) =>
      build({
        entryPoints: [resolve(TESTS_ROOT, file)],
        platform: 'node',
        format: 'cjs',
        outfile: resolve(DIST_ROOT, file.replace('.ts', '.js')),
      })
    )
  )
}

console.time('Execution time')
run().then(() => {
  console.timeEnd('Execution time')
})
