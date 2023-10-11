function oxirigaQosh(soz) { // funksya chaqirib olamiz
    if (soz.length > 1) {     // kiritilgan sozni uzunligini tekshiradi
      soz.push(soz.shift());  // vau sozni oxiriga push qilib boshidan ochirib tashlaydi
    }
    return soz;         //va return qilib qaytaradi
  }
  
 
  const kirit = ['a', 'b', 'v'];
  const massiv = oxirigaQosh(kirit);
  console.log(massiv);  
  