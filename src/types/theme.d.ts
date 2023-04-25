declare namespace Theme {
  interface ThemeConfig {
    title: string;
    key: string;
    imgUrl: string;
    config: Partial<import('stepin/es/style/interface').Theme>;
    handler?: Function;
  }
}
