import { extendTheme, ThemeConfig, Colors } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const shadows: Colors = {
  outline: '0 0 0 3px #90CAF9',
};

const theme = extendTheme({ config, shadows });

export default theme;
