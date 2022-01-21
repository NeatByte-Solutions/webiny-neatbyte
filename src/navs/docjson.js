import { createPageList } from '@/utils/createPageList'

const page = (mdxName) => {
  const page = createPageList(
    require.context(`../pages/docs/?meta=title,shortTitle,published`, false, /\.mdx$/),
    'docs'
  )
  return page[mdxName]
  // return { type: 'page', link: 'https://some-resolved-link', title: 'Some resolved title' }
}

// const link = (title, externalLink) => {
//   return { type: 'link', link: externalLink, title }
// }

const section = (title) => {
  return {
    type: 'section',
    title,
  }
}

const collapsable = (title, links) => {
  return {
    type: 'collapsable',
    title,
    links,
  }
}

export const documentationNav2 = [
  collapsable('Create Custom Application', [
    section('First section'),
    collapsable('Project Organization', [
      page('editor-setup'),
      page('browser-support'),
      page('upgrade-guide'),
    ]),
    section('Other docs'),
    page('accent-color'),
    page('resize'),
    page('cursor'),
  ]),
  collapsable('Create Custom Application', [
    section('First section'),
    page('cursor'),
    section('Other docs'),
    page('accent-color'),
    page('resize'),
    page('cursor'),
  ]),
]
