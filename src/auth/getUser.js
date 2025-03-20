import UserPool from "./cognitoConfig";

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const user = UserPool.getCurrentUser();

    if (!user) {
      reject("No user logged in");
      return;
    }

    user.getSession((err, session) => {
      if (err || !session.isValid()) {
        reject("Session is invalid");
        return;
      }

      user.getUserAttributes((err, attributes) => {
        if (err) {
          reject(err);
          return;
        }

        const userData = {};
        attributes.forEach((attr) => {
          userData[attr.Name] = attr.Value;
        });

        resolve(userData);
      });
    });
  });
};
