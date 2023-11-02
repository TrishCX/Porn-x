export interface Options {
  query: string;
  offSet?: number;
  limit?: number;
  lang?: string | "en";
  shuffled?: boolean;
  gallery?: boolean;
}

export interface WallpaperResults {
  image?: string;
  uri?: string;
}

export async function $wallpaper(options: Options) {
  const offSet = !options?.offSet ? 1 : options.offSet;
  const limit = !options?.limit ? 10 : options.limit;
  const lang = !options?.lang ? "en" : options.lang;
  const shuffled = options?.shuffled;
  const gallery = options.gallery;
  const query = options?.query;
  const request = await fetch(
    `https://www.pornpics.com/search/srch.php?q=${query}&lang=${lang}&limit=${limit}&offset=${offSet}`
  );
  const response = (await request.json()) as any[];
  const array: WallpaperResults[] = [];
  response.map((v, _) => {
    const tURI = v?.t_url_460.replace("/460/", "/1280/");
    array.push({
      image: tURI,
      uri: gallery ? v?.g_url : null,
    });
  });
  return shuffled ? $shuffle(array) : array;
}

function $shuffle<T>(array: T[]): T[] {
  const newArray = array.slice();
  let currentIndex = newArray.length;
  let randomIndex: number;
  let temporaryValue: T;
  while (currentIndex !== 0) {
    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    temporaryValue = newArray[currentIndex];
    newArray[currentIndex] = newArray[randomIndex];
    newArray[randomIndex] = temporaryValue;
  }

  return newArray;
}
