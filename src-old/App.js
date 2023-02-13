import { extendTheme, ChakraProvider } from '@chakra-ui/react'
import { Headline } from './app.style'
import Main from './components/Main/Main'

const colors = {
  table: {
    blue: '#0000ff',
    green: '#00ff00',
    red: '#ff0000',
    yellow: '#ffff00',
    white: '#dddddd',
    black: '#333333',
  }
}

const theme = extendTheme({colors})

function App() {
  return (
    <ChakraProvider resetCSS theme={theme}>
      {/* <Headline>
         The table of stuff will go here.
      </Headline> */}
      <Main />
    </ChakraProvider>
  );
}

export default App;
