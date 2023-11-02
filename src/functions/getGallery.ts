import * as cheerio from "cheerio";

export async function getGallery(url: string) {
  try {
    const response = await fetch(url).then((response) => response?.text());
    const array: string[] = [];
    const $ = cheerio.load(response);
    const res = $("body")
      .find(".wookmark-initialised")
      .find(".thumbwook")
      .map((_, el) => {
        const $_ = $(el);
        const attr = $_.find("a").attr("href") as string;
        array.push(attr);
      });
    return array;
  } catch (error: any) {
    throw Error("Error fetching gallery.");
  }
}
