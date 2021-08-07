import { render } from '@testing-library/react'
import React from 'react'
// import { ThemeProvider } from "my-ui-lib"
// import { TranslationProvider } from "my-i18n-lib"
// import defaultStrings from "i18n/en-x-default"

// const Providers: React.FC = ({ children }) => {
//   return (
//     <ThemeProvider theme="light">
//       <TranslationProvider messages={defaultStrings}>
//         {children}
//       </TranslationProvider>
//     </ThemeProvider>
//   )
// }

const Providers: React.FC = ({ children }) => {
  return <>{children}</>
}

const customRender = (
  ui: Parameters<typeof render>[0],
  options: Parameters<typeof render>[1] = {}
) => render(ui, { wrapper: Providers, ...options })

// re-export everything
export * from '@testing-library/react'
// override render method
export { customRender as render }
