import axios from "axios";
export async function post(object: any) {
  const html = await axios({
    method: "post",
    url: "https://sxypix.com/php/gall.php",
    data: object,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  const result = await html.data;
  return result;
}
