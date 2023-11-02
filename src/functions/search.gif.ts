import * as cheerio from "cheerio";

export async function searchGif(query: string) {
  const formattedQuery = query
    .replace("-", "+")
    .trim()
    .replace(" ", "+")
    .toLowerCase();
  const randomPage = randomIntFromInterval(1, 6);
  const request = await fetch(
    `https://www.pornhub.org/gifs/search?search=${formattedQuery}&page=${randomPage}`,
    {
      headers: {
        Connection: "keep-alive",
        Accept:
          "text/html, application/xhtml+xml, application/xml;q=0.9, image/webp, */*;q=0.8",
        "Accept-Language": "en",
        "User-Agent": "got-scraping/1.3.9",
      },
    }
  ).then((response) => response.text());
  const array: string[] = [];
  const $ = cheerio.load(request);
  const res = $(".wrapper")
    .find(".container")
    .find(".nf-videos")
    .find(".gifsWrapper")
    .find("ul")
    .find("li.gifVideoBlock")
    .map((_, element) => {
      const $element = $(element);
      const videos = $element
        .find("a")
        .find("video")
        .attr("data-mp4")
        ?.replace("mp4", "gif");
      return array.push(videos as string);
    });
  return array[Math.floor(Math.random() * array.length)];
}
function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
