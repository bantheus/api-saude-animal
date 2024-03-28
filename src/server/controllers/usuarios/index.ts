import * as deleteById from "./delete-by-id";
import * as signIn from "./sign-in";
import * as signUp from "./sign-up";
import * as updateById from "./update-by-id";

export const usuarioController = {
  ...signIn,
  ...signUp,
  ...updateById,
  ...deleteById
};
