# assets/images

Drop recipe photos here.

## Naming convention

  v{vol}r{recipe}-short-recipe-name.jpg

Examples:
  v1r1-lemongrass-hummus.jpg
  v2r1-tom-yum-burrata.jpg
  v3r4-miso-masala-risotto.jpg

## Using a photo in volumes.js

1. Drop the file here.
2. In index.html <style>, add:
   .ph-v2r1 {
     background-image: url('/assets/images/v2r1-tom-yum-burrata.jpg');
     background-size: cover;
     background-position: center;
   }
3. Set the recipe's ph field in volumes.js to 'ph-v2r1'.

## Recommended specs

- Format:  JPG or WebP
- Size:    1200 × 500 px minimum (21:9 ratio matches the photo block)
- Weight:  under 300 KB per image
