import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getSession } from "~/server/better-auth/server";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

/**
 * file router for UploadThing
 * handles profile image uploads with basic authentication check
 */
export const ourFileRouter = {
  /**
   * defining the profileImage uploader
   * allows one image up to 2MB
   */
  profileImage: f({
    image: {
      maxFileSize: "2MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      // checking authentication
      const session = await getSession();

      if (!session) {
        // eslint-disable-next-line @typescript-eslint/only-throw-error
        throw new UploadThingError({
          code: "FORBIDDEN",
          message: "you must be logged in to upload a profile picture",
        });
      }

      // metadata to be used in onUploadComplete
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // logging upload for server diagnostics
      console.log("upload complete for userId:", metadata.userId);
      console.log("file url:", file.ufsUrl);

      // returning info to the client
      return { uploadedBy: metadata.userId, url: file.ufsUrl };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
