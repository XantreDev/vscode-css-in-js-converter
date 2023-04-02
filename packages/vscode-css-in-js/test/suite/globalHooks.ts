import { before } from 'mocha'
import * as vscode from 'vscode'

const extensionId = 'xantregodlike.convert-css-in-js-reborn'
before(async () => {
  const extension = vscode.extensions.getExtension(extensionId)

  if (!extension) {
    throw new Error(`Extension "${extensionId}" not found`)
  }

  if (!extension.isActive) {
    await extension.activate()
    console.log('extension is activated')
  }
})
