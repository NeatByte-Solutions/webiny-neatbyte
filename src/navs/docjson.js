const page = (mdxName) => {
  // link and title from mdx (look old code implementation)
  return { type: 'link', link: 'https://some-resolved-link', title: 'Some resolved title' }
}

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
