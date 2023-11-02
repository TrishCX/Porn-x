export async function $reddit(query: string) {
  const requestReddit = await fetch(
    `https://www.reddit.com/r/ClassyPornstars/search.json?q=${query}&restrict_sr=true&include_over_18=on&limit=85`
  );
  const array: string[] = [];
  const response = await requestReddit.json();
  const data = response.data.children;
  for (const res of data) {
    const url = res?.data?.url_overridden_by_dest;
    if (url.includes("gallery")) {
      const mediaData = res.data.media_metadata;
      for (const ids in mediaData) {
        const response = mediaData[ids].p.filter((v: any, _: number) => {
          return v.x === 640;
        });
        const baseURL = response[0]?.u;
        const url =
          baseURL === undefined ? undefined : ($format(baseURL) as string);
        array.push(url as string);
      }
    } else {
      array.push(url);
    }
  }
  return $randomArray($shuffle(array));
}
function $format(url: string) {
  const finalString = url.replace(/[~`!@#$%^*()+{}\[\];\'\"<>,\\\\-_]/g, "");
  const replaceString = finalString.split("amp");
  const d = replaceString
    .map((v) => {
      return `${v}`;
    })
    .join("");
  return d;
}
function $randomArray<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
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
