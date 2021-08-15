/** @jsx jsx */
import { jsx, Themed, Text } from 'theme-ui'
import Prism from '@theme-ui/prism'
import { LiveProvider, LiveEditor, LivePreview, LiveError } from 'react-live'
import * as themeUI from 'theme-ui'



const scope = {
  ...themeUI,
  Link: (props) => {
    if (props.activeClassName)
      return <span className={props.activeClassName} {...props} />
    return <span {...props} sx={{ cursor: 'pointer' }} />
  },

}

const stripTrailingNewline = (str) => {
  if (typeof str === 'string' && str[str.length - 1] === '\n') {
    return str.slice(0, -1)
  }
  return str
}

const transformCode = (src) => {
  return `/** @jsx jsx */\n<>${src}</>`
}

const liveTheme = { styles: [] }

export const LiveCode = ({ children, preview, xray }) => {
  const code = stripTrailingNewline(children)

  if (preview) {
    return (
      <LiveProvider
        theme={liveTheme}
        code={code}
        scope={scope}
        transformCode={transformCode}>
        <LivePreview />
      </LiveProvider>
    )
  }

  return (
    <LiveProvider
      theme={liveTheme}
      code={code}
      scope={scope}
      transformCode={transformCode}>
      <div
        sx={{
          p: 3,
          variant: xray ? 'styles.xray' : null,
          border: (t) => `1px solid ${t.colors.muted}`,
        }}>
        <LivePreview />
        <LiveError
          sx={{
            p: 3,
            fontFamily: 'monospace',
            fontSize: 0,
            color: 'secondary',
            bg: 'highlight',
            overflow: 'auto',
          }}
        />
      </div>
      <Themed.pre
        sx={{
          p: 0,
          mt: 0,
          mb: 3,
        }}>
        <LiveEditor padding="1rem" />
      </Themed.pre>
    </LiveProvider>
  )
}

/**
 * @param {{
 *   live?: boolean;
 *   filename?: string;
 * } | import("react").ComponentProps<typeof LiveCode>
 *   | import('@theme-ui/prism').ThemeUIPrismProps} props
 */
const Code = (props) => {
  if (props.live) {
    return <LiveCode {...props} />
  }
  if (props.filename) {
    return (
      <section>
        <Text
          as="span"
          sx={{
            display: 'block',
            bg: 'gray',
            color: 'background',
            px: 3,
            py: 2,
            fontWeight: 'bold',
          }}>
          {props.filename}
        </Text>
        <Prism {...props} sx={{ mt: 0 }} />
      </section>
    )
  }
  return <Prism {...props} />
}

export default Code
