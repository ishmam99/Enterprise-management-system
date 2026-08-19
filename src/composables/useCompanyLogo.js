// composables/useCompanyLogo.js

export function useCompanyLogo() {
  const logos = {
    nasa: new URL('@/assets/LOGO/nasa.png', import.meta.url).href || 'https://commons.wikimedia.org/wiki/File:NASA_logo.svg',
    raytheon: new URL('@/assets/LOGO/raytheon.svg', import.meta.url).href || 'https://commons.wikimedia.org/wiki/File:Raytheon_Technologies_logo.svg',
    spacex: new URL('@/assets/LOGO/spacex.webp', import.meta.url).href || 'https://commons.wikimedia.org/wiki/File:SpaceX_Logo_Black.png',
    bell: new URL('@/assets/LOGO/bell.svg', import.meta.url).href || 'https://commons.wikimedia.org/wiki/File:Bell_Textron_logo.png',
    textron: new URL('@/assets/LOGO/bell.svg', import.meta.url).href || 'https://commons.wikimedia.org/wiki/File:Bell_Textron_logo.png',
    aerospace: new URL('@/assets/LOGO/aerospace.png', import.meta.url).href || 'https://github.com/the-aerospace-corporation',
    gulf: new URL('@/assets/LOGO/gulf_stream.jpeg', import.meta.url).href || 'https://brandfetch.com/gulfstream.com',
  }

  const defaultLogo = new URL('@/assets/LOGO/default.png', import.meta.url).href

  function getLogo(companyName) {
    if (!companyName) return defaultLogo

    const normalized = companyName.toLowerCase().trim()

    // Match if name contains any known key
    for (const key in logos) {
      if (normalized.includes(key)) {
        return logos[key]
      }
    }

    return defaultLogo
  }

  return {
    getLogo
  }
}
