import * as cheerio from "cheerio";

type Options = {
  query: string;
  page?: number;
};
export async function getPornPics(requiredOptions: Options) {
  const { query, page } = requiredOptions;
  if (!query) throw Error("No query specified");
  const pageToFetch = !page ? 1 : page;
  const URL: string = `https://www.pornpictureshq.com/block/thumbs/search?q=${query}&page=${pageToFetch}`;
  const data = await fetchURL(URL);
  const images = parseHTML(data);
  return images;
}

async function fetchURL(url: string) {
  const request = await fetch(url);
  const response = await request?.text();
  return response;
}

function parseHTML(html: string): string[] {
  const array: string[] = [];
  const $ = cheerio?.load(html);
  $("a").map((index, element) => {
    const $_ = $(element);
    const images = $_.find("img").attr("srcset")?.toString() as string;
    return array.push(images);
  });
  return array;
}
