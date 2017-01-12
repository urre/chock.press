const NEWLINES = /(\r\n|\n|\r)/gm
const FOURTYPLUS = '40PLUS'
const NUMBER = /[0-9]/g
const PLUS = 'PLUS'
const COLONDASH = ':-'
const HOJDARE = 'TV-HÖJDAREN'
const TV = 'TVTV'
const EXCLAMATION = /!/g
const JUSTNU = 'JUST NU:'
const CAPITALLETTERSPACE = /([a-z])([A-Z])/g

const clean = (str) => {
  return str
    .replace(NEWLINES, ' ')
    .replace(FOURTYPLUS, ' ')
    .replace(PLUS, '. ')
    .replace(JUSTNU, '')
    .replace(HOJDARE, '')
    .replace(TV, '')
    .replace(EXCLAMATION, '! ')
    .replace(NUMBER, '')
    .replace(COLONDASH, '')
    .replace(CAPITALLETTERSPACE, '$1 $2')
}

export default clean;