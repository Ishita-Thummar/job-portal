import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './locales/en/translation.json'
import gu from './locales/gu/translation.json'
import hi from './locales/hi/translation.json'
import mr from './locales/mr/translation.json'


i18n.use(initReactI18next).init({
    resources:{
        en:{translation:en},
        hi:{translation:hi},
        gu:{translation:gu},
        mr:{translation:mr}

    },
    fallbackLn:'en',
    interpolation:{
        escapeValue:false
    }
})

export default i18n;