import { checkImage, imageUpload } from '@/utils/ImageUpload'
import { notification } from 'antd'
import { useCallback, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import Quill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

interface EditorProps {
  value?: string
  onChange?: (value: string) => void
}

const Editor = ({ value, onChange }: EditorProps) => {
  const { t } = useTranslation('common', {
    keyPrefix: 'common.editor',
  })
  const container = [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown

    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'code-block'],
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ script: 'sub' }, { script: 'super' }], // superscript/subscript

    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
    [{ direction: 'rtl' }], // text direction
    [{ align: [] }],

    ['clean', 'link', 'image', 'video'],
  ]
  const modules = {
    toolbar: { container },
  }
  const quillRef = useRef<Quill>(null)
  const handleChangeImage = useCallback(() => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.click()
    input.onchange = async () => {
      const files = input.files
      if (!files)
        return notification.error({
          message: t('notification'),
          description: t('fileDoesNotExist'),
        })
      const file = files[0]
      const check = checkImage(file)
      if (check)
        return notification.error({
          message: t('notification'),
          description: check,
        })
      const photo = await imageUpload(file)
      const quill = quillRef.current
      const range = quill?.getEditor().getSelection()?.index
      if (range !== undefined) {
        quill?.getEditor().insertEmbed(range, 'image', `${photo.url}`)
      }
    }
  }, [t])
  useEffect(() => {
    const quill = quillRef.current
    if (!quill) return
    quill
      .getEditor()
      .getModule('toolbar')
      .addHandler('image', handleChangeImage)
  }, [handleChangeImage])
  return (
    <Quill
      theme="snow"
      modules={modules}
      value={value}
      onChange={(e) => onChange?.(e)}
      ref={quillRef}
      className="bg-white"
    />
  )
}

export default Editor
