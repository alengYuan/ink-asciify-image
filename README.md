# Ink-asciify-image &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/alengYuan/ink-asciify-image/blob/main/LICENSE) [![npm version](https://img.shields.io/npm/v/ink-asciify-image.svg?style=flat)](https://www.npmjs.com/package/ink-asciify-image)

Ink-asciify-image is a component for [Ink](https://github.com/vadimdemedes/ink).

## Installation

```shell
npm install ink-asciify-image
```

## Examples

```javascript
import React from 'react'
import { render, Box } from 'ink'
import InkAsciifyImage from 'ink-asciify-image'

render(
    <Box gap={1}>
        <InkAsciifyImage
            url="./avatar.jpg"
            width={80}
            height={40}
            alt="Author's avatar"
        />
        <InkAsciifyImage
            url="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            width={40}
            height={40}
            tryCorrectAspectRatio
            renderInTwoBit
        />
        <InkAsciifyImage url="C:/wrong/path" width={40} height={20} />
    </Box>,
)
```

Result:

![The output of the above code](https://raw.githubusercontent.com/alengYuan/ink-asciify-image/main/assets/demo.png)

## APIs

### React component

```typescript
const InkAsciifyImage: React.FC<{
    url:⁰ string;
    width:¹ number;
    height:² number;
    tryCorrectAspectRatio?:³ boolean;
    renderInTwoBit?:⁴ boolean;
    alt?:⁵ string;
}>;
```

-   ⁰ [`url`]: URL of the rendered image, it's based on [Jimp](https://github.com/jimp-dev/jimp).
-   ¹ [`width`]: Width of the rendered image.
-   ² [`height`]: Height of the rendered image.
-   ³ [`tryCorrectAspectRatio`]: Specifies whether to attempt to correct the aspect ratio of the rendered image, it often takes two ASCII characters to render a square like pixel point, this option would not eliminate the destructive effect on the original image's aspect ratio caused by the given `width` and `height`.
-   ⁴ [`renderInTwoBit`]: Specifies whether to render the image in monochrome.
-   ⁵ [`alt`]: Description of the image content, which will be displayed instead of an error message if the image fails to load.

### Core function

```typescript
/**
 * @throws {RangeError} Value of `width` or `height` must be natural number.
 */
function asciifyImage(url:⁰ string, options: {
    width:¹ number;
    height:² number;
    tryCorrectAspectRatio?:³ boolean;
    renderInTwoBit?:⁴ boolean;
}):⁵ Promise<Array<string>>;
```

-   ⁰ [`url`]: URL of the rendered image, it's based on [Jimp](https://github.com/jimp-dev/jimp).
-   ¹ [`width`]: Width of the rendered image.
-   ² [`height`]: Height of the rendered image.
-   ³ [`tryCorrectAspectRatio`]: Specifies whether to attempt to correct the aspect ratio of the rendered image, it often takes two ASCII characters to render a square like pixel point, this option would not eliminate the destructive effect on the original image's aspect ratio caused by the given `width` and `height`.
-   ⁴ [`renderInTwoBit`]: Specifies whether to render the image in monochrome.
-   ⁵ [`asciifyImage()`]: It would return a promise instance contains an array which stores each line of ASCII characters rendered from image.

## FAQ

<details open>
<summary>
<h3 style="display: inline;">Why is the size of this package so large?</h3>
</summary>
In order to prevent developers from encountering various problems that have to be solved when using this package if they prefer ES modules, by prepackaging core function, although possible errors are reduced, the total size of the package is very large due to the use of un-customized <a href="https://github.com/jimp-dev/jimp">Jimp</a>. If you're not happy with this, you can fork the source code of this package and do it however you want. But this package is not used in browsers, so why care about the size so much?
</details>

<details open>
<summary>
<h3 style="display: inline;">Why is this package called its current name?</h3>
</summary>
This package is one component for <a href="https://github.com/vadimdemedes/ink">Ink</a>, and it's inspired by <a href="https://github.com/ajay-gandhi/asciify-image">asciify-image</a>.
</details>

## License

Ink-asciify-image is [MIT](https://github.com/alengYuan/ink-asciify-image/blob/main/LICENSE) licensed.
