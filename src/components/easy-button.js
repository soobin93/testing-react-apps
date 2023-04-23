// http://localhost:3000/easy-button
// NOTE: this component wont work by itself, so we have the example :)

import * as React from 'react'
import {useTheme} from './theme'

const styles = {
  dark: {
    backgroundColor: 'black',
    color: 'white',
  },
  light: {
    backgroundColor: 'white',
    color: 'black',
  },
}

function EasyButton(props) {
  const [theme] = useTheme()
  return <button style={styles[theme]} {...props} />
}

export default EasyButton
