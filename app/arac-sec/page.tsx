"use client";

import { useEffect, useRef, useState } from "react";

type ColorOption = {
  name: string;
  color: string;
};


type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
  details?: string[];
};

const CART_KEY = "meydan-garage-cart-v1";

function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeCart(items: CartItem[]) {
  window.localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("meydan-cart-updated"));
}

/* =========================
   MARKALAR
========================= */

const brands = [
  "Audi",
  "BMW",
  "Mercedes-Benz",
  "Volkswagen",
  "Fiat",
  "Toyota",
  "Ford",
  "Renault",
  "Peugeot",
  "Opel",
  "Honda",
];

const brandLogos: Record<string, string> = {
  Audi: "/audi.png",
  BMW: "/bmw.png",
  "Mercedes-Benz": "/mercedes-benz.png",
  Volkswagen: "/volkswagen.png",
  Fiat: "/fiat.png",
  Toyota: "/toyota.png",
  Ford: "/ford.png",
  Renault: "/renault.png",
  Peugeot: "/peugeot.png",
  Opel: "/opel.png",
  Honda: "/honda.png",
};

/* =========================
   MODELLER
========================= */

const models: Record<string, string[]> = {
  Honda: ["CR-V", "HR-V", "City", "Jazz", "Civic", "Accord"],
  Audi: ["A3", "A4", "A5", "A6", "Q2", "Q3", "Q5", "Q7"],

  BMW: [
    "1 Serisi",
    "2 Serisi",
    "3 Serisi",
    "4 Serisi",
    "5 Serisi",
    "X1",
    "X3",
    "X5",
  ],

  "Mercedes-Benz": [
    "A Serisi",
    "B Serisi",
    "C Serisi",
    "E Serisi",
    "S Serisi",
    "GLA",
    "GLC",
    "GLE",
  ],

  Volkswagen: [
    "Golf",
    "Polo",
    "Passat",
    "T-Roc",
    "T-Cross",
    "Tiguan",
    "Touareg",
  ],

  Fiat: [
    "Egea Sedan",
    "Egea Cross",
    "500",
    "500X",
    "Doblo",
    "Fiorino",
  ],

  Toyota: [
    "Corolla",
    "Yaris",
    "C-HR",
    "Camry",
    "RAV4",
    "Hilux",
  ],

  Ford: [
    "Fiesta",
    "Focus",
    "Kuga",
    "Puma",
    "Mondeo",
    "Ranger",
    "Tourneo Courier",
  ],

  Renault: [
    "Clio",
    "Megane",
    "Symbol",
    "Captur",
    "Austral",
    "Kadjar",
    "Kangoo",
  ],

  Peugeot: [
    "208",
    "308",
    "408",
    "2008",
    "3008",
    "5008",
    "Partner",
  ],

  Opel: [
    "Corsa",
    "Astra",
    "Mokka",
    "Crossland",
    "Grandland",
    "Combo",
  ],
};

function getModelImage(brand: string, model: string) {
  const hondaModelImages: Record<string, string> = {
    "CR-V": "/cr-v.png",
    "HR-V": "/hr-v.png",
    City: "/cıty.png",
    Jazz: "/jazz.png",
    Civic: "/cıvıc.png",
    Accord: "/accord.png",
  };

  if (brand === "Honda" && hondaModelImages[model]) return hondaModelImages[model];

  const bmwModelImages: Record<string, string> = {
    "1 Serisi": "/1serisi.png",
    "2 Serisi": "/2serisi.png",
    "3 Serisi": "/3serisi.png",
    "4 Serisi": "/4serisi.png",
    "5 Serisi": "/5serisi.png",
    X1: "/x1.png",
    X3: "/x3.png",
    X5: "/x5.png",
  };

  const mercedesModelImages: Record<string, string> = {
    "A Serisi": "/a.png",
    "B Serisi": "/b.png",
    "C Serisi": "/c.png",
    "E Serisi": "/e.png",
    "S Serisi": "/s.png",
    GLA: "/gla.png",
    GLC: "/glc.png",
    GLE: "/gle.png",
  };

  const volkswagenModelImages: Record<string, string> = {
    Golf: "/golf.png",
    Polo: "/polo.png",
    Passat: "/passat.png",
    "T-Roc": "/t-roc.png",
    "T-Cross": "/t-cross.png",
    Tiguan: "/tiguan.png",
    Touareg: "/touareg.png",
  };

  const fiatModelImages: Record<string, string> = {
    "Egea Sedan": "/egea-sedan.png",
    "Egea Cross": "/egea-cross.png",
    "500": "/500.png",
    "500X": "/500x.png",
    Doblo: "/doblo.png",
    Fiorino: "/fiorino.png",
  };

  const toyotaModelImages: Record<string, string> = {
    Corolla: "/corolla.png",
    Yaris: "/yaris.png",
    "C-HR": "/c-hr.png",
    Camry: "/camry.png",
    RAV4: "/rav4.png",
    Hilux: "/hilux.png",
  };

  const fordModelImages: Record<string, string> = {
    Fiesta: "/fiesta.png",
    Focus: "/focus.png",
    Kuga: "/kuga.png",
    Puma: "/puma.png",
    Mondeo: "/mondeo.png",
    Ranger: "/ranger.png",
    "Tourneo Courier": "/tourneo-courier.png",
  };

  const renaultModelImages: Record<string, string> = {
    Clio: "/clio.png",
    Megane: "/megane.png",
    Symbol: "/symbol.png",
    Captur: "/captur.png",
    Austral: "/austral.png",
    Kadjar: "/kadjar.png",
    Kangoo: "/kangoo.png",
  };

  const peugeotModelImages: Record<string, string> = {
    "208": "/208.png",
    "308": "/308.png",
    "408": "/408.png",
    "2008": "/2008.png",
    "3008": "/3008.png",
    "5008": "/5008.png",
    Partner: "/partner.png",
  };

  const opelModelImages: Record<string, string> = {
    Corsa: "/corsa.png",
    Astra: "/astra.png",
    Mokka: "/mokka.png",
    Crossland: "/crossland.png",
    Grandland: "/grandland.png",
    Combo: "/combo.png",
  };

  if (brand === "BMW" && bmwModelImages[model]) return bmwModelImages[model];
  if (brand === "Mercedes-Benz" && mercedesModelImages[model]) return mercedesModelImages[model];
  if (brand === "Volkswagen" && volkswagenModelImages[model]) return volkswagenModelImages[model];
  if (brand === "Fiat" && fiatModelImages[model]) return fiatModelImages[model];
  if (brand === "Toyota" && toyotaModelImages[model]) return toyotaModelImages[model];
  if (brand === "Ford" && fordModelImages[model]) return fordModelImages[model];
  if (brand === "Renault" && renaultModelImages[model]) return renaultModelImages[model];
  if (brand === "Peugeot" && peugeotModelImages[model]) return peugeotModelImages[model];
  if (brand === "Opel" && opelModelImages[model]) return opelModelImages[model];

  const fileName = model
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/\s+/g, "-");

  return `/${fileName}.png`;
}

/* =========================
   EVA RENKLERİ
========================= */

const evaColors: ColorOption[] = [
  { name: "Siyah", color: "#111111" },
  { name: "Füme", color: "#414141" },
  { name: "Gri", color: "#707070" },
  { name: "Turuncu", color: "#d96b22" },
  { name: "Kahverengi", color: "#6b3f27" },
  { name: "Lacivert", color: "#172b4d" },
  { name: "Bej", color: "#b9a58a" },
  { name: "Kırmızı", color: "#991f24" },
];

/* =========================
   BİYE RENKLERİ
========================= */

const borderColors: ColorOption[] = [
  { name: "Siyah 3", color: "#111111" },
  { name: "Kırmızı", color: "#b51f2e" },
  { name: "Füme", color: "#484848" },
  { name: "Lacivert", color: "#172b4d" },
  { name: "Mavi", color: "#245fa8" },

  { name: "Taraftar FB", color: "#183b77" },
  { name: "Taraftar BJK", color: "#111111" },
  { name: "Taraftar GS", color: "#a51e2d" },
  { name: "Taraftar TS", color: "#7d263c" },

  { name: "Krem", color: "#e0d1b5" },
  { name: "Bej", color: "#b8a58b" },
  { name: "Mor", color: "#743d8c" },
  { name: "Yeşil", color: "#4f874d" },
  { name: "Kapalı", color: "#383838" },
  { name: "Beyaz", color: "#eeeeea" },
  { name: "Sax Mavisi", color: "#1769aa" },
  { name: "Taba Rengi", color: "#a96532" },
  { name: "Turuncu Taba", color: "#c86a2d" },
  { name: "Sarı", color: "#e4c51c" },
];

/* =========================
   İPLİK RENKLERİ
   SADECE SEÇİLİR
   GÖRSELDE DEĞİŞMEZ
========================= */

const threadColors: ColorOption[] = [
  { name: "Siyah", color: "#151515" },
  { name: "Füme", color: "#4d4d4d" },
  { name: "Gri", color: "#777777" },
  { name: "Beyaz", color: "#eeeeee" },

  { name: "Krem", color: "#dfcfad" },
  { name: "Bej", color: "#c9aa7d" },
  { name: "Taba", color: "#a96b3c" },

  { name: "Kırmızı", color: "#bd2330" },
  { name: "Bordo", color: "#731f32" },
  { name: "Turuncu", color: "#e86e19" },

  { name: "Somon", color: "#d88770" },
  { name: "Pudra", color: "#d8a8a1" },
  { name: "Pembe", color: "#df4278" },
  { name: "Fuşya", color: "#d41468" },

  { name: "Mor", color: "#713080" },
  { name: "Lila", color: "#ad83c5" },

  { name: "Lacivert", color: "#182d59" },
  { name: "Mavi", color: "#1767ac" },
  { name: "Sax Mavisi", color: "#1579bd" },

  { name: "Sarı", color: "#e7d21c" },

  { name: "Açık Yeşil", color: "#a9c985" },
  { name: "Yeşil", color: "#548b59" },
];

/* =========================
   TOPUKLUK RENKLERİ
   SEÇİLDİĞİNDE ÖNİZLEME
   GÖRSELİNDE DE UYGULANIR
========================= */

const heelColors: ColorOption[] = [
  { name: "Siyah", color: "#171717" },
  { name: "Lacivert", color: "#172b4d" },
  { name: "Bej", color: "#b9a58a" },
  { name: "Taba", color: "#a9683b" },
  { name: "Gri", color: "#6b6b6b" },
  { name: "Kırmızı", color: "#9d1f27" },
];

const BASE_PRICE = 2000;
const LOGO_UNIT_PRICE = 150;
const HEEL_PRICE = 300;
const TRUNK_MAT_PRICE = 1250;

/* =========================
   TOPUKLUK KONUMU
========================= */

/*
  Üstteki sürücü paspasında işaretlediğin alan için ayarlandı.
  X: sağ/sol, Y: yukarı/aşağı, WIDTH: topukluk genişliği.
*/
const HEEL_X_PERCENT = 0.185;
const HEEL_Y_PERCENT = 0.185;
const HEEL_WIDTH_PERCENT = 0.245;


/* =========================
   YARDIMCILAR
========================= */

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");

  return {
    r: parseInt(clean.substring(0, 2), 16),
    g: parseInt(clean.substring(2, 4), 16),
    b: parseInt(clean.substring(4, 6), 16),
  };
}

function getColorName(colors: ColorOption[], selectedColor: string) {
  return colors.find((item) => item.color === selectedColor)?.name || "-";
}

/* =========================
   TOPUKLUK RENKLENDİRME
   SADECE SİYAH / KOYU KAUÇUK
   BÖLÜMLERİ BOYAR.
   METAL KISIM AYNI KALIR.
========================= */

function buildHeelOverlay(
  image: HTMLImageElement,
  targetHex: string
): HTMLCanvasElement {
  const off = document.createElement("canvas");

  off.width = image.naturalWidth;
  off.height = image.naturalHeight;

  const octx = off.getContext("2d", {
    willReadFrequently: true,
  });

  if (!octx) return off;

  octx.clearRect(0, 0, off.width, off.height);
  octx.drawImage(image, 0, 0, off.width, off.height);

  const imageData = octx.getImageData(0, 0, off.width, off.height);
  const data = imageData.data;
  const rgb = hexToRgb(targetHex);

  const targetBrightness = (rgb.r + rgb.g + rgb.b) / 3;

  for (let p = 0; p < data.length; p += 4) {
    const r = data[p];
    const g = data[p + 1];
    const b = data[p + 2];
    const a = data[p + 3];

    if (a < 10) continue;

    const brightness =
      0.2126 * r +
      0.7152 * g +
      0.0722 * b;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const chroma = max - min;

    /*
      Metal yüzey de gri olduğu için yalnızca gerçekten
      koyu kalan kauçuk yuvaları seçiyoruz.
    */
    const isRubber =
      brightness < 68 &&
      chroma < 34;

    if (!isRubber) continue;

    /*
      Siyah seçildiğinde orijinal siyah dokuyu aynen koru.
    */
    if (targetBrightness < 35) {
      continue;
    }

    /*
      Kauçuk dokudaki ışık/gölgeyi koruyup seçilen rengi
      doğal biçimde uygula.
    */
    const texture = Math.max(
      0.52,
      Math.min(0.96, 0.52 + brightness / 150)
    );

    data[p] = Math.min(255, Math.round(rgb.r * texture));
    data[p + 1] = Math.min(255, Math.round(rgb.g * texture));
    data[p + 2] = Math.min(255, Math.round(rgb.b * texture));
  }

  octx.putImageData(imageData, 0, 0);

  return off;
}


/* =========================
   RENK SEÇİCİ
========================= */

function ColorSelector({
  title,
  colors,
  selected,
  onSelect,
}: {
  title: string;
  colors: ColorOption[];
  selected: string;
  onSelect: (color: string) => void;
}) {
  return (
    <div>
      <p className="mb-3 text-sm text-white/60">{title}</p>

      <div className="flex flex-wrap gap-3">
        {colors.map((item) => {
          const active = selected === item.color;

          return (
            <button
              key={item.name}
              type="button"
              onClick={() => onSelect(item.color)}
              className={`flex items-center gap-2 rounded-xl border px-3 py-2 transition ${
                active
                  ? "border-white bg-white/10"
                  : "border-white/10 bg-white/[0.03] hover:border-white/30"
              }`}
            >
              <span
                className="h-6 w-6 rounded-full border border-white/20"
                style={{
                  backgroundColor: item.color,
                }}
              />

              <span className="text-xs text-white/70">{item.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* =========================
   SAYFA
========================= */

export default function VehicleSelector() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const heelImageRef = useRef<HTMLImageElement | null>(null);

  const [brand, setBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [other, setOther] = useState(false);
  const [customBrand, setCustomBrand] = useState("");
  const [customModel, setCustomModel] = useState("");
  const [modelYear, setModelYear] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [designMode, setDesignMode] = useState(false);

  /* TASARIM */

  const [evaColor, setEvaColor] = useState("#111111");
  const [borderColor, setBorderColor] = useState("#111111");
  const [threadColor, setThreadColor] = useState("#151515");
  const [logoEnabled, setLogoEnabled] = useState(false);
  const [logoQuantity, setLogoQuantity] = useState(1);
  const [trunkMatEnabled, setTrunkMatEnabled] = useState(false);
  const [heelEnabled, setHeelEnabled] = useState(false);
  const [heelColor, setHeelColor] = useState("#171717");

  const [cartCount, setCartCount] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  function refreshCartCount() {
    const items = readCart();
    setCartCount(items.reduce((total, item) => total + item.quantity, 0));
  }

  useEffect(() => {
    refreshCartCount();

    const refresh = () => refreshCartCount();

    window.addEventListener("storage", refresh);
    window.addEventListener("meydan-cart-updated", refresh);

    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("meydan-cart-updated", refresh);
    };
  }, []);

  /* =========================
     PASPAS GÖRSELİ
  ========================= */

  useEffect(() => {
    if (!designMode) return;

    const image = new Image();
    image.src = "/paspas.png";

    image.onload = () => {
      imageRef.current = image;

      drawPreview(image, evaColor, borderColor, heelEnabled, heelColor);
    };
  }, [designMode]);

  /* =========================
     TOPUKLUK GÖRSELİ
  ========================= */

  useEffect(() => {
    if (!designMode) return;

    const heelImage = new Image();
    heelImage.src = "/topukluk.png";

    heelImage.onload = () => {
      heelImageRef.current = heelImage;

      if (imageRef.current) {
        drawPreview(
          imageRef.current,
          evaColor,
          borderColor,
          heelEnabled,
          heelColor
        );
      }
    };
  }, [designMode]);

  useEffect(() => {
    if (!designMode) return;

    const image = imageRef.current;
    if (!image) return;

    drawPreview(image, evaColor, borderColor, heelEnabled, heelColor);
  }, [designMode, evaColor, borderColor, heelEnabled, heelColor]);

  function drawPreview(
    image: HTMLImageElement,
    selectedEva: string,
    selectedBorder: string,
    heelOn: boolean,
    selectedHeel: string
  ) {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", {
      willReadFrequently: true,
    });

    if (!ctx) return;

    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const original = new Uint8ClampedArray(imageData.data);
    const data = imageData.data;

    const width = canvas.width;
    const height = canvas.height;
    const pixelCount = width * height;

    const evaRgb = hexToRgb(selectedEva);
    const borderRgb = hexToRgb(selectedBorder);

    /*
      Önce sadece gerçek EVA yüzeyini yakalıyoruz.
      Eski sistem tek tek turuncu/kahverengi pikselleri boyadığı için
      siyah ve lacivertte kırmızı noktalar kalıyordu.

      Burada sıcak renkli EVA dokusundan bir maske çıkarıp maskeyi
      kapatıyoruz. Böylece petek aralarındaki koyu/kırmızı küçük alanlar
      da EVA yüzeyinin parçası kabul ediliyor.
    */

    let evaMask: Uint8Array = new Uint8Array(pixelCount);

    for (let p = 0; p < pixelCount; p++) {
      const i = p * 4;

      const r = original[i];
      const g = original[i + 1];
      const b = original[i + 2];
      const a = original[i + 3];

      if (a < 10) continue;

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const chroma = max - min;
      const brightness = (r + g + b) / 3;

      const warmEva =
        r > 62 &&
        r > g * 1.02 &&
        r > b * 1.12 &&
        chroma > 18 &&
        brightness > 38 &&
        brightness < 225;

      if (warmEva) {
        evaMask[p] = 1;
      }
    }

    function dilate(mask: Uint8Array, iterations: number): Uint8Array {
      let current: Uint8Array = mask;

      for (let iteration = 0; iteration < iterations; iteration++) {
        const next: Uint8Array = new Uint8Array(pixelCount);

        for (let y = 1; y < height - 1; y++) {
          const row = y * width;

          for (let x = 1; x < width - 1; x++) {
            const p = row + x;

            if (
              current[p] ||
              current[p - 1] ||
              current[p + 1] ||
              current[p - width] ||
              current[p + width] ||
              current[p - width - 1] ||
              current[p - width + 1] ||
              current[p + width - 1] ||
              current[p + width + 1]
            ) {
              next[p] = 1;
            }
          }
        }

        current = next;
      }

      return current;
    }

    function erode(mask: Uint8Array, iterations: number): Uint8Array {
      let current: Uint8Array = mask;

      for (let iteration = 0; iteration < iterations; iteration++) {
        const next: Uint8Array = new Uint8Array(pixelCount);

        for (let y = 1; y < height - 1; y++) {
          const row = y * width;

          for (let x = 1; x < width - 1; x++) {
            const p = row + x;

            if (
              current[p] &&
              current[p - 1] &&
              current[p + 1] &&
              current[p - width] &&
              current[p + width] &&
              current[p - width - 1] &&
              current[p - width + 1] &&
              current[p + width - 1] &&
              current[p + width + 1]
            ) {
              next[p] = 1;
            }
          }
        }

        current = next;
      }

      return current;
    }

    const closeAmount = Math.max(2, Math.round(width / 450));
    evaMask = erode(dilate(evaMask, closeAmount), closeAmount);
    evaMask = dilate(evaMask, 1);

    /*
      BİYE MASKESİ
    */

    const borderWidth = Math.max(3, Math.round(width / 180));
    const outerMask = dilate(evaMask, borderWidth);
    const borderMask = new Uint8Array(pixelCount);

    for (let p = 0; p < pixelCount; p++) {
      if (!outerMask[p] || evaMask[p]) continue;

      const i = p * 4;
      const r = original[i];
      const g = original[i + 1];
      const b = original[i + 2];
      const a = original[i + 3];

      if (a < 10) continue;

      const brightness = (r + g + b) / 3;
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const chroma = max - min;

      const looksLikeRealEdge =
        brightness < 155 && !(brightness > 105 && chroma < 16);

      if (looksLikeRealEdge) {
        borderMask[p] = 1;
      }
    }

    /* =========================
       EVA RENKLENDİRME
    ========================= */

    for (let p = 0; p < pixelCount; p++) {
      if (!evaMask[p]) continue;

      const i = p * 4;

      const r = original[i];
      const g = original[i + 1];
      const b = original[i + 2];

      const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

      const texture = Math.max(0.5, Math.min(1.35, luminance / 118));

      const targetR = Math.min(255, evaRgb.r * texture);
      const targetG = Math.min(255, evaRgb.g * texture);
      const targetB = Math.min(255, evaRgb.b * texture);

      data[i] = targetR;
      data[i + 1] = targetG;
      data[i + 2] = targetB;
    }

    /* =========================
       BİYE RENKLENDİRME
    ========================= */

    for (let p = 0; p < pixelCount; p++) {
      if (!borderMask[p]) continue;

      const i = p * 4;

      const r = original[i];
      const g = original[i + 1];
      const b = original[i + 2];

      const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

      const texture = Math.max(0.52, Math.min(1.18, luminance / 72));

      let targetR = Math.min(255, borderRgb.r * texture);
      let targetG = Math.min(255, borderRgb.g * texture);
      let targetB = Math.min(255, borderRgb.b * texture);

      const borderTargetBrightness = (borderRgb.r + borderRgb.g + borderRgb.b) / 3;

      if (borderTargetBrightness > 150) {
        const shadow = Math.max(0.68, Math.min(1, luminance / 95));

        targetR *= shadow;
        targetG *= shadow;
        targetB *= shadow;
      }

      data[i] = Math.min(255, targetR);
      data[i + 1] = Math.min(255, targetG);
      data[i + 2] = Math.min(255, targetB);
    }

    ctx.putImageData(imageData, 0, 0);


    /* =========================
       TOPUKLUK OVERLAY
    ========================= */

    if (heelOn && heelImageRef.current) {
      const heelCanvas = buildHeelOverlay(heelImageRef.current, selectedHeel);

      const heelX = width * HEEL_X_PERCENT;
      const heelY = height * HEEL_Y_PERCENT;
      const heelW = width * HEEL_WIDTH_PERCENT;

      const heelAspect =
        heelImageRef.current.naturalHeight / heelImageRef.current.naturalWidth;

      const heelH = heelW * heelAspect;

      ctx.save();
      ctx.shadowColor = "rgba(0, 0, 0, 0.20)";
      ctx.shadowBlur = Math.max(2, width * 0.003);
      ctx.shadowOffsetY = Math.max(1, height * 0.002);

      ctx.drawImage(heelCanvas, heelX, heelY, heelW, heelH);

      ctx.restore();
    }
  }

  /* =========================
     PASPASI SEPETE EKLE
  ========================= */

  function addMatToCart() {
    const evaName = getColorName(evaColors, evaColor);
    const borderName = getColorName(borderColors, borderColor);
    const threadName = getColorName(threadColors, threadColor);
    const heelName = getColorName(heelColors, heelColor);

    const currentPrice =
      BASE_PRICE +
      (logoEnabled ? logoQuantity * LOGO_UNIT_PRICE : 0) +
      (heelEnabled ? HEEL_PRICE : 0) +
      (trunkMatEnabled ? TRUNK_MAT_PRICE : 0);

    const details = [
      `Araç: ${brand} ${selectedModel}`,
      `Model Yılı: ${modelYear || "Belirtilmedi"}`,
      `Kasa Tipi: ${bodyType || "Belirtilmedi"}`,
      `EVA Rengi: ${evaName}`,
      `Biye Rengi: ${borderName}`,
      `İplik Rengi: ${threadName}`,
      logoEnabled
        ? `Logo: ${brand} · ${logoQuantity} adet · ${(logoQuantity * LOGO_UNIT_PRICE).toLocaleString("tr-TR")} TL`
        : "Logo: Yok",
      trunkMatEnabled
        ? `Bagaj Havuzu: Var · ${TRUNK_MAT_PRICE.toLocaleString("tr-TR")} TL`
        : "Bagaj Havuzu: Yok",
      heelEnabled
        ? `Topukluk: Var · ${heelName} · ${HEEL_PRICE.toLocaleString("tr-TR")} TL`
        : "Topukluk: Yok",
    ];

    const items = readCart();

    items.push({
      id: `eva-paspas-${Date.now()}`,
      name: `EVA Paspas Takımı - ${brand} ${selectedModel}`,
      price: currentPrice,
      quantity: 1,
      image: "/paspas.png",
      category: "EVA PASPAS",
      details,
    });

    writeCart(items);
    refreshCartCount();

    setAddedToCart(true);

    window.setTimeout(() => {
      setAddedToCart(false);
    }, 1500);
  }

  /* =========================
     TASARIM EKRANI
  ========================= */

  const currentMatPrice =
    BASE_PRICE +
    (logoEnabled ? logoQuantity * LOGO_UNIT_PRICE : 0) +
    (heelEnabled ? HEEL_PRICE : 0) +
    (trunkMatEnabled ? TRUNK_MAT_PRICE : 0);

  if (selectedModel && designMode) {
    return (
      <main className="min-h-screen bg-[#171717] px-4 py-8 text-white sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-8 flex items-center justify-between gap-4">
            <button
              onClick={() => setDesignMode(false)}
              className="text-sm text-white/50 transition hover:text-white"
            >
              ← Araç Bilgilerine Dön
            </button>

            <a
              href="/sepet"
              className="rounded-full border border-white/15 px-5 py-2 text-[10px] tracking-[0.16em] text-white/70 transition hover:border-white/35 hover:bg-white hover:text-black"
            >
              SEPET ({cartCount})
            </a>
          </div>

          <p className="text-xs tracking-[0.3em] text-white/35">MEYDAN GARAGE</p>

          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
            Paspasınızı Tasarlayın
          </h1>

          <p className="mt-3 text-white/45">
            {brand} · {selectedModel}
            {modelYear ? ` · ${modelYear}` : ""}
            {bodyType ? ` · ${bodyType}` : ""}
          </p>

          <div className="mt-10 grid gap-8 xl:grid-cols-[1.25fr_0.75fr]">
            {/* ÖNİZLEME */}
            <section className="rounded-[28px] border border-white/10 bg-[#222222] p-5 sm:p-6">
              <p className="text-xs tracking-[0.25em] text-white/30">
                CANLI ÖN İZLEME
              </p>

              <p className="mt-2 text-sm text-white/45">
                EVA, biye ve topukluk seçimlerinizi canlı olarak görün.
              </p>

              <div className="mt-6 flex min-h-[450px] items-center justify-center overflow-hidden rounded-2xl bg-[#c7c9cd] p-4">
                <canvas
                  ref={canvasRef}
                  className="block h-auto max-h-[700px] w-full object-contain"
                />
              </div>

              <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs leading-5 text-white/40">
                  İplik rengi sipariş bilgisi olarak seçilir.
                  Ön izleme görselinde değiştirilmez.
                </p>
              </div>
            </section>

            {/* AYARLAR */}
            <section className="rounded-[28px] border border-white/10 bg-[#202020] p-5 sm:p-7">
              <h2 className="text-xl font-semibold">Tasarım Seçenekleri</h2>

              <div className="mt-8 space-y-8">
                <ColorSelector
                  title="EVA Paspas Rengi"
                  colors={evaColors}
                  selected={evaColor}
                  onSelect={setEvaColor}
                />

                <div className="h-px bg-white/10" />

                <ColorSelector
                  title="Biye Rengi"
                  colors={borderColors}
                  selected={borderColor}
                  onSelect={setBorderColor}
                />

                <div className="h-px bg-white/10" />

                <ColorSelector
                  title="İplik Rengi"
                  colors={threadColors}
                  selected={threadColor}
                  onSelect={setThreadColor}
                />

                <div className="h-px bg-white/10" />

                {/* LOGO */}
                <div>
                  <p className="mb-3 text-sm text-white/60">Logo</p>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setLogoEnabled(false)}
                      className={`rounded-xl border p-4 text-sm font-semibold transition ${
                        !logoEnabled
                          ? "border-white bg-white text-black"
                          : "border-white/10 bg-white/[0.03] text-white/60"
                      }`}
                    >
                      YOK
                    </button>

                    <button
                      type="button"
                      onClick={() => setLogoEnabled(true)}
                      className={`rounded-xl border p-4 text-sm font-semibold transition ${
                        logoEnabled
                          ? "border-white bg-white text-black"
                          : "border-white/10 bg-white/[0.03] text-white/60"
                      }`}
                    >
                      VAR
                    </button>
                  </div>

                  {logoEnabled && (
                    <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-xs text-white/40">Uygulanacak Logo</p>
                      <p className="mt-1 font-medium">{brand} Logosu</p>

                      <label className="mt-4 block text-xs text-white/40">
                        Logo Adedi
                      </label>

                      <input
                        type="number"
                        min={0}
                        max={6}
                        step={1}
                        value={logoQuantity}
                        onChange={(e) =>
                          setLogoQuantity(
                            Math.max(
                              0,
                              Math.min(6, Math.floor(Number(e.target.value) || 0))
                            )
                          )
                        }
                        className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition focus:border-white/30"
                      />
                    </div>
                  )}
                </div>

                <div className="h-px bg-white/10" />

                {/* BAGAJ HAVUZU */}
                <div>
                  <p className="mb-3 text-sm text-white/60">Bagaj Havuzu</p>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setTrunkMatEnabled(false)}
                      className={`rounded-xl border p-4 text-sm font-semibold transition ${
                        !trunkMatEnabled
                          ? "border-white bg-white text-black"
                          : "border-white/10 bg-white/[0.03] text-white/60"
                      }`}
                    >
                      YOK
                    </button>

                    <button
                      type="button"
                      onClick={() => setTrunkMatEnabled(true)}
                      className={`rounded-xl border p-4 text-sm font-semibold transition ${
                        trunkMatEnabled
                          ? "border-white bg-white text-black"
                          : "border-white/10 bg-white/[0.03] text-white/60"
                      }`}
                    >
                      VAR
                    </button>
                  </div>
                </div>

                <div className="h-px bg-white/10" />

                {/* TOPUKLUK */}
                <div>
                  <p className="mb-3 text-sm text-white/60">Topukluk</p>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setHeelEnabled(false)}
                      className={`rounded-xl border p-4 text-sm font-semibold transition ${
                        !heelEnabled
                          ? "border-white bg-white text-black"
                          : "border-white/10 bg-white/[0.03] text-white/60"
                      }`}
                    >
                      YOK
                    </button>

                    <button
                      type="button"
                      onClick={() => setHeelEnabled(true)}
                      className={`rounded-xl border p-4 text-sm font-semibold transition ${
                        heelEnabled
                          ? "border-white bg-white text-black"
                          : "border-white/10 bg-white/[0.03] text-white/60"
                      }`}
                    >
                      VAR
                    </button>
                  </div>
                </div>

                {heelEnabled && (
                  <ColorSelector
                    title="Topukluk Rengi"
                    colors={heelColors}
                    selected={heelColor}
                    onSelect={setHeelColor}
                  />
                )}

                <div className="h-px bg-white/10" />

                {/* ÖZET */}
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-xs tracking-[0.2em] text-white/30">
                    SİPARİŞ ÖZETİ
                  </p>

                  <div className="mt-5 space-y-3 text-sm">
                    <div className="flex justify-between gap-5">
                      <span className="text-white/40">Araç</span>
                      <span className="text-right">
                        {brand} {selectedModel}
                      </span>
                    </div>

                    <div className="flex justify-between gap-5">
                      <span className="text-white/40">Paspas Takımı</span>
                      <span>{BASE_PRICE.toLocaleString("tr-TR")} TL</span>
                    </div>

                    <div className="flex justify-between gap-5">
                      <span className="text-white/40">EVA</span>
                      <span>{getColorName(evaColors, evaColor)}</span>
                    </div>

                    <div className="flex justify-between gap-5">
                      <span className="text-white/40">Biye</span>
                      <span>{getColorName(borderColors, borderColor)}</span>
                    </div>

                    <div className="flex justify-between gap-5">
                      <span className="text-white/40">İplik</span>
                      <span>{getColorName(threadColors, threadColor)}</span>
                    </div>

                    <div className="flex justify-between gap-5">
                      <span className="text-white/40">Logo</span>
                      <span>
                        {logoEnabled
                          ? `${brand} Logo · ${logoQuantity} adet · ${(
                              logoQuantity * LOGO_UNIT_PRICE
                            ).toLocaleString("tr-TR")} TL`
                          : "Yok"}
                      </span>
                    </div>

                    <div className="flex justify-between gap-5">
                      <span className="text-white/40">Bagaj Havuzu</span>
                      <span>
                        {trunkMatEnabled
                          ? `Var · ${TRUNK_MAT_PRICE.toLocaleString("tr-TR")} TL`
                          : "Yok"}
                      </span>
                    </div>

                    <div className="flex justify-between gap-5">
                      <span className="text-white/40">Topukluk</span>
                      <span>
                        {heelEnabled
                          ? `Var · ${HEEL_PRICE.toLocaleString("tr-TR")} TL`
                          : "Yok"}
                      </span>
                    </div>

                    {heelEnabled && (
                      <div className="flex justify-between gap-5">
                        <span className="text-white/40">Topukluk Rengi</span>
                        <span>{getColorName(heelColors, heelColor)}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="flex items-end justify-between gap-5">
                    <span className="text-sm text-white/50">Paspas Toplamı</span>

                    <span className="text-2xl font-semibold">
                      {currentMatPrice.toLocaleString("tr-TR")} TL
                    </span>
                  </div>

                  <div className="mt-4 space-y-2 border-t border-white/10 pt-4 text-xs text-white/40">
                    <div className="flex justify-between gap-4">
                      <span>Düz Paspas Takımı</span>
                      <span>{BASE_PRICE.toLocaleString("tr-TR")} TL</span>
                    </div>

                    {logoEnabled && (
                      <div className="flex justify-between gap-4">
                        <span>Logo · {logoQuantity} adet</span>
                        <span>
                          {(logoQuantity * LOGO_UNIT_PRICE).toLocaleString("tr-TR")} TL
                        </span>
                      </div>
                    )}

                    {heelEnabled && (
                      <div className="flex justify-between gap-4">
                        <span>Topukluk</span>
                        <span>{HEEL_PRICE.toLocaleString("tr-TR")} TL</span>
                      </div>
                    )}
                  </div>

                  {trunkMatEnabled && (
                    <div className="mt-2 flex justify-between gap-4 text-xs text-white/40">
                      <span>Bagaj Havuzu</span>
                      <span>{TRUNK_MAT_PRICE.toLocaleString("tr-TR")} TL</span>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={addMatToCart}
                  className={`w-full rounded-full px-6 py-4 text-sm font-bold text-black transition hover:scale-[1.01] ${
                    addedToCart ? "bg-[#25D366]" : "bg-white"
                  }`}
                >
                  {addedToCart ? "SEPETE EKLENDİ ✓" : "SEPETE EKLE →"}
                </button>

                <a
                  href="/sepet"
                  className="flex w-full justify-center rounded-full border border-white/10 px-6 py-4 text-xs font-semibold tracking-[0.08em] text-white/60 transition hover:border-white/30 hover:text-white"
                >
                  SEPETİ GÖR ({cartCount})
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>
    );
  }

  /* =========================
     DİĞER ARAÇ
  ========================= */

  if (other) {
    return (
      <main className="min-h-screen bg-black px-6 py-16 text-white">
        <div className="mx-auto max-w-5xl">
          <button
            onClick={() => setOther(false)}
            className="mb-10 text-white/50 transition hover:text-white"
          >
            ← Geri
          </button>

          <p className="text-sm tracking-widest text-white/40">MEYDAN GARAGE</p>

          <h1 className="mt-6 text-4xl font-bold sm:text-5xl">
            Aracım Listede Yok
          </h1>

          <p className="mt-4 text-white/50">
            Aracınızın bilgilerini kendiniz yazabilirsiniz.
          </p>

          <div className="mt-10 max-w-xl space-y-4">
            <input
              value={customBrand}
              onChange={(e) => setCustomBrand(e.target.value)}
              placeholder="Marka"
              className="w-full rounded-xl border border-white/10 bg-white/10 p-4 outline-none transition focus:border-white/30"
            />

            <input
              value={customModel}
              onChange={(e) => setCustomModel(e.target.value)}
              placeholder="Model"
              className="w-full rounded-xl border border-white/10 bg-white/10 p-4 outline-none transition focus:border-white/30"
            />

            <input
              value={modelYear}
              onChange={(e) => setModelYear(e.target.value)}
              placeholder="Model yılı"
              className="w-full rounded-xl border border-white/10 bg-white/10 p-4 outline-none transition focus:border-white/30"
            />

            <input
              value={bodyType}
              onChange={(e) => setBodyType(e.target.value)}
              placeholder="Kasa tipi"
              className="w-full rounded-xl border border-white/10 bg-white/10 p-4 outline-none transition focus:border-white/30"
            />

            <button
              onClick={() => {
                if (!customBrand || !customModel) {
                  alert("Lütfen marka ve model bilgilerini girin.");
                  return;
                }

                setBrand(customBrand);
                setSelectedModel(customModel);
                setOther(false);
              }}
              className="w-full rounded-xl bg-white p-4 font-bold text-black transition hover:bg-white/90"
            >
              ARACIMI SEÇ
            </button>
          </div>
        </div>
      </main>
    );
  }

  /* =========================
     ARAÇ DETAYI
  ========================= */

  if (selectedModel) {
    return (
      <main className="min-h-screen bg-black px-6 py-16 text-white">
        <div className="mx-auto max-w-5xl">
          <button
            onClick={() => {
              setSelectedModel("");
              setDesignMode(false);
            }}
            className="mb-10 text-white/50 transition hover:text-white"
          >
            ← Modellere Dön
          </button>

          <p className="text-sm tracking-widest text-white/40">MEYDAN GARAGE</p>

          <h1 className="mt-6 text-4xl font-bold sm:text-5xl">{brand}</h1>

          <p className="mt-3 text-2xl text-white/50">{selectedModel}</p>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
              <p className="text-xs tracking-[0.25em] text-white/30">ARAÇ</p>

              <h2 className="mt-4 text-xl">
                {brand} {selectedModel}
              </h2>

              <p className="mt-2 text-sm text-white/40">Seçtiğiniz araç</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
              <p className="text-xs tracking-[0.25em] text-white/30">
                BAŞLANGIÇ FİYATI
              </p>

              <h2 className="mt-4 text-2xl font-semibold">
                {BASE_PRICE.toLocaleString("tr-TR")} TL
              </h2>

              <p className="mt-2 text-sm text-white/40">
                Logo ve topukluk seçimleri toplam fiyata eklenir.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-3 block text-sm text-white/50">
                Model Yılı
              </label>

              <input
                value={modelYear}
                onChange={(e) => setModelYear(e.target.value)}
                placeholder="Örn. 2024"
                className="w-full rounded-xl border border-white/10 bg-white/5 p-4 outline-none transition focus:border-white/30"
              />
            </div>

            <div>
              <label className="mb-3 block text-sm text-white/50">
                Kasa Tipi
              </label>

              <input
                value={bodyType}
                onChange={(e) => setBodyType(e.target.value)}
                placeholder="Örn. Sedan"
                className="w-full rounded-xl border border-white/10 bg-white/5 p-4 outline-none transition focus:border-white/30"
              />
            </div>
          </div>

          <div className="mt-10">
            <button
              type="button"
              onClick={() => setDesignMode(true)}
              className="inline-flex rounded-full bg-white px-9 py-4 text-sm font-semibold text-black transition hover:scale-105 hover:bg-white/90"
            >
              TASARIMA GEÇ →
            </button>
          </div>
        </div>
      </main>
    );
  }

  /* =========================
     MODEL SEÇİMİ
  ========================= */

  if (brand) {
    const brandModels = models[brand] || [];

    return (
      <main className="min-h-screen bg-black px-6 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <button
            onClick={() => setBrand("")}
            className="mb-10 text-sm text-white/50 transition hover:text-white"
          >
            ← Markalara Dön
          </button>

          <p className="text-sm tracking-widest text-white/40">MEYDAN GARAGE</p>

          <h1 className="mt-6 text-5xl font-bold">{brand}</h1>

          <p className="mt-4 text-white/50">Modelinizi seçin.</p>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {brandModels.map((model) => (
              <button
                key={model}
                type="button"
                onClick={() => setSelectedModel(model)}
                className="group overflow-hidden rounded-2xl border border-white/20 bg-black p-5 text-left transition duration-300 hover:border-white/50 hover:bg-white/[0.02]"
              >
                <div className="flex h-44 items-center justify-center overflow-hidden rounded-xl bg-black">
                  <img
                    src={getModelImage(brand, model)}
                    alt={`${brand} ${model}`}
                    className="h-full w-full object-contain p-2 transition duration-300 group-hover:scale-[1.03]"
                  />
                </div>

                <p className="mt-5 text-[10px] tracking-[0.18em] text-white/35">
                  {brand.toUpperCase()}
                </p>

                <h2 className="mt-1 text-xl font-medium text-white">{model}</h2>
              </button>
            ))}

            <button
              type="button"
              onClick={() => setOther(true)}
              className="group overflow-hidden rounded-2xl border border-dashed border-white/25 bg-black p-5 text-left transition duration-300 hover:border-white/50 hover:bg-white/[0.02]"
            >
              <div className="flex h-44 items-center justify-center overflow-hidden rounded-xl bg-black">
                <img
                  src="/diger.png"
                  alt="Diğer"
                  className="h-full w-full object-contain p-2 transition duration-300 group-hover:scale-[1.03]"
                />
              </div>

              <p className="mt-5 text-[10px] tracking-[0.18em] text-white/35">
                MODEL
              </p>

              <h2 className="mt-1 text-xl font-medium text-white">Diğer</h2>

              <p className="mt-2 text-sm text-white/40">
                Modelim listede yok
              </p>
            </button>
          </div>
        </div>
      </main>
    );
  }

  /* =========================
     MARKA SEÇİMİ
  ========================= */

  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between gap-4">
          <a
            href="/"
            className="text-sm text-white/45 transition hover:text-white"
          >
            ← Ana Sayfa
          </a>

          <a
            href="/sepet"
            className="rounded-full border border-white/15 px-5 py-2 text-[10px] tracking-[0.16em] text-white/70 transition hover:border-white/35 hover:bg-white hover:text-black"
          >
            SEPET ({cartCount})
          </a>
        </div>

        <p className="mt-10 text-sm tracking-widest text-white/40">MEYDAN GARAGE</p>

        <h1 className="mt-6 text-5xl font-bold">Aracınızı Seçin</h1>

        <p className="mt-4 text-white/50">
          Önce aracınızın markasını seçin.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {brands.map((item) => (
            <button
              key={item}
              onClick={() => setBrand(item)}
              className="rounded-2xl border border-white/20 bg-black p-8 transition duration-300 hover:border-white/50 hover:bg-white/[0.03]"
            >
              <div className="mx-auto flex h-28 w-full items-center justify-center bg-black">
                <img
                  src={brandLogos[item]}
                  alt={`${item} logo`}
                  className="h-24 w-full object-contain"
                />
              </div>

              <h2 className="mt-6 text-lg font-medium">{item}</h2>
            </button>
          ))}

          <button
            onClick={() => setOther(true)}
            className="rounded-2xl border border-white/20 bg-black p-8 transition duration-300 hover:border-white/50 hover:bg-white/[0.03]"
          >
            <div className="mx-auto flex h-28 w-full items-center justify-center bg-black">
              <img
                src="/diger.png"
                alt="Diğer"
                className="h-24 w-full object-contain"
              />
            </div>

            <h2 className="mt-6 text-lg font-medium">Diğer</h2>

            <p className="mt-2 text-sm text-white/40">Aracım listede yok</p>
          </button>
        </div>
      </div>
    </main>
  );
}
