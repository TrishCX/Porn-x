// export * from "./classes/index";
// export * from "./interfaces/index";
// export * from "./collection/index";
// export * from "./videos/sources";
import { getInformation } from "./functions/getInformation";

getInformation({
  query: "Alison tyler",
}).then((response) => console.log(response));
