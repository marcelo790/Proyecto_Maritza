'use client'

type Props = {
  locale: 'es' | 'en'
  onChange: (newLocale: 'es' | 'en') => void
}

export default function LanguageSwitcher({ locale, onChange }: Props) {
  return (
    <div className="headIdioma flex items-center gap-1 bg-white/20 rounded-md px-2 py-1 ml-20 border border-white/30 shadow-sm">
      <span className="text-white font-semibold text-sm"> {locale === 'es' ? 'Idioma: ' : 'Language: '}</span>
      <select
        value={locale}
        onChange={e => onChange(e.target.value as 'es' | 'en')}
        className="bg-white/90 text-gray-800 font-medium text-sm rounded-md px-1 py-0.5 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <option value="es">ES</option>
        <option value="en">EN</option>
      </select>
    </div>
  )
}
