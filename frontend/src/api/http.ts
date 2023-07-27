export enum HTTP_METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
}

export const http = async <Response extends unknown>(path: string, options: RequestInit): Promise<Response> => {
  try {
    const request = new Request(path, options);
    const response = await fetch(request);

    if (!response.ok) {
      if (response.statusText) {
        throw new Error(response.statusText);
      } else {
        return response.text().then((responseText) => {
          const errorText = JSON.parse(responseText)?.reason ?? responseText;
          throw new Error(errorText);
        });
      }
    }

    return response.json().catch((error) => console.warn(error));
  } catch (error) {
    throw new Error(error);
  }
};

const include: RequestCredentials = 'include';
const credentials = { credentials: include };

export const get = <Response extends unknown>(path: string, options?: RequestInit): Promise<Response> => {
  const params = { ...options, ...credentials, method: HTTP_METHODS.GET };

  return http<Response>(path, params);
};

export const post = <Request, Response extends unknown>(path: string, data?: Request, options?: RequestInit): Promise<Response> => {
  const params = {
    ...options,
    ...credentials,
    body: JSON.stringify(data),
    method: HTTP_METHODS.POST,
  };

  return http<Response>(path, params);
};

export const put = <Request, Response extends unknown>(path: string, data: Request, options?: RequestInit): Promise<Response> => {
  const params = {
    ...options,
    ...credentials,
    body: JSON.stringify(data),
    method: HTTP_METHODS.PUT,
  };

  return http<Response>(path, params);
};

export const putFormData = <Response extends unknown>(path: string, data: FormData): Promise<Response> => {
  const params = {
    ...credentials,
    body: data,
    method: HTTP_METHODS.PUT,
  };

  return http<Response>(path, params);
};
