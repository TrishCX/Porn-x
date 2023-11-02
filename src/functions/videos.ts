import { $milf300, $spank, $noodle, $absolute } from "../videos/sources";
interface Options {
  query: string;
  page?: number;
}
export async function videos(options: Options) {
  const query = options?.query as string;
  try {
    const functions: {
      [key: string]: (query: string, options?: { page: number }) => any;
    } = {
      $milf300,
      $spank,
      $noodle,
      $absolute,
    };

    const functionNames = Object.keys(functions);
    const randomFunctionName =
      functionNames[Math.floor(Math.random() * functionNames.length)];
    return functions[randomFunctionName](query, {
      page: !options?.page ? 1 : options?.page,
    }) as string;
  } catch (error: any) {
    throw new Error("❌ | Something went really wrong.");
  }
}
