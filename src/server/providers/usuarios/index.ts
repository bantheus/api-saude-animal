import * as create from "./create";
import * as deleteById from "./delete-by-id";
import * as getByEmail from "./get-by-email";
import * as updateById from "./update-by-id";

export const usuarioProviders = {
  ...create,
  ...deleteById,
  ...getByEmail,
  ...updateById
};
