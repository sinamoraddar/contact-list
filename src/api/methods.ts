import { baseUrl } from './config';

export const fetchRandomContactsMethod = ({
  results = 100,
  nat = 'gb'
}: {
  results?: number;
  nat?: string;
}) => fetch(`${baseUrl}?results=${results}&&nat=${nat}`).then((response) => response.json());
