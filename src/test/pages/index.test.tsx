import React from 'react'
import { Home } from '../../pages/index'
import { render } from '@/test/testUtils'

describe('Home page', () => {
  const pinnedRepositories = [
    {
      id: 'MDEwOlJlcG9zaXRvcnkyNjQwMDQyOTU=',
      name: 'astragal-gatsby',
      descriptionHTML:
        '<div>E-commerce website built using Gatsby (React, TypeScript) and serverless.</div>',
      url: 'https://github.com/archilkarchava/astragal-gatsby',
      homepageUrl: 'https://astragal74.ru',
    },
    {
      id: 'MDEwOlJlcG9zaXRvcnkyNjkyNjEyNzU=',
      name: 'astragal-sanity-studio',
      descriptionHTML:
        '<div>Admin panel for <a href="https://astragal74.ru" rel="nofollow">https://astragal74.ru</a>\n' +
        '</div>',
      url: 'https://github.com/archilkarchava/astragal-sanity-studio',
      homepageUrl: '',
    },
    {
      id: 'MDEwOlJlcG9zaXRvcnkyMTY4ODU0MDU=',
      name: 'furnitur',
      descriptionHTML:
        '<div>Furnitur is a cross-platform (IOS, Android) e-commerce application built using Flutter framework and Firebase backend.</div>',
      url: 'https://github.com/archilkarchava/furnitur',
      homepageUrl: '',
    },
    {
      id: 'MDEwOlJlcG9zaXRvcnkyMTc2NjAyMDY=',
      name: 'furnitur-firebase',
      descriptionHTML: '<div>Firebase backend for Furnitur app.</div>',
      url: 'https://github.com/archilkarchava/furnitur-firebase',
      homepageUrl: null,
    },
  ]
  const HomeComponent = (
    <Home
      name="Ivan Ivanov"
      email="test@mail.com"
      pinnedRepositories={pinnedRepositories}
    />
  )

  it('matches snapshot', () => {
    const { asFragment } = render(HomeComponent, {})
    expect(asFragment()).toMatchSnapshot()
  })
})
