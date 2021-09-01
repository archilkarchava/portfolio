import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useCookies } from 'react-cookie'

type Locale = string

interface LocaleToggleProps {
  locales: [Locale, Locale]
}

export const LocaleToggle: React.FC<LocaleToggleProps> = ({ locales }) => {
  const [, setCookie] = useCookies(['NEXT_LOCALE'])

  const router = useRouter()

  const { locale: currentLocale } = router

  const localeToSwitchTo = useMemo(
    () => locales.filter((loc) => loc !== currentLocale)[0],
    [currentLocale, locales]
  )
  if (!locales || locales.length !== 2) {
    return null
  }

  const toggleLocale = () => {
    router.push('/', '/', { locale: localeToSwitchTo })
    setCookie('NEXT_LOCALE', localeToSwitchTo, { path: '/' })
  }

  return (
    <button onClick={toggleLocale} className="fixed top-0 right-0 p-5">
      {localeToSwitchTo.toUpperCase()}
    </button>
  )
}
