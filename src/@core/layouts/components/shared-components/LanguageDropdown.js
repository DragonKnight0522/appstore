// ** React Import
import { useEffect } from 'react'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Import
import { useTranslation } from 'react-i18next'

// ** Custom Components Imports
import OptionsMenu from 'src/@core/components/option-menu'
import CustomTextField from 'src/@core/components/mui/text-field'
import { MenuItem } from '@mui/material'
import Image from 'next/image'

const LanguageDropdown = ({ settings, saveSettings }) => {
  // ** Hook
  const { i18n } = useTranslation()

  const handleLangItemClick = lang => {
    i18n.changeLanguage(lang)
  }

  // ** Change html `lang` attribute when changing locale
  useEffect(() => {
    document.documentElement.setAttribute('lang', i18n.language)
  }, [i18n.language])

  return (
    <CustomTextField
      select
      value={i18n.language || "en"}
      BoxProps={{ width: "100%" }}
      sx={{ width: "100%", "& .MuiInputBase-root": { width: "100%" }, "& .MuiSelect-select": { display: "flex", alignItems: "center" } }}
    >
      <MenuItem
        onClick={() => {
          handleLangItemClick('en')
          saveSettings({ ...settings, direction: 'ltr' })
        }}
        value='en'
      >
        <Image
          src="https://flagcdn.com/w20/gb.png"
          width="20"
          height="0"
          style={{ width: '25px', height: 'auto', margin: "0 5px" }} alt="gb"
        />
        English
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleLangItemClick('fr')
          saveSettings({ ...settings, direction: 'ltr' })
        }}
        value='fr'
      >
        <Image
          src="https://flagcdn.com/w20/fr.png"
          width="20"
          height="0"
          style={{ width: '25px', height: 'auto', margin: "0 5px" }} alt="fr"
        />
        French
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleLangItemClick('ar')
          saveSettings({ ...settings, direction: 'rtl' })
        }}
        value='ar'
      >
        <Image
          src="https://flagcdn.com/w20/ar.png"
          width="20"
          height="0"
          style={{ width: '25px', height: 'auto', margin: "0 5px" }} alt="ar"
        />
        Arabic
      </MenuItem>
    </CustomTextField>
  )
}

export default LanguageDropdown
