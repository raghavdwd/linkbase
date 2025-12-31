import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "~/server/uploadthing";

/**
 * UploadThing API route handler
 */
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
