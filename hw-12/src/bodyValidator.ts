import { HttpError } from "routing-controllers";

function bodyValidate() {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any) {
      if (
        Object.keys(args[0]).length === 0 &&
        Object.keys(args[0])!.includes("name")
      ) {
        throw new HttpError(400, "User name is required");
      }

      if (args[0].name.length < 2) {
        throw new HttpError(
          400,
          "User name must be at least 2 characters long"
        );
      }

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
export { bodyValidate };
