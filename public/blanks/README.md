# Blank apparel product images

Drop brand product photos here. The catalog (`/blanks`) automatically shows a
clean placeholder until the matching file exists, then swaps in the real photo.

## Expected files (exact paths)

Use **square-ish JPG/PNG** photos (ideally 800×800px or larger), front-facing,
on a white/light background for a consistent grid.

```
bella-canvas/
  adult-tee.jpg          Bella Canvas Adult Unisex T-Shirt
  long-sleeve.jpg        Bella Canvas Adult Long Sleeve Tee
  youth-long-sleeve.jpg  Bella Canvas Youth Long Sleeve Tee
  jersey-tank.jpg        Bella Canvas Adult Jersey Tank
  tank-9360.jpg          Bella Canvas Tank 9360

rabbit-skins/
  youth-tee.jpg          Rabbit Skins Youth T-Shirt
  toddler-tee.jpg        Rabbit Skins Toddler T-Shirt
  baby-onesie.jpg        Rabbit Skins Baby Onesie

gildan/
  adult-sweatshirt.jpg   Gildan Adult Crewneck Sweatshirt
  adult-hoodie.jpg       Gildan Adult Pullover Hoodie
  youth-sweatshirt.jpg   Gildan Youth Sweatshirt

next-level/
  racerback-tank.jpg     Next Level Adult Racerback Tank

comfort-colors/
  adult-tee.jpg          Comfort Colors Garment-Dyed Adult Tee
  long-sleeve.jpg        Comfort Colors Garment-Dyed Long Sleeve
  sweatshirt.jpg         Comfort Colors Garment-Dyed Sweatshirt

value/
  adult-tee.jpg          Value Adult Unisex Tee
  long-sleeve.jpg        Value Adult Long Sleeve
  baby-bodysuit.jpg      Value Baby Bodysuit
```

## Where to get them

Each brand's website / wholesale catalog has product photos:

- Bella Canvas — bellacanvas.com
- Gildan — gildanbrands.com
- Comfort Colors — comfortwashedtees / comfortcolors
- Next Level — nextlevelapparel.com

Download the blank/front product shot, rename to the path above, and drop it in.

## Adding a new product

1. Add the product to `lib/blank-catalog.ts` (`blankProducts` array) with an
   `image` path.
2. Drop the matching photo here.

## Pricing note

Costs in `lib/blank-catalog.ts` are **supplier cost**. Retail = `cost × markup`
(see `blankConfig`). Change the markup in one place to reprice the whole catalog.
