const NEWLINES = /(\r\n|\n|\r)/gm
const FOURTYPLUS = '40PLUS'
const PLUS = 'PLUS'

const clean = (str) => {
  return str
    .replace(NEWLINES, '')
    .replace(FOURTYPLUS, ' ')
    .replace(PLUS, '. ')
}

export default clean;