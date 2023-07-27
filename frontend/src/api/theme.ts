import { get, post } from 'api/http';
import { ApiPath } from 'api/consts';
import { ThemeData } from 'api/types';
import { headersJSON as headers } from 'api/consts';

interface Theme {
  getTheme: (user: string) => Promise<ThemeData>;
  setTheme: (data: ThemeData) => Promise<void>;
}

export const Theme: Theme = {
  getTheme: (user: string): Promise<ThemeData> => get(`${ApiPath.THEME}?user=${user}`),

  setTheme: (data: ThemeData): Promise<void> => post(ApiPath.THEME, data, { headers }),
};
