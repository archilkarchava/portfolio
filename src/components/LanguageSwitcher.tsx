import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { useTranslation } from 'react-i18next'

export const LanguageSwitcher: React.FC = () => {
  const [cookie, setCookie] = useCookies(['NEXT_LOCALE'])
  const router = useRouter()
  const { locale } = router

  const handleToggleLanguage = () => {
    const newLocale = locale === 'en' ? 'ru' : 'en'
    router.push('/', '/', { locale: newLocale })
    if (cookie.NEXT_LOCALE !== newLocale) {
      setCookie('NEXT_LOCALE', newLocale, { path: '/' })
    }
  }

  const { t } = useTranslation('common')

  return (
    <button onClick={handleToggleLanguage} className="fixed top-0 right-0 p-5">
      {t('change-locale')}
    </button>
  )
}
