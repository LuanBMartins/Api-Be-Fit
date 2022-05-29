import { Request, Response } from 'express'

export default class ExpressRouterAdapter {
  static adapt (router: any) {
    return async (req: Request, res: Response) => {
      const httpRequest = {
        body: req.body
      }

      const httpResponse = await router.route(httpRequest)
      res.status(httpResponse.status).json(httpResponse.body)
    }
  }
}
