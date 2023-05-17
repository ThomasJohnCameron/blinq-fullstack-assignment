import type { NextApiRequest, NextApiResponse } from "next";

type FetchFn = (
  input: RequestInfo | URL,
  init?: RequestInit | undefined
) => Promise<Response>;

export type SyntheticNextFetchHandlers = {
  [key: string]:
    | ((req: NextApiRequest, res: NextApiResponse) => NextApiResponse)
    | undefined;
};

const makeNextResponse = () => {
  let statusCode: any = 200;
  let body: Object;
  let res: { [key: string]: any } = {
    status(val: number) {
      statusCode = val;
      return this;
    },
    json(val: Object | undefined) {
      if (val) {
        body = val;
        this.statusCode = statusCode;
        this.body = body;
        return this;
      }
      return this;
    },
  };
  return res;
};

declare global {
  interface Window {
    originalFetch: any;
  }
}

export default function syntheticNextFetch(
  handlers: SyntheticNextFetchHandlers
) {
  let originalFetch: any = undefined;
  if (window.originalFetch) {
    originalFetch = window.originalFetch;
  } else {
    originalFetch = window.fetch;
    window.originalFetch = originalFetch;
  }

  window.fetch = async (...args) => {
    let [resource, req] = args;
    const handler = handlers[resource as string];

    if (handler) {
      const res = makeNextResponse();
      if (
        req?.headers &&
        (req.headers as { [key: string]: string })["Content-Type"] ===
          "application/json"
      ) {
        req.body = JSON.parse(req.body as string);
      }

      const result = handler(req as NextApiRequest, res as NextApiResponse);
      if (result.statusCode < 300) {
        const p = new Promise((resolve, _reject) => {
          resolve(result);
        });
        return p as Promise<Response>;
      } else {
        return Promise.reject(result) as Promise<Response>;
      }
    } else {
      return await originalFetch(resource, req);
    }
  };
}

fetch;
