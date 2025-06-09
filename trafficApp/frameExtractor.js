import { createThumbnail } from "react-native-create-thumbnail";

export const extractFrame = async (videoPath) => {
  try {
    const result = await createThumbnail({
      url: videoPath,
      timeStamp: 1000, // lấy frame ở giây thứ 1
    });
    return result.path;
  } catch (err) {
    console.error(err);
    return null;
  }
};
