import { Request, Response } from 'express';
import fetch from 'node-fetch';

export async function authenticate(request: Request, response: Response, next: () => void): Promise<void> {
  try {
    const url = 'https://ya-praktikum.tech/api/v2/auth/user';
    const opts = {
      headers: {
        Cookie: `authCookie=${request.cookies.authCookie}; uuid=${request.cookies.uuid}`,
      },
    };
    fetch(url, opts)
      .then(async (res) => {
        if (res.status !== 200) {
          response.status(403).json({
            status: 'not authorized',
          });
        } else {
          const user = JSON.parse(await res.text());
          (global as any).user = user;
          next();
        }
      })
      .catch((ex) => {
        response.status(500).json(ex);
      });
  } catch (ex) {
    response.status(500).json({
      status: 'internal server error',
    });
  }
}
