import glob from 'fast-glob'
import Mocha from 'mocha'
import path from 'path'

const runMocha = (mocha: Mocha) =>
  new Promise((resolve, reject) => {
    mocha.run((failures) => {
      if (failures > 0) {
        reject(new Error(`${failures} tests failed.`))
      } else {
        resolve(void 0)
      }
    })
  })

export async function run(): Promise<void> {
  // Create the mocha test
  const mocha = new Mocha({
    ui: 'tdd',
  })

  const testsRoot = path.resolve(__dirname, '.')
  const files = await glob('**/**.test.js', { cwd: testsRoot })
  mocha.addFile(path.resolve(testsRoot, 'globalHooks.js'))

  // Add files to the test suite
  files.forEach((f) => mocha.addFile(path.resolve(testsRoot, f)))

  try {
    // Run the mocha test
    await runMocha(mocha)

    console.log('All tests passed.')
  } catch (err) {
    console.error(err)
    throw err
  }
}
