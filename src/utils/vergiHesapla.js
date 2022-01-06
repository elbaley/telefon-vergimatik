// this functions returns an array that is going to be our state
const vergiHesapla = (fiyat, kayit, eurrate) => {
  if (kayit === "pasaport") {
    let vergisizfiyat = fiyat;
    let pasaportvergicikler = [
      { id: 0, name: "TRT Bandrol (€20)", miktar: eurrate * 20, oran: 0 },
      { id: 1, name: "IMEI Kayıt Bedeli", miktar: 2006.2, oran: 0 },
      { id: 2, name: "Toplam Vergi", oran: 0, miktar: 0 },
    ];
    let toplamvergi =
      pasaportvergicikler[0].miktar + pasaportvergicikler[1].miktar;
    fiyat += toplamvergi;
    const toplamvergiorani = (toplamvergi / vergisizfiyat) * 100;
    pasaportvergicikler[pasaportvergicikler.length - 1].miktar = toplamvergi;
    pasaportvergicikler[pasaportvergicikler.length - 1].oran = toplamvergiorani;

    return pasaportvergicikler;
  }
  let vergicikler = [
    { id: 0, name: "Kültür Bakanlığı", oran: 1, miktar: 0 },
    { id: 1, name: "TRT Bandrol", oran: 10, miktar: 0 },
    { id: 2, name: "ÖTV", oran: 50, miktar: 0 },
    { id: 3, name: "KDV", oran: 18, miktar: 0 },
    { id: 4, name: "Toplam Vergi", oran: 0, miktar: 0 },
  ];

  let vergisizfiyat = fiyat;
  let vergioranlari = [];
  vergicikler.forEach((vergi) => vergioranlari.push(vergi.oran));
  // set OTV tax
  if (fiyat <= 640) {
    vergioranlari[2] = 25;
  }
  if (fiyat <= 1500 && fiyat > 640) {
    vergioranlari[2] = 40;
  }
  //define vergi
  let toplamvergi = 0;
  // add individual taxes
  for (let i = 0; i < vergioranlari.length - 1; i++) {
    const mevcutvergimiktari = (fiyat * vergioranlari[i]) / 100;
    toplamvergi += mevcutvergimiktari;
    vergicikler[i].miktar = mevcutvergimiktari;
    vergicikler[i].oran = vergioranlari[i];
    fiyat += mevcutvergimiktari;
    console.log(vergicikler);
  }
  const toplamvergiorani = (toplamvergi / vergisizfiyat) * 100;
  console.log("Toplam vergi kismindayim :)");

  vergicikler[vergicikler.length - 1].oran = toplamvergiorani;
  vergicikler[vergicikler.length - 1].miktar = toplamvergi;

  return vergicikler;
};
export default vergiHesapla;
