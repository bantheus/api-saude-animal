import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodType, z } from "zod";

type TProperty = "body" | "header" | "params" | "query";

type TGetSchema = <T>(schema: ZodType<T>) => ZodType<T>;

type TAllSchemas = Record<TProperty, ZodType<any>>;

type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchemas>;

type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;

export const validation: TValidation = (getAllSchemas) => async (req, res, next) => {
  const schemas = getAllSchemas(schema => schema);
  const errorsResult: Record<string, Record<string, string>> = {};

  Object.entries(schemas).forEach(([key, schema]) => {
    try {
      schema.parse(req[key as TProperty]);
    } catch (err) {
      const zodError = err as z.ZodError;
      const errors: Record<string, string> = {};

      zodError.issues.forEach(issue => {
        if (!issue.path) return;

        const path = issue.path.join(".");
        errors[path] = issue.message;
      });

      errorsResult[key] = errors;
    }
  });

  if (Object.entries(errorsResult).length === 0) {
    return next();
  } else {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errorsResult });
  }
};
