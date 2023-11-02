import {
  getInformation as infoGet,
  getPictures as pictureGet,
  searchGif as gifSearch,
  videos,
  Result,
  PicturesOptions,
  $id as id,
  getImages as imagesGet,
  getGallery as galleryGet,
} from "../functions/index";
interface Options {
  query: string;
  images?: boolean;
}
interface VideosOptions extends PicturesOptions {}
interface IOptions {
  id: string;
  page?: number;
}
export default class ExtendedClient {
  constructor() {}
  async $id(options: IOptions) {
    return await id(options);
  }
  async getGallery(query: string) {
    if (!query) throw Error("Specify a valid gallery url.");
    return await galleryGet(query);
  }
  async getImages(options: PicturesOptions) {
    return await imagesGet(options);
  }
  async getInformation<T extends Options>(
    options: T
  ): Promise<Result<T["images"]>> {
    return infoGet(options);
  }
  async getPictures(options: PicturesOptions) {
    return pictureGet(options);
  }
  async searchGif(query: string) {
    return gifSearch(query);
  }
  async getVideo(options: VideosOptions) {
    return videos(options);
  }
}
