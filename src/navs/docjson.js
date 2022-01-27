import { createPageList } from '@/utils/createPageList'

const page = (mdxName) => {
  const pages = createPageList(require.context(`../pages/docs/?meta=title`, true, /\.mdx$/), 'docs')

  return {
    type: 'page',
    link: pages[mdxName].link,
    title: pages[mdxName].title,
  }
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
  page('webiny/introduction'),
  page('tutorials/install-webiny'),
  collapsable('Core Concepts', [
    collapsable('Project Organization', [
      page('key-topics/project-organization/project-applications'),
      page('key-topics/project-organization/project-applications-and-packages'),
      page('key-topics/project-organization/monorepo-organization'),
    ]),
    page('key-topics/plugins'),
    page('how-to-guides/use-watch-command'),
    page('how-to-guides/deployment/deploy-your-project'),
    page('key-topics/webiny-cli'),
  ]),
  collapsable('Create Custom Application', [
    page('tutorials/create-custom-application/introduction'),
    page('tutorials/create-custom-application/getting-started'),
    page('tutorials/create-custom-application/graphql-api'),
    collapsable('React Application', [
      page('tutorials/create-custom-application/react-application/introduction'),
      page('tutorials/create-custom-application/react-application/layout'),
      page('tutorials/create-custom-application/react-application/new-pin-modal-dialog'),
      page('tutorials/create-custom-application/react-application/homepage'),
      page('tutorials/create-custom-application/react-application/pin-details-page'),
    ]),
    collapsable('Security', [
      page('tutorials/create-custom-application/security/introduction'),
      page('tutorials/create-custom-application/security/getting-started'),
      collapsable('Cloud Infrastructure', [
        page(
          'tutorials/create-custom-application/security/cloud-infrastructure/adding-user-pool-and-user-pool-domain'
        ),
        page(
          'tutorials/create-custom-application/security/cloud-infrastructure/adding-user-pool-client'
        ),
        page(
          'tutorials/create-custom-application/security/cloud-infrastructure/adjusting-webiny-config-ts-configuration-file'
        ),
      ]),
      collapsable('React Application', [
        page('tutorials/create-custom-application/security/react-application/initial-setup'),
        page(
          'tutorials/create-custom-application/security/react-application/integrating-hosted-ui-authentication-flow'
        ),
      ]),
      collapsable('GraphQL API', [
        page('tutorials/create-custom-application/security/graphql-api/initial-setup'),
        page(
          'tutorials/create-custom-application/security/graphql-api/implementing-authentication-and-authorization-checks'
        ),
      ]),
      page('tutorials/create-custom-application/security/wrapping-it-up'),
    ]),
  ]),
  ///////////////////////// HERES BE NEW BLOCKS////////////////////
  collapsable('Release Notes', [
    page('how-to-guides/upgrade-webiny'),
    collapsable('5.22.0', [
      page('release-notes/5.22.0/changelog'),
      page('release-notes/5.22.0/upgrade-guide'),
    ]),
    collapsable('5.21.0', [
      page('release-notes/5.21.0/changelog'),
      page('release-notes/5.21.0/upgrade-guide'),
    ]),
    collapsable('5.20.0', [
      page('release-notes/5.20.0/changelog'),
      page('release-notes/5.20.0/upgrade-guide'),
    ]),
    collapsable('5.19.1', [
      page('release-notes/5.19.1/changelog'),
      page('release-notes/5.19.1/upgrade-guide'),
    ]),
    collapsable('5.19.0', [
      page('release-notes/5.19.0/changelog'),
      page('release-notes/5.19.0/upgrade-guide'),
    ]),
    // collapsable('Older Releases', [
    //   collapsable('5.18.0', [
    //     page('release-notes/5.18.0/changelog'),
    //     page('release-notes/5.18.0/upgrade-guide'),
    //   ]),
    //   collapsable('5.17.0', [
    //     page('release-notes/5.17.0/changelog'),
    //     page('release-notes/5.17.0/upgrade-guide'),
    //   ]),
    //   collapsable('5.16.0', [
    //     page('release-notes/5.16.0/changelog'),
    //     page('release-notes/5.16.0/upgrade-guide'),
    //   ]),
    //   collapsable('5.15.0', [
    //     page('release-notes/5.15.0/changelog'),
    //     page('release-notes/5.15.0/upgrade-guide'),
    //   ]),
    //   collapsable('5.14.0', [
    //     page('release-notes/5.14.0/changelog'),
    //     page('release-notes/5.14.0/upgrade-guide'),
    //   ]),
    //   collapsable('5.13.0', [
    //     page('release-notes/5.13.0/changelog'),
    //     page('release-notes/5.13.0/upgrade-guide'),
    //   ]),
    //   collapsable('5.12.0', [
    //     page('release-notes/5.12.0/changelog'),
    //     page('release-notes/5.12.0/upgrade-guide'),
    //   ]),
    //   collapsable('5.11.1', [
    //     page('release-notes/5.11.1/changelog'),
    //     page('release-notes/5.11.1/upgrade-guide'),
    //   ]),
    //   collapsable('5.11.0', [
    //     page('release-notes/5.11.0/changelog'),
    //     page('release-notes/5.11.0/upgrade-guide'),
    //   ]),
    //   collapsable('5.10.0', [
    //     page('release-notes/5.10.0/changelog'),
    //     page('release-notes/5.10.0/upgrade-guide'),
    //   ]),
    //   collapsable('5.9.0', [
    //     page('release-notes/5.9.0/changelog'),
    //     page('release-notes/5.9.0/upgrade-guide'),
    //   ]),
    //   collapsable('5.8.0', [
    //     page('release-notes/5.8.0/changelog'),
    //     page('release-notes/5.8.0/upgrade-guide'),
    //   ]),
    //   collapsable('5.7.0', [
    //     page('release-notes/5.7.0/changelog'),
    //     page('release-notes/5.7.0/upgrade-guide'),
    //   ]),
    //   collapsable('5.6.0', [
    //     page('release-notes/5.6.0/changelog'),
    //     page('release-notes/5.6.0/upgrade-guide'),
    //   ]),
    //   collapsable('5.5.0', [
    //     page('release-notes/5.5.0/changelog'),
    //     page('release-notes/5.5.0/upgrade-guide'),
    //   ]),
    //   collapsable('5.4.0', [
    //     page('release-notes/5.4.0/changelog'),
    //     page('release-notes/5.4.0/upgrade-guide'),
    //   ]),
    //   collapsable('5.8.0', [page('release-notes/5.3.0/changelog')]),
    // ]),
  ]),
  collapsable('Contributing', [
    page('contributing/documentation'),
    page('contributing/new-page-template'),
  ]),
  page('webiny-telemetry'),
]
