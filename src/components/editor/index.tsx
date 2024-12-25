/* eslint-disable import/order */
import { useThemeToken } from '@/theme/hooks'
import ReactQuill, { type ReactQuillProps } from 'react-quill'
import { StyledEditor } from './styles'
import Toolbar, { formats } from './toolbar'
import rootStore from '@/store'

interface Props extends ReactQuillProps {
  sample?: boolean
}
export default function Editor({ id = 'slash-quill', sample = false, ...other }: Props) {
  const { themeStore } = rootStore
  const {
    themeSetting: { themeMode }
  } = themeStore
  const token = useThemeToken()

  const modules = {
    toolbar: {
      container: `#${id}`
    },
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true
    },
    syntax: true,
    clipboard: {
      matchVisual: false
    }
  }
  return (
    <StyledEditor $token={token} $thememode={themeMode}>
      <Toolbar id={id} isSimple={sample} />
      <ReactQuill
        modules={modules}
        formats={formats}
        {...other}
        placeholder="Write something awesome..."
      />
    </StyledEditor>
  )
}
