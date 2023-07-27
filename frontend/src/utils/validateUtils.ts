export const validateName = (value: string): boolean => !/^[a-zA-Zа-яА-Я]+$/i.test(value);

export const validateLoginAndPassword = (value: string): boolean => !/^[a-zA-Zа-яА-Я0-9]+$/i.test(value);

export const validateEmail = (value: string): boolean => !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(value);

export const validatePhone = (value: string): boolean => !/^[0-9]+$/i.test(value);
