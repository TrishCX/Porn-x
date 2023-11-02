import * as cheerio from "cheerio";

export async function $milf300(query: string, options?: { page: number }) {
  const url = `https://milf300.com/search?query=${query}&page=${
    !options?.page ? 1 : options?.page
  }`;

  const request = await fetch(url, {
    headers: {
      Accept:
        "text/html, application/xhtml+xml, application/xml;q=0.9, image/webp, */*;q=0.8",
      "Accept-Language": "en",
      "User-Agent": "got-scraping/1.3.9",
    },
  }).then((res) => res.text());
  const $ = cheerio.load(request);
  const array: string[] = [];
  $(".row")
    .find(".mb-2")
    .map(async (index, element) => {
      const $element = $(element);
      const _href = $element.find("a").attr("href");
      return array.push(`https://milf300.com${_href as string}`);
    });

  const $url = await _$fetch300(
    array[Math.floor(Math.random() * array.length)]
  );
  return $url;
}

async function _$fetch300(url: string) {
  const request = await fetch(url, {
    headers: {
      Accept:
        "text/html, application/xhtml+xml, application/xml;q=0.9, image/webp, */*;q=0.8",
      "Accept-Language": "en",
      "User-Agent": "got-scraping/1.3.9",
    },
  }).then((res) => res.text());
  const $ = cheerio.load(request);
  const videoURL = $(".col-md-8").find("video").find("source").attr("src");
  return videoURL;
}

export async function $absolute(query: string) {
  const request = await fetch(
    `http://www.absoluporn.com/en/search-${query}-1.html`
  ).then((response) => response?.text());
  const array: string[] = [];
  const $ = cheerio.load(request);

  const res = $(".bloc-centre")
    .find(".bloc-menu-centre")
    .find(".bloc-thumb")
    .find(".thumb-main")
    .map((_, element) => {
      const $element = $(element);
      const _time = $element.find(".thumb-video-img").find(".time").text();
      const time = $strToSeconds(_time);
      if (time < 500) return;
      const title = $element.find(".thumb-main-titre").text();
      const urlPath = $element
        ?.find(".thumb-main-titre")
        ?.find("a")
        ?.attr("href")
        ?.replace("..", "");
      const url = `http://www.absoluporn.com${urlPath}`;
      array.push(url);
    });
  return _$fetchAbsolute($randomArray(array));
}

async function _$fetchAbsolute(url: string) {
  const request = await fetch(url).then((response) => response.text());
  const $ = cheerio.load(request);
  const data = $(".bloc-centre")
    .find(".bloc-player")
    .find("video")
    .find("source")
    .attr("src");
  return data;
}

export async function $noodle(query: string) {
  const array: string[] = [];
  const request = await fetch(`https://noodlemagazine.com/video/${query}`).then(
    (response) => response.text()
  );
  const $ = cheerio.load(request);
  $(".list_videos")
    .find(".item")
    .map((index, element) => {
      const $element = $(element);
      const time = $element.find(".m_time").text();
      const _time = $strToSeconds(time);
      if (_time < 500) return;
      const url = $element.find("a").attr("href");
      array.push(`https://noodlemagazine.com${url}`);
    });
  return _$fetchNoodle($randomArray(array));
}

async function _$fetchNoodle(url: string) {
  const request = await fetch(url).then((response) => response.text());
  const $ = cheerio.load(request);
  const data = $("script[type='application/ld+json']").html() as string;
  const jsonData = JSON.parse(data);
  const videoURL = jsonData.embedUrl as string;
  return videoURL;
}

export async function $spank($slicedQuery: string) {
  const array: string[] = [];
  const slicedQuery = $slicedQuery.toLowerCase().replace(" ", "%20");
  const request = await fetch(
    `https://spankbang.party/s/${slicedQuery}/?o=all`
  ).then((response) => response?.text());
  const $ = cheerio.load(request);
  const data = $("#browse_new");
  data
    .find(".main_results")
    .find(".video-item")
    .map((index, element) => {
      const $element = $(element);
      const _duration = $element.find("span.l").text().replace("m", "");
      const duration = convert(Number(_duration));
      if (duration < 500) return;
      const _url = $element.find("a").attr("href");
      const url = `https://spankbang.party${_url}`;
      array.push(url);
    });
  const uri = await $fetchSpank($randomArray(array));
  return uri as string;
}

async function $fetchSpank(url: string) {
  const request = await fetch(url).then((res) => res.text());
  const $ = cheerio.load(request);
  const $videourl = $("#video_container")
    .find("video")
    .find("source")
    .attr("src");
  return $videourl;
}
function convert(minutes: number) {
  return minutes * 60;
}

function $randomArray<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}
function $strToSeconds(stime: string) {
  var tt = stime.split(":").reverse();
  return (
    (tt.length >= 3 ? +tt[2] : 0) * 60 * 60 +
    (tt.length >= 2 ? +tt[1] : 0) * 60 +
    (tt.length >= 1 ? +tt[0] : 0)
  );
}
