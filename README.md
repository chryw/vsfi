# Icon Font generator for VSTS

### Prerequisites
- nodejs 4.1+
- python 2.7

### Use
- clone repo
- `npm install`
- put `*.svg` format icons in `source/svgs` folder
- edit templates as needed
- edit gulpfile.js as needed
- run gulp task
- asset files are generated in `dist` folder
  - `dist/VSO/_IconsCommon.scss` --> `VSO/Vssf/WebPlatform/Platform/Presentation/Styles/Icons/_IconsCommon.scss`
  - `dist/VSO/Bowtie.eot` --> `VSO/Vssf/WebPlatform/Platform/Presentation/Fonts/Icons/Bowtie.eot`
  - `dist/VSO/Bowtie.svg` --> `VSO/Vssf/WebPlatform/Platform/Presentation/Fonts/Icons/Bowtie.svg`
  - `dist/VSO/Bowtie.woff` --> `VSO/Vssf/WebPlatform/Platform/Presentation/Fonts/Icons/Bowtie.woff`
  - [Catalog website](http://vsicons-bowtie.azurewebsites.net) files will be in `dist/catalog` folder
