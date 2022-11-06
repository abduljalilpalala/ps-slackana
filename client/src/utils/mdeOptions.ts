import * as Showdown from 'showdown'
import { SaveImageHandler } from 'react-mde'

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
})

const save: SaveImageHandler = async function* (data: ArrayBuffer) {
  // Promise that waits for "time" milliseconds
  const wait = function (time: number) {
    return new Promise((a: any, r) => {
      setTimeout(() => a(), time)
    })
  }

  // Upload "data" to your server
  // Use XMLHttpRequest.send to send a FormData object containing
  // "data"
  // Check this question: https://stackoverflow.com/questions/18055422/how-to-receive-php-image-data-over-copy-n-paste-javascript-with-xmlhttprequest

  await wait(2000)
  // yields the URL that should be inserted in the markdown
  yield 'https://picsum.photos/300'
  await wait(2000)

  // returns true meaning that the save was successful
  return true
}

export { converter, save }
