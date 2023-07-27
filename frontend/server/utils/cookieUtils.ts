import setCookie from 'set-cookie-parser';
import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { Response as FetchResponse } from 'node-fetch';

export const getRequestCookies = (expressRequest: ExpressRequest) => {
  let { cookie } = expressRequest.headers;

  if (cookie) {
    const cookieArr = cookie.split(';');

    if (cookieArr.length > 2) cookie = cookieArr.slice(1).join('; ');

    return { cookie };
  }

  return {};
};

const getSetCookie = (response: FetchResponse) =>
  setCookie.parse((response.headers as any).raw()['set-cookie'], {
    decodeValues: true,
  });

export const getResponseCookies = (fetchResponse: FetchResponse) => {
  const cookies = setCookie.parse(fetchResponse.headers.raw()['set-cookie'], {
    decodeValues: true,
  });

  const cookiesSet = new Set<string>();

  const cookieString = cookies
    .reduceRight((acc: string[], { name, value }) => {
      if (!cookiesSet.has(name)) {
        acc.push(`${name}=${value}`);
        cookiesSet.add(name);
      }

      return acc;
    }, [])
    .join('; ');

  return {
    cookie: cookieString,
  };
};

export const setCookies = (fetchResponse: FetchResponse, expressResponse: ExpressResponse) => {
  let cookies = getSetCookie(fetchResponse);

  const cookiesNames: string[] = [];

  cookies = cookies.reverse().filter(({ name }) => {
    if (!cookiesNames.includes(name)) {
      cookiesNames.push(name);
      return true;
    }

    return false;
  });

  cookies.forEach(({ name, value }) => {
    expressResponse.cookie(name, value, { secure: true, httpOnly: true });
  });
};
