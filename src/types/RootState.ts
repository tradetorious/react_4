import { GithubRepoFormState } from 'app/pages/HomePage/Features/GithubRepoForm/slice/types';
import { ThemeState } from 'styles/theme/slice/types';
// import { WeatherState } from 'app/pages/WeatherPage/slice/types';
import { TableState } from 'app/pages/WeatherPage/components/Table/slice/types';
import { ChartState } from 'app/pages/WeatherPage/components/Chart/slice/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
  Properties are optional because they are injected when the components are mounted sometime in your application's life. 
  So, not available always
*/
export interface RootState {
  theme?: ThemeState;
  githubRepoForm?: GithubRepoFormState;
  table?: TableState;
  chart?: ChartState;
  // weather?: WeatherState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
