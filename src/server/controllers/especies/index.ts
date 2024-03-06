import * as create from "./create";
import * as getAll from "./get-all";
import * as getById from "./get-by-id";
import * as updateById from "./update-by-id";

export const especiesController = {
  ...create,
  ...getAll,
  ...getById,
  ...updateById
};
