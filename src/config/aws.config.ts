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
        Key: `images/${Date.now()}-${file.name}`,
        Body: file,
        ContentType: file.type,
      })
      .promise();
    return response.Location;
  } catch (error) {
    throw error;
  }
};

export const multipleImageUpload = async (files: File[]) => {
  try {
    const promises = files.map((file) => imageUpload(file));
    const response = await Promise.all(promises);
    return response;
  } catch (error) {
    throw error;
  }
};
