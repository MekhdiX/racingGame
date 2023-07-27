import { NotificationManager } from 'react-notifications';

export const setNotificationSuccess = (message: string) => NotificationManager.success(message, 'Success', 3000);

export const setNotificationError = ({ message }: Error) => NotificationManager.error(message, 'Error', 3000);
