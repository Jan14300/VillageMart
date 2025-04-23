# Placeholder Images for Village Mart

Here are the placeholder images you need to download locally for your Village Mart project. These will replace the `via.placeholder.com` images that are causing 500 errors.

## Product Images (300x300)

Download these images and place them in your `public/images/products/` directory:

1. [Product Placeholder 300x300](https://placehold.co/300)
2. [Product Placeholder 300x300 (Alternative)](https://placeholder.pics/svg/300)
3. [Product Placeholder 300x300 (Another option)](https://dummyimage.com/300/ffffff/000000)

## Hero Image (600x400)

Download this image and place it in your `public/images/hero/` directory:

1. [Hero Placeholder 600x400](https://placehold.co/600x400)
2. [Hero Placeholder 600x400 (Alternative)](https://placeholder.pics/svg/600x400)
3. [Hero Placeholder 600x400 (Another option)](https://dummyimage.com/600x400/ffffff/000000)

## How to Use

After downloading these images, update your code to use local paths instead of external URLs. For example:

```jsx
// Before
image: 'https://via.placeholder.com/300',

// After
image: '/images/products/product-placeholder-300.png',
```

And for the hero image:

```jsx
// Before
src="https://via.placeholder.com/600x400"

// After
src="/images/hero/hero-placeholder-600x400.png"
```

This will eliminate the dependency on external placeholder services and improve your application's reliability.