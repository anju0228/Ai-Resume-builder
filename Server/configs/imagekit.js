import ImageKit from '@imagekit/nodejs';

let imageKit = null;

if (process.env['IMAGEKIT_PRIVATE_KEY']) {
  imageKit = new ImageKit({
    privateKey: process.env['IMAGEKIT_PRIVATE_KEY'],
  });
} else {
  console.warn('⚠️  IMAGEKIT_PRIVATE_KEY not set - image uploads will not work');
}

export default imageKit;