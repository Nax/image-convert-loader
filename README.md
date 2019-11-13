# image-convert-loader

A webpack loader to preprocess images.

## Install

    yarn add -D image-convert-loader

## Usage

This loader is typically used with other loaders such as file-loader or img-loader.

Exemple conf:

    {
        test: /\.(png|jpg|webp)$/,
        use: [
            'file-loader',
            'img-loader',
            'image-convert-loader'
        ]
    }

You can then pass query arguments when loading images:

    const url = require('./foo.png?w=512&format=webp');

## Options

The following options are accepted as query arguments:

**w** | **h**: Sets the width and/or the height of the resulting image. If one is missing, the aspect ratio will be preserved.  
**format**: Sets the format of the resulting image. valid values are `png`, `jpg` and `webp`.

## License

MIT.
