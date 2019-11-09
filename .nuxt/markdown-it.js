import MarkdownIt from 'markdown-it'

export default ({ app }, inject) => {
  const md = new MarkdownIt({"preset":"default","linkify":true,"breaks":true})

  md.use(require('markdown-it-div'))

  md.use(require('markdown-it-attrs'))

  inject('md', md)
}
