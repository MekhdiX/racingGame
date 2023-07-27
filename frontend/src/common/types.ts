export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type TextAreaChangeEvent = React.ChangeEvent<HTMLTextAreaElement>;
export type FieldChangeEvent = InputChangeEvent | TextAreaChangeEvent;
export type Nullable<T> = undefined extends T ? void : T;
