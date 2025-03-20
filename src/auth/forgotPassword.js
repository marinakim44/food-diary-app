import { CognitoUser } from "amazon-cognito-identity-js";
import UserPool from "./cognitoConfig";

export const forgotPassword = (email) => {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });

    user.forgotPassword({
      onSuccess: (data) => {
        console.log("Password reset request sent:", data);
        resolve(data);
      },
      onFailure: (err) => {
        console.error("Forgot password failed:", err);
        reject(err);
      },
    });
  });
};
