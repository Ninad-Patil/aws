const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

//the new nodejs user with no permissions
const s3client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
  },
});

require("dotenv").config();

async function getObjectURL(Key) {
  const command = new GetObjectCommand({
    Bucket: "mybucket-ninad",
    Key: Key,
  });

  const url = await getSignedUrl(s3client, command);
  return url;
}

async function putObjectURL(filename) {
  const command = new PutObjectCommand({
    Bucket: "mybucket-ninad",
    Key: `uploads/user-uploads/${filename}`,
  });

  const url = await getSignedUrl(s3client, command);
  return url;
}

async function init() {
  console.log(
    await getObjectURL("uploads/user-uploads/image-1695792918029.png")
  );
  //console.log(await putObjectURL(`image-${Date.now()}.png`, "image/png"));
}

init();
