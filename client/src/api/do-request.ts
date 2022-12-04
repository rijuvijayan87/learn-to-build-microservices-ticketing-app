import { RequestMethod } from './methods';

export const doRequest = async ({
  url,
  method,
  body,
}: {
  url: string;
  method: RequestMethod;
  body: string;
}) => {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body,
    });

    return response.json();
  } catch (error) {
    console.error(error);
  }
};
