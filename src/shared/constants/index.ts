export interface ContactShape {
  cell: string;
  dob: { date: string; age: number };
  email: string;
  gender: string;
  id: { name: string; value: string };
  location: {
    street: {
      number: 2910;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: string;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  name: { title: string; first: string; last: string };
  nat: Nations;
  phone: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  registered: object;
}

export interface ContactGroupsShape {
  [key: string]: ContactShape[];
}

export const initialContactGroups: ContactGroupsShape = {
  a: [],
  b: [],
  c: [],
  d: [],
  e: [],
  f: [],
  g: [],
  h: [],
  i: [],
  j: [],
  k: [],
  l: [],
  m: [],
  n: [],
  o: [],
  p: [],
  q: [],
  r: [],
  s: [],
  t: [],
  u: [],
  v: [],
  w: [],
  x: [],
  y: [],
  z: []
};

export enum Nations {
  AU = 'AU',
  BR = 'BR',
  CA = 'CA',
  CH = 'CH',
  DE = 'DE',
  DK = 'DK',
  ES = 'ES',
  FI = 'FI',
  FR = 'FR',
  GB = 'GB',
  IE = 'IE',
  IN = 'IN',
  IR = 'IR',
  MX = 'MX',
  NL = 'NL',
  NO = 'NO',
  NZ = 'NZ',
  RS = 'RS',
  TR = 'TR',
  UA = 'UA',
  US = 'US'
}
