interface Response {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

export function signIn(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: 'anjnfjwbeufbEKWJFHJBE&%GHHGVY^B87R83UYBuhjbjhb$%$t767%F',
        user: {
          name: 'Cesar Augusto',
          email: 'cesaraugusto.ls@hotmail.com',
        },
      });
    }, 2000);
  });
}
