import React from 'react'
import { Home } from '../../pages/index'
import { render } from '../testUtils'

describe('Home page', () => {
  const technologies = ['React', 'Vue', 'Svelte']
  const contactEmail = 'test@test.dev'
  const HomeComponent = (
    <Home technologies={technologies} contactEmail={contactEmail} />
  )

  it('matches snapshot', () => {
    const { asFragment } = render(HomeComponent, {})
    expect(asFragment()).toMatchSnapshot()
  })
})
