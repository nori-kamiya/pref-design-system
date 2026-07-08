import type { Preview } from '@storybook/react-vite'
import { useEffect } from 'react'
import '../src/styles/globals.css'
import { prefectures } from '../src/tokens/generated'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'error',
    },
  },
  globalTypes: {
    prefecture: {
      description: '都道府県',
      toolbar: {
        title: '都道府県',
        icon: 'globe',
        items: prefectures.map((p) => ({ value: p.id, title: p.nameJa })),
        dynamicTitle: true,
      },
    },
    colorMode: {
      description: 'Light / Dark',
      toolbar: {
        title: 'Mode',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    prefecture: 'tokyo',
    colorMode: 'light',
  },
  decorators: [
    (Story, context) => {
      const { prefecture, colorMode } = context.globals
      useEffect(() => {
        document.documentElement.setAttribute('data-pref', prefecture ?? 'tokyo')
        document.documentElement.setAttribute('data-theme', colorMode ?? 'light')
      }, [prefecture, colorMode])
      return (
        <div
          data-pref={prefecture ?? 'tokyo'}
          data-theme={colorMode ?? 'light'}
          style={{ background: 'var(--pref-surface)', minHeight: '100vh', padding: '1.5rem' }}
        >
          <Story />
        </div>
      )
    },
  ],
}

export default preview
