import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
  secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  region: import.meta.env.VITE_AWS_REGION,
});

const s3 = new AWS.S3();

export const imageUpload = async (file: File) => {
  try {
    const response = await s3
      .upload({
        Bucket: "elice-project-blahblah",
        Key: `images/$${Date.now()}-${file.name}`,
        Body: file,
        ContentType: file.type,
      })
      .promise();
    return response;
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
