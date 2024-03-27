import * as create from "./create";
import * as deleteById from "./delete-by-id";
import * as getAll from "./get-all";
import * as getById from "./get-by-id";
import * as updateById from "./update-by-id";

export const vacinaController = {
  ...create,
  ...getAll,
  ...getById,
  ...updateById,
  ...deleteById
};
