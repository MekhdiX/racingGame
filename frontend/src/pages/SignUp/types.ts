export type Fields = {
  // eslint-disable-next-line camelcase
  first_name: string;
    // eslint-disable-next-line camelcase
  second_name: string;
  login: string;
  email: string;
  phone: string;
  password: string;
    // eslint-disable-next-line camelcase
  password_confirm: string;
};

export type FieldErrors = Record<keyof Fields, boolean>;
