import { ZRegisterUser } from "../Validators/auth. validator.ts";
import type { RegisterUserDTO } from "../Validators/auth. validator.ts";
import { formatErrors } from "../Utils/errors/formatErrors.ts";
import { ValidationError } from "../Utils/errors/httpError.ts";
import { User } from "../Models/user.schema.ts";
import type { IUserResponse } from "../Types/schema.d.ts";

export async function registerService(
  userData: unknown,
): Promise<IUserResponse> {
  const validationResult = ZRegisterUser.safeParse(userData);
  // if user data is not valid
  if (!validationResult.success) {
    const formattedErrors = formatErrors(validationResult.error);
    throw new ValidationError(formattedErrors, "Invalid registration data");
  }
  // if data is valid
  const validatedData: RegisterUserDTO = validationResult.data;

  // Check is the email is already exist or not
  const existingUser = await User.findOne({ email: validatedData.email });
  if (existingUser) {
    throw new ValidationError(
      {
        email: ["Email ALready exist"],
      },
      "Email already registered",
    );
  }

  // Create new user
  try {
    const newUser = await User.create(validatedData);
    const userResponse: IUserResponse = {
      _id: newUser._id.toString(),
      displayName: newUser.displayName,
      email: newUser.email,
      emailVerification: newUser.emailVerification,
    };
    return userResponse;
  } catch (error: any) {
    if (error.code === 11000) {
      throw new ValidationError(
        { email: ["Email Already Exists"] },
        "Email already registered",
      );
    }
    throw error;
  }
}
