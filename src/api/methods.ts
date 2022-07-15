import { baseUrl } from './config';
import { Nations } from '../shared/constants';

export const fetchRandomContactsMethod = ({ results, nat }: { results: number; nat: Nations }) =>
  fetch(`${baseUrl}?results=${results}&&nat=${nat}`).then((response) => response.json());
