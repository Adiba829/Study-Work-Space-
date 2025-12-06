import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import CodeBlock from '@tiptap/extension-code-block'
import { useEffect } from 'react'
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Image as ImageIcon,
  Table as TableIcon,
  Code,
  Quote,
  CheckSquare,
} from 'lucide-react'

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null
  }

  const addImage = () => {
    const url = window.prompt('Enter image URL:')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const addTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
  }

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 p-2 flex flex-wrap gap-2">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`p-2 rounded ${
          editor.isActive('bold')
            ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
            : 'hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
      >
        <Bold size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`p-2 rounded ${
          editor.isActive('italic')
            ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
            : 'hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
      >
        <Italic size={18} />
      </button>
      <div className="w-px bg-gray-300 dark:bg-gray-600 mx-1" />
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-2 rounded ${
          editor.isActive('heading', { level: 1 })
            ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
            : 'hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
      >
        <Heading1 size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded ${
          editor.isActive('heading', { level: 2 })
            ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
            : 'hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
      >
        <Heading2 size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`p-2 rounded ${
          editor.isActive('heading', { level: 3 })
            ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
            : 'hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
      >
        <Heading3 size={18} />
      </button>
      <div className="w-px bg-gray-300 dark:bg-gray-600 mx-1" />
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded ${
          editor.isActive('bulletList')
            ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
            : 'hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
      >
        <List size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded ${
          editor.isActive('orderedList')
            ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
            : 'hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
      >
        <ListOrdered size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleTaskList().run()}
        className={`p-2 rounded ${
          editor.isActive('taskList')
            ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
            : 'hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
      >
        <CheckSquare size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-2 rounded ${
          editor.isActive('blockquote')
            ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
            : 'hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
      >
        <Quote size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`p-2 rounded ${
          editor.isActive('codeBlock')
            ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
            : 'hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
      >
        <Code size={18} />
      </button>
      <div className="w-px bg-gray-300 dark:bg-gray-600 mx-1" />
      <button onClick={addImage} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
        <ImageIcon size={18} />
      </button>
      <button onClick={addTable} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
        <TableIcon size={18} />
      </button>
    </div>
  )
}

export default function BlockEditor({ content = '', onSave, autoSave = false }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      CodeBlock.configure({
        HTMLAttributes: {
          class: 'bg-gray-100 dark:bg-gray-800 p-4 rounded',
        },
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: 'prose prose-lg dark:prose-invert max-w-none focus:outline-none p-6 min-h-[500px]',
      },
    },
  })

  // Auto-save functionality
  useEffect(() => {
    if (!editor || !autoSave || !onSave) return

    const handleUpdate = () => {
      const timeoutId = setTimeout(() => {
        onSave(editor.getJSON())
      }, 2000) // Save after 2 seconds of inactivity
      return timeoutId
    }

    let timeoutId = handleUpdate()

    editor.on('update', () => {
      clearTimeout(timeoutId)
      timeoutId = handleUpdate()
    })

    return () => {
      clearTimeout(timeoutId)
      editor.off('update')
    }
  }, [editor, autoSave, onSave])

  // Update content when prop changes
  useEffect(() => {
    if (!editor) return
    
    const currentContent = JSON.stringify(editor.getJSON())
    const newContent = JSON.stringify(content)
    
    if (currentContent !== newContent) {
      editor.commands.setContent(content || {})
    }
  }, [content, editor])

  if (!editor) {
    return <div className="p-6">Loading editor...</div>
  }

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="flex-1 overflow-auto" />
    </div>
  )
}

