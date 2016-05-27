# Icon Font generator for VSTS

### Prerequisites
- nodejs 4.1+
- python 2.7

### Use
- clone repo
- npm install
- put *.svg format icons in source/svgs folder
- edit templates as needed
- edit gulpfile.js as needed
- run gulp task
- asset files are generated in dist folder

### Known Issues
- Instructions on the demo html page are still draft
- The given template sets the group selector class to be the same as the font name **bowtie**, while in the actual product they use *bowtie-icon* as the group selector class. If you use the given assets in your own projects, please use **bowtie** as group selector class. For example:
>     <span class="bowtie bowtie-arrow-up"></span>
