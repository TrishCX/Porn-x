import * as cheerio from "cheerio";
import { post } from "../request/index";
interface Options {
  id: string;
  page?: number;
}

export async function $id(options: Options) {
  const page = !options?.page ? 1 : options?.page;
  if (typeof page !== "number")
    throw new Error("The page needs to be a number.");
  const imageId = options?.id;
  if (typeof imageId !== "string")
    throw new Error("The image id needs to be a string.");

  const request = await fetch(`https://sxypix.com/w/${imageId}/${page}`).then(
    (response) => response.text()
  );
  const photoArray: string[] = [];
  const $ = cheerio.load(request);
  const isExists =
    $("#content").find("#center_panel").find(".grid").has("div").html() === null
      ? false
      : true;
  if (!isExists) throw new Error(`The page number doesn't exists.`);
  const x = $("#content")
    .find("#center_panel")
    .find(".content_panel")
    .find(".gallgrid")
    .attr("data-x");
  const aid = $("#content")
    .find("#center_panel")
    .find(".content_panel")
    .find(".gallgrid")
    .attr("data-aid");
  const ghash = $("#content")
    .find("#center_panel")
    .find(".content_panel")
    .find(".gallgrid")
    .attr("data-ghash");
  const pictureId = $("#content")
    .find("#center_panel")
    .find(".grid")
    .find("div")
    .attr("data-photoid");
  const obj = {
    ghash,
    aid,
    x,
    width: 1399,
    pid: pictureId,
  };
  const res = await post(obj);
  res?.r.map((v: any, _: number) => {
    const $ = cheerio.load(v);
    const urlPATH = $(".gall_pix_el")
      ?.find("img")
      ?.attr("data-src")
      ?.replace("/cdn/x", "");
    const imageURL = `https://x.sxypix.com/pixi${urlPATH}`;
    photoArray.push(imageURL);
  });
  return photoArray;
}
