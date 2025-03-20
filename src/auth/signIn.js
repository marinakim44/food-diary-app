import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import UserPool from "./cognitoConfig";

export const signIn = (email, password, newPassword = null, name = null) => {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (session) => {
        resolve(session);
      },
      onFailure: (err) => {
        reject(err);
      },
      newPasswordRequired: (userAttributes, requiredAttributes) => {
        if (!newPassword) {
          reject({ message: "New password required!" });
        }

        delete userAttributes.email_verified;

        // If name is required and not provided, use a default or empty string
        if (requiredAttributes.includes("name") && !name) {
          reject({ message: "Name is required to complete password change!" });
          return;
        }

        // Ensure we send the name attribute if required
        if (name) {
          userAttributes.name = name;
        }

        user.completeNewPasswordChallenge(
          newPassword,
          { name },
          {
            onSuccess: (session) => {
              resolve({ user, session });
            },
            onFailure: (err) => {
              reject(err);
            },
          }
        );
      },
    });
  });
};
