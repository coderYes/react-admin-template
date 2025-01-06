import '@/utils/highlight'
import { useThemeToken } from '@/theme/hooks'
import { Card, Typography } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Editor from '@/components/editor'
import parse from 'html-react-parser'


function EditorPage() {
  const { colorPrimary } = useThemeToken()
  const { t } = useTranslation()

  const [quillSimple, setQuillSimple] = useState(
    '<p><strong>Lorem, ipsum dolor sit amet consectetur adipisicing elit</strong></p><p><em>Lorem, ipsum dolor sit amet consectetur adipisicing elit</em></p><p><u>Lorem, ipsum dolor sit amet consectetur adipisicing elit</u></p><p><s>Lorem, ipsum dolor sit amet consectetur adipisicing elit</s></p><p><span style="color: rgb(230, 0, 0);">Lorem, ipsum dolor sit amet consectetur adipisicing elit</span></p><p><span style="background-color: rgb(255, 255, 0);">Lorem, ipsum dolor sit amet consectetur adipisicing elit</span></p>'
  )
  const [quillFull, setQuillFull] = useState(
    '<p><strong>Lorem, ipsum dolor sit amet consectetur adipisicing elit</strong></p><p><em>Lorem, ipsum dolor sit amet consectetur adipisicing elit</em></p><p><u>Lorem, ipsum dolor sit amet consectetur adipisicing elit</u></p><p><s>Lorem, ipsum dolor sit amet consectetur adipisicing elit</s></p><p><span style="color: rgb(230, 0, 0);">Lorem, ipsum dolor sit amet consectetur adipisicing elit</span></p><p><span style="background-color: rgb(255, 255, 0);">Lorem, ipsum dolor sit amet consectetur adipisicing elit</span></p>'
  )

  return (
    <>
      <Typography.Link
        href="https://github.com/zenoamaro/react-quill"
        style={{ color: colorPrimary }}
        className="mb-4 block"
      >
        https://github.com/zenoamaro/react-quill
      </Typography.Link>
      <Card title={t('sys.admin.component.editor.editorSimple')}>
        <Editor id="sample-editor" sample value={quillSimple} onChange={setQuillSimple} />
      </Card>
      <div className="h-10" />
      <Card title={t('sys.admin.component.editor.editorFull')}>
        <Editor
          id="full-editor"
          value={quillFull}
          onChange={setQuillFull}
        />
        <div className="h-4" />
        <Card title={t('sys.admin.component.editor.parser')}>{parse(quillFull)}</Card>
      </Card>
      <div className="h-10" />
    </>
  )
}

export default EditorPage
