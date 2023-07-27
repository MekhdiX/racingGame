import { Request, Response } from 'express';

import { FeedBack } from '../models/feedback';

export function createFeedBack(request: Request, response: Response): void {
  try {
    const newRequest = new FeedBack(request.body);
    newRequest
      .save()
      .then((userRequest) => {
        response.status(201).json(userRequest);
      })
      .catch((ex) => {
        response.status(500).json(ex);
      });
  } catch (ex) {
    response.status(500).json(ex);
  }
}
