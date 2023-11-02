import * as cheerio from "cheerio";

interface Options {
  query: string;
  page?: number;
}

export interface Photos {
  id: string;
  image: string;
}

export async function getImages(options: Options) {
  const { query, page } = options;
  const starName = query.replace(" ", "-").trim();
  const photoArray: Photos[] = [];
  const request = await fetch(`https://sxypix.com/s/${starName}/${page}`).then(
    (response) => response?.text()
  );
  const $ = cheerio.load(request);
  const hasGnf =
    $("#content").find("#center_panel").find(".grid").has("div").html() === null
      ? false
      : true;
  if (!hasGnf) throw new Error(`The page number doesn't exists.`);

  $("#content")
    .find("#center_panel")
    .find(".grid")
    .find("a")
    .map((_, element) => {
      const $element = $(element);
      const photoIdHref = $element.attr("href") as string;
      const photoId = photoIdHref.split("?")[0].split("/w/")[1];
      const photoBackPath = $element
        .find("div")
        .find("img")
        .attr("data-src")
        ?.replace("//x", "x");

      const photoURL = `${photoBackPath}`;
      photoArray.push({
        id: photoId,
        image: photoURL,
      });
    });
  return photoArray;
}
