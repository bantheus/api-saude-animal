import * as create from "./create";
import * as getAll from "./get-all";

export const especiesController = {
  ...create,
  ...getAll
};
