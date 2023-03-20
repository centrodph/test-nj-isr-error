import { z } from "zod";
import { generateErrorMessage, ErrorMessageOptions } from "zod-error";

const options: ErrorMessageOptions = {
  delimiter: {
    error: " 🔥 ",
  },
  transform: ({ errorMessage, index }) =>
    `Error #${index + 1}: ${errorMessage}`,
};

export const zodToHumanReadable = (error: z.ZodIssue[]) => {
  const message = generateErrorMessage(error, options);
  
  return message;
}
