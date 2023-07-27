export type Fields = {
  login: string;
  password: string;
};

export type FieldErrors = Record<keyof Fields, boolean>;
