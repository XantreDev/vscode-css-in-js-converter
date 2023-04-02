export const sleep = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time))
import { Selection, TextEditor } from 'vscode'

export const selectAllText = (editor: TextEditor) => {
  // Get the document associated with the active text editor
  const document = editor.document

  // Calculate the range that spans the entire document
  const startPosition = document.positionAt(0)
  const endPosition = document.positionAt(document.getText().length)

  // Set the selection in the active text editor
  editor.selection = new Selection(startPosition, endPosition)
}

export const writeText = (editor: TextEditor) => (content: string) =>
  editor.edit((editBuilder) => {
    editBuilder.insert(editor.selection.active, content)
  })
