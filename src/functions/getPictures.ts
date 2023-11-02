import * as cheerio from "cheerio";

export interface PicturesOptions {
  query: string;
  page?: number;
}

export async function getPictures(options: PicturesOptions) {
  const query: string = options.query.replace(/\s+/g, "-").toLowerCase();
  const page: number = !options.page ? 1 : options?.page;
  if (!query) throw Error("Specify a query to look.");
  if (typeof page !== "number")
    throw Error("The page option only allows the value to be a `Number`");
  const baseURL: string = `https://www.youx.xxx/tag/${query}/picture/${page}`;
  const body = await fetch(baseURL).then((res) => res.text());
  const $ = cheerio.load(body);
  const imagesArray: string[] = [];
  $("body")
    .find(".xrotator-thumbs")
    .find(".thumb")
    .map((_, element) => {
      const $$ = cheerio.load(element);
      const span = $$("span");
      const image: string = span
        .find("img")
        ?.attr("data-src")
        ?.replace("320x", "640x") as string;
      return imagesArray.push(image);
    });
  if (!imagesArray) throw Error("Ran in some problems, error fetching images.");
  return imagesArray;
}
