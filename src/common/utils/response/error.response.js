import { NODE_ENV } from "../../../../config/config.service";

export const globalErrorHandling = (error, req, res, next) => {
  const status = error.cause?.status ?? 500;
  return res.status(status).json({
    error_message:
      status === 500
        ? "something went wrong"
        : (error.message ?? "something went wrong"),
    stack: NODE_ENV === "development" ? error.stack : undefined,
  });
};

export const ErrorException = ({
  message = "fail",
  status = 400,
  extra = undefined,
}) => {
  throw new Error(message, { cause: { status, extra } });
};

export const NotFoundException = ({
  message = "not found",
  status = 404,
  extra = undefined,
}) => {
  return ErrorException({ message, status, extra });
};

export const ConflictException = ({
  message = "conflict",
  status = 409,
  extra = undefined,
}) => {
  return ErrorException({ message, status, extra });
};
