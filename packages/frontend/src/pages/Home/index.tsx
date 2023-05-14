import Slider from '@/components/Slider'
import { useTranslation } from 'react-i18next'

const Home = () => {
  const { t } = useTranslation('common', { keyPrefix: 'common.home' })
  return (
    <>
      <title>{t('bonsaiGarden')}</title>
      <Slider />
    </>
  )
}

export default Home
