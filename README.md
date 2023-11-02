# @imax.i7/porn-x

`@imax.i7/porn-x` is an NSFW (Not Safe For Work) package that provides a wide range of functionality related to adult content. With this package, you can retrieve information about adult stars, fetch videos, GIFs, and more.

**Please note that this package is intended for mature audiences and should only be used in appropriate and legal contexts.**

## Installation

You can install `@imax.i7/porn-x` using npm or yarn:

```bash
npm install @imax.i7/porn-x
# or
yarn add @imax.i7/porn-x
```

## Usage

```javascript
const { Initializer } = require("@imax.i7/porn-x");

// Making a new instance
const client = new Initializer();

// Example usage to get information about an adult star
const name = "Lisa Ann";

// Get information about the adult star
const info = client.getInformation({
  query: name,
  images: true, // Only when you want the photo grids.
});
console.log(info);
```

# Classes

- Initializer

```js
import { Initializer } from "porn-x";

const client = new Initializer();
```

## Contributing

Contributions are welcome! Please read our [Contribution Guidelines](CONTRIBUTING.md) for more information on how to contribute to this project.

## License

This project is licensed under the [MIT License](LICENSE).
