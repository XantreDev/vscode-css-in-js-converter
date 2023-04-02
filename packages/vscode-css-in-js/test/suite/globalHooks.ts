import { before } from 'mocha'
import { sleep } from 'radash'
import * as vscode from 'vscode'

const checkExtension = async (extension: vscode.Extension<unknown>) => {
  if (!extension.isActive) {
    await extension.activate()
    console.log('extension is activated')
  }
}

before(async () => {
  const extensionId = 'xantregodlike.convert-css-in-js-reborn'
  {
    const extension = vscode.extensions.getExtension(extensionId)
    if (extension) {
      return checkExtension(extension)
    }
  }

  await sleep(2000)
  const extension = vscode.extensions.getExtension(extensionId)
  if (!extension) {
    throw new Error(`Extension "${extensionId}" not found`)
  }
})
