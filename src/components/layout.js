/** @jsx jsx */
import { jsx, Themed } from 'theme-ui'
import { Flex, Box } from '@theme-ui/components'

export default function DocsLayout(props) {


  const fullwidth =
    (props.pageContext.frontmatter &&
      props.pageContext.frontmatter.fullwidth) ||
    props.location.pathname === '/'


  return (
    <Themed.root>
    
      <Flex
        sx={{
          flexDirection: 'column',
          minHeight: '100vh',
        }}>
       
        <Box
          sx={{
            flex: '1 1 auto',
            alignItems: 'flex-start',
            display: ['block', 'flex'],
            height: '100%',
          }}>
         
          <main
            id="content"
            sx={{
              width: '100%',
              minWidth: 0,
              maxWidth: fullwidth ? 'none' : 768,
              mx: 'auto',
              px: fullwidth ? 0 : 3,
            }}>
            {props.children}
           
          </main>
        </Box>
      </Flex>
    </Themed.root>
  )
}
