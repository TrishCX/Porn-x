import * as cheerio from "cheerio";
// @types
import type { Information } from "../interfaces";

interface Options {
  query: string;
  images?: boolean;
}
export interface ExtendedInformation extends Information {
  images?: string[];
  gridProfileImages?: string[];
  thumbnailPicture?: string;
}

export type Result<T> = T extends true ? ExtendedInformation : Information;

export async function getInformation<T extends Options>(
  options: T
): Promise<Result<T["images"]>> {
  const query = options?.query;
  const images = options?.images;
  const url = `https://www.babepedia.com/babe/${query}`;
  const body = await fetch(url).then((res) => res.text());
  const $ = cheerio.load(body);

  const imagesArray: string[] = [];
  const name = $(`h1:contains("${query}")`).text();
  const _hashPath = $("body")
    .find("#biography")
    .find("#profimg")
    .find("a")
    .attr("href");
  const gridProfileImages: string[] = [];
  const thumbnailPicture = `https://www.babepedia.com/${_hashPath}`;
  $("body")
    .find("#biography")
    .find("#profselect")
    .find(".prof")
    .map((_, el) => {
      const _$: string = $(el).find("a").attr("href") as string;
      return gridProfileImages.push(`https://www.babepedia.com${_$}`);
    });
  const about = $(`h2:contains("About ${name}")`)
    .next()
    .text()
    .replace(/\s+/g, " ");
  const age = $(`span:contains("Age")`)
    .parent()
    .text()
    .trim()
    .split(" ")
    .slice(1)
    .join(" ")
    .split("\n")[0]
    .trim()
    .replace(/\D/g, "");
  const anotherNames = $(`h2:contains("aka")`)
    .text()
    .replace("aka", "")
    .replace(/\s+/g, " ")
    .trim()
    .split("/")
    .map((str) => str.trim());

  const boobsType = $(`span:contains("Boobs")`).parent().find("a").text();
  const tattoos =
    $(`span:contains("Tattoos")`)
      .parent()
      .text()
      .trim()
      .split(" ")
      .slice(1)
      .join(" ")
      .split("\n")[0]
      .trim()
      .replace(/[^\w\s]/gi, "") || "No tattoos";
  const activeYears = $(`span:contains("Years active:")`)
    .parent()
    .text()
    .trim()
    .split(" ")
    .slice(1)
    .join(" ")
    .split("\n")[0]
    .trim()
    .replace(/active:/g, "")
    .replace(";", "")
    .trim();

  const cupSize = $(`span:contains("Bra/cup size:")`)
    .parent()
    .text()
    .trim()
    .split(" ")
    .slice(1)
    .join(" ")
    .split("\n")[0]
    .trim()
    .replace(/active:/g, "")
    .replace(";", "")
    .trim()
    .replace("size:", "")
    .trim();
  const bodyType = $(`span:contains("Body type:")`)
    .parent()
    .text()
    .trim()
    .split(" ")
    .slice(1)
    .join(" ")
    .split("\n")[0]
    .trim()
    .replace(/active:/g, "")
    .replace(";", "")
    .trim()
    .replace("type:", "")
    .trim();
  const height = $(`span:contains("Height:")`)
    .parent()
    .text()
    .trim()
    .split(" ")
    .slice(1)
    .join(" ")
    .split("\n")[0]
    .trim();
  const weight = $(`span:contains("Weight:")`)
    .parent()
    .text()
    .trim()
    .split(" ")
    .slice(1)
    .join(" ")
    .split("\n")[0]
    .trim();
  const eyeColor = $(`span:contains("Eye color:")`)
    .parent()
    .text()
    .trim()
    .split(" ")
    .slice(1)
    .join(" ")
    .split("\n")[0]
    .trim()
    .replace(/active:/g, "")
    .replace(";", "")
    .trim()
    .replace("color:", "")
    .trim();

  const hairColor = $(`span:contains("Hair color:")`)
    .parent()
    .text()
    .trim()
    .split(" ")
    .slice(1)
    .join(" ")
    .split("\n")[0]
    .trim()
    .replace(/active:/g, "")
    .replace(";", "")
    .trim()
    .replace("color:", "")
    .trim();

  $(`h2:contains("Galleries")`)
    .parent()
    .find("div")
    .find("div")
    .map(async (index, element) => {
      const $element = $(element).find("a").find("img").attr("data-src");
      const images = `https://www.babepedia.com${$element}`;
      return imagesArray.push(images);
    });

  $(`h2:contains("Uploaded By Our Users")`)
    .parent()
    .find("div")
    .find("div")
    .map(async (index, element) => {
      const $element = $(element).find("a").find("img").attr("data-src");
      const images = `https://www.babepedia.com${$element}`;
      return imagesArray.push(images);
    });

  return !options.images
    ? ({
        name,
        age: Number(age),
        about,
        activeYears,
        anotherNames,
        bodyType,
        boobsType,
        cupSize,
        eyeColor,
        hairColor,
        height,
        tattoos,
        weight,
      } as Result<T>)
    : ({
        name,
        age: Number(age),
        about,
        activeYears,
        anotherNames,
        bodyType,
        boobsType,
        cupSize,
        eyeColor,
        hairColor,
        height,
        tattoos,
        weight,
        images: imagesArray,
        thumbnailPicture,
        gridProfileImages,
      } as Result<T>);
}
