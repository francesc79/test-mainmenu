import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import { MainMenu } from './mainmenu/MainMenu.tsx'
import type { MainMenuFolderType } from './mainmenu/MainMenuTypes.ts'

const ROOT: MainMenuFolderType = {
  id: '0',
  title: 'Root',
  folders: [
    {
      id: '1',
      title: 'Piano',
      folders: [
        {
          id: '7',
          title: 'Risorse',
          items: [
            {
              id: '7a',
              title: 'Lista macchine',
              icon: 'pencil',
            },
            {
              id: '7b',
              title: 'Attrezzature',
              icon: 'list',
            },
            {
              id: '7c',
              title: 'Monitoraggio macchine',
              icon: 'list',
            },
          ],
        },
      ],
      items: [
        {
          id: '1a',
          title: 'Programma di lavoro',
          icon: 'pencil',
        },
        {
          id: '1b',
          title: 'Ordini di produzione',
          icon: 'pencil',
        },
        {
          id: '1c',
          title: 'Consuntivi',
          icon: 'pencil',
        },
        {
          id: '1d',
          title: 'Analisi dei fermi',
          icon: 'pencil',
        },
        {
          id: '1e',
          title: 'Monitoraggio del piano',
          icon: 'pencil',
        },
      ],
    },
    {
      id: '2',
      title: 'Risorse',
      items: [
        {
          id: '2a',
          title: 'Lista macchine',
          icon: 'pencil',
        },
        {
          id: '2b',
          title: 'Attrezzature',
          icon: 'list',
        },
        {
          id: '2c',
          title: 'Monitoraggio macchine',
          icon: 'list',
        },
      ],
    },
  ],
  items: [
    {
      id: '3',
      title: 'Materiali',
      icon: 'list',
    },
    {
      id: '4',
      title: 'Dispositivi',
      icon: 'list',
    },
    {
      id: '5',
      title: 'Reports',
      icon: 'list',
    },
    {
      id: '6',
      title: 'Sistema',
      icon: 'list',
    },
  ],
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MainMenu root={ROOT}   />
  </StrictMode>,
)
