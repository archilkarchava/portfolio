import { render } from '@testing-library/react'
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18nForTests'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import { NextRouter } from 'next/router'

const mockRouter: Partial<NextRouter> = {
  basePath: '/',
  pathname: '/',
  route: '/',
  query: {},
  asPath: '/',
  locale: 'en',
  locales: ['en', 'ru'],
  push: jest.fn(() => Promise.resolve(true)),
  replace: jest.fn(() => Promise.resolve(true)),
  reload: jest.fn(() => Promise.resolve(true)),
  prefetch: jest.fn(() => Promise.resolve()),
  back: jest.fn(() => Promise.resolve(true)),
  beforePopState: jest.fn(() => Promise.resolve(true)),
  isFallback: false,
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
}

const Providers: React.FC = ({ children }) => {
  return (
    <RouterContext.Provider value={mockRouter as NextRouter}>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </RouterContext.Provider>
  )
}

const customRender = (
  ui: Parameters<typeof render>[0],
  options: Parameters<typeof render>[1] = {}
) => render(ui, { wrapper: Providers, ...options })

// re-export everything
export * from '@testing-library/react'
// override render method
export { customRender as render }
