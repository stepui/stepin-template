import { useThemeStore } from 'stepin/es/theme-provider';
import { useSettingStore } from '@/store';

import GreenImg from '@/assets/theme/green.png';
import VscodeImg from '@/assets/theme/vscode.png';
import PinkImg from '@/assets/theme/pink.png';
import SideDarkImg from '@/assets/theme/side-dark.png';
import HeaderDarkImg from '@/assets/theme/header-dark.png';
import PurpleImg from '@/assets/theme/purple.png';
import ChinaRedImg from '@/assets/theme/china-red.png';
import OrangeImg from '@/assets/theme/orange.png';
import IdeaImg from '@/assets/theme/idea.png';
import LightImg from '@/assets/theme/light.png';

export function configTheme(key: string) {
  const { setBgSeriesColors } = useThemeStore();
  const { setNavigation } = useSettingStore();
  switch (key) {
    case 'night':
      setBgSeriesColors({ 'bg-base': '#1D1D1F' });
      break;
    case 'header-dark':
      setNavigation('head');
      break;
    default:
      setNavigation('side');
  }
}

export const themeList: Theme.ThemeConfig[] = [
  {
    title: '亮色模式',
    key: 'light',
    imgUrl: LightImg,
    config: { color: { middle: { 'bg-base': '#fff' } } },
  },
  {
    title: '侧边暗色菜单',
    key: 'side-dark',
    imgUrl: SideDarkImg,
    config: { color: { middle: { 'bg-base': '#fff', 'bg-side': '#001129' } }, size: { 'width-side': '220px' } },
  },
  {
    title: '顶部暗色菜单',
    key: 'header-dark',
    imgUrl: HeaderDarkImg,
    config: { color: { middle: { 'bg-base': '#fff', 'bg-header': '#001129' } } },
  },
  {
    title: 'VSCode风',
    key: 'vscode',
    imgUrl: VscodeImg,
    config: {
      color: { middle: { 'bg-base': '#23272E' } },
    },
  },
  {
    title: 'IDEA风',
    key: 'idea',
    imgUrl: IdeaImg,
    config: {
      color: { middle: { 'bg-base': '#2B2B2B' } },
    },
  },
  {
    title: '墨绿风',
    key: 'green',
    imgUrl: GreenImg,
    config: {
      color: { middle: { 'bg-base': '#013a54' } },
    },
  },
  {
    title: '芭比粉',
    key: 'pink',
    imgUrl: PinkImg,
    config: {
      color: { middle: { 'bg-base': '#B6266D' } },
    },
  },
  {
    title: '暗夜紫',
    key: 'purple',
    imgUrl: PurpleImg,
    config: {
      color: { middle: { 'bg-base': '#361F68' } },
    },
  },
  {
    title: '中国红',
    key: 'china',
    imgUrl: ChinaRedImg,
    config: {
      color: { middle: { 'bg-base': 'rgb(230, 0, 0)' } },
    },
  },
  {
    title: '活力橙',
    key: 'orange',
    imgUrl: OrangeImg,
    config: {
      color: { middle: { 'bg-base': '#B1740D' } },
    },
  },
];
