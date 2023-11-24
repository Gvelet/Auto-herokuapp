async function checkingImages(page, expect, locatorAllPictures) {
  
  const images = await page.$$(locatorAllPictures);
  const srcImages = await Promise.all(images.map(async img => await img.getAttribute('src')));

  for(let i=0; i < srcImages.length; i++){
      const response = await page.goto(`https://the-internet.herokuapp.com/${srcImages[i]}`);
      
      if (response.status() !== 200) {          
          expect.soft(`Картинка с src: ${srcImages[i]} сломана`).toBeFalsy();
      }
  }
}
  
export{checkingImages};