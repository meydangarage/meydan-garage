"use client";

import { useEffect, useState } from "react";


type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
};

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

const CART_KEY = "meydan-garage-cart-v1";

const products: Product[] = [
  {
    id: "arac-ici-koku",
    name: "Araç İçi Koku Bombası",
    price: 1000,
    image: "/arac-ici-koku.jpeg",
    category: "KOKU",
  },
  {
    id: "sprey-koku",
    name: "Sprey Koku",
    price: 400,
    image: "/sprey-koku.jpeg",
    category: "KOKU",
  },
  {
    id: "motor-temizleyici-sprey",
    name: "Motor Temizleyici Sprey",
    price: 700,
    image: "/motor-temizleyici-sprey.jpeg",
    category: "BAKIM",
  },
  {
    id: "cam-suyu-sabunu",
    name: "Cam Suyu Sabunu",
    price: 100,
    image: "/cam-suyu-sabunu.jpeg",
    category: "TEMİZLİK",
  },
  {
    id: "canta-50",
    name: "50 cm Bagaj Çantası",
    price: 2250,
    image: "/canta-50.jpeg",
    category: "BAGAJ & DÜZEN",
  },
  {
    id: "canta-70",
    name: "70 cm Bagaj Çantası",
    price: 2750,
    image: "/canta-70.jpeg",
    category: "BAGAJ & DÜZEN",
  },
  {
    id: "canta-90",
    name: "90 cm Bagaj Çantası",
    price: 3250,
    image: "/canta-90.jpeg",
    category: "BAGAJ & DÜZEN",
  },
  {
    id: "silecek",
    name: "Silecek",
    price: 750,
    image: "/silecek.jpeg",
    category: "ARAÇ BAKIM",
  },
];

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

export default function Home() {
  const [cartCount, setCartCount] = useState(0);
  const [addedProductId, setAddedProductId] = useState("");

  function refreshCartCount() {
    const items = readCart();
    const count = items.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
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

  function addToCart(product: Product) {
    const items = readCart();
    const existing = items.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
        category: product.category,
      });
    }

    writeCart(items);
    refreshCartCount();

    setAddedProductId(product.id);

    window.setTimeout(() => {
      setAddedProductId("");
    }, 1200);
  }

  return (
    <main className="min-h-screen bg-black text-white">

      {/* =========================
          HEADER
      ========================= */}
      <header className="absolute left-0 right-0 top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">

          {/* MEYDAN GARAGE LOGO */}
          <div className="flex items-center gap-3">
            <img
              src="/mg-logo.png"
              alt="Meydan Garage"
              className="h-16 w-auto object-contain"
            />

            <div className="flex flex-col leading-none">
              <span className="block text-sm font-semibold tracking-[0.2em] text-white">
                MEYDAN
              </span>

              <span className="mt-1 block text-[10px] tracking-[0.32em] text-white/50">
                GARAGE
              </span>
            </div>
          </div>

          {/* MENÜ */}
          <nav className="hidden items-center gap-7 md:flex">
            <a
              href="#ozellikler"
              className="text-[11px] tracking-[0.18em] text-white/50 transition hover:text-white"
            >
              ÖZELLİKLER
            </a>

            <a
              href="#urunler"
              className="text-[11px] tracking-[0.18em] text-white/50 transition hover:text-white"
            >
              ÜRÜNLER
            </a>

            <a
              href="/arac-sec"
              className="text-[11px] tracking-[0.18em] text-white/50 transition hover:text-white"
            >
              SİPARİŞ VER
            </a>

            <a
              href="#iletisim"
              className="text-[11px] tracking-[0.18em] text-white/50 transition hover:text-white"
            >
              İLETİŞİM
            </a>

            <a
              href="/sepet"
              className="rounded-full border border-white/15 px-4 py-2 text-[10px] tracking-[0.16em] text-white/70 transition hover:border-white/35 hover:bg-white hover:text-black"
            >
              SEPET ({cartCount})
            </a>
          </nav>

          <div className="hidden text-xs tracking-[0.3em] text-white/40 md:block">
            PREMIUM EVA FLOOR MATS
          </div>

        </div>
      </header>

      {/* =========================
          HERO
      ========================= */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_45%)]" />

        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />

        <div className="relative z-10 mx-auto max-w-5xl px-6 pt-24 text-center">
          <p className="mb-6 text-xs font-medium tracking-[0.45em] text-white/40">
            MEYDAN GARAGE
          </p>

          <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            Aracınıza Özel
            <br />
            <span className="text-white/50">
              Kusursuz Uyum
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-sm leading-7 text-white/50 sm:text-base">
            Aracınız için özel olarak tasarlanan premium EVA paspaslar.
            Kusursuz uyum, kaliteli işçilik ve tamamen size özel
            renk seçenekleri.
          </p>

          <a
            href="/arac-sec"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-white px-9 py-4 text-sm font-semibold text-black transition duration-300 hover:scale-105 hover:bg-white/90"
          >
            ARAÇINIZI SEÇİN
            <span className="text-lg">→</span>
          </a>

          <p className="mt-5 text-[10px] tracking-[0.2em] text-white/25">
            MARKA VE MODELİNİZİ SEÇEREK BAŞLAYIN
          </p>
        </div>

        <div className="absolute bottom-8 left-1/2 h-12 w-px -translate-x-1/2 bg-gradient-to-b from-white/30 to-transparent" />
      </section>

      {/* =========================
          DİĞER ÜRÜNLERİMİZ
      ========================= */}
      <section
        id="urunler"
        className="scroll-mt-24 border-t border-white/10 bg-[#050505]"
      >
        <div className="mx-auto max-w-7xl px-6 py-24">

          {/* BAŞLIK */}
          <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs tracking-[0.35em] text-white/30">
                MEYDAN GARAGE
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
                Diğer Ürünlerimiz
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/40">
                Aracınız için bagaj düzeninden temizlik ve bakım ürünlerine kadar
                günlük kullanımınızı tamamlayan seçili ürünleri keşfedin.
              </p>
            </div>

            <a
              href="/sepet"
              className="inline-flex w-fit items-center gap-3 rounded-full border border-white/15 px-6 py-3 text-xs font-medium tracking-[0.14em] text-white/70 transition hover:border-white/35 hover:bg-white hover:text-black"
            >
              SEPETİ GÖR ({cartCount})
              <span>→</span>
            </a>
          </div>

          {/* ÜST VİTRİN */}
          <div className="grid gap-5 lg:grid-cols-12">

            {/* BAGAJ ÇANTALARI - BÜYÜK KART */}
            <div className="group relative min-h-[520px] overflow-hidden rounded-[30px] border border-white/10 bg-[#111111] lg:col-span-7">
              <img
                src="/canta-90.jpeg"
                alt="Meydan Garage bagaj çantaları"
                className="absolute inset-0 h-full w-full object-cover opacity-75 transition duration-700 group-hover:scale-[1.035] group-hover:opacity-90"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/5" />

              <div className="absolute left-0 top-0 p-7">
                <span className="rounded-full border border-white/15 bg-black/30 px-4 py-2 text-[10px] tracking-[0.25em] text-white/65 backdrop-blur-sm">
                  BAGAJ & DÜZEN
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                <p className="text-[10px] tracking-[0.28em] text-white/45">
                  50 • 70 • 90 CM
                </p>

                <h3 className="mt-3 text-3xl font-semibold sm:text-4xl">
                  Bagaj Çantaları
                </h3>

                <p className="mt-3 max-w-lg text-sm leading-6 text-white/55">
                  Farklı boy seçenekleriyle bagajınızı daha düzenli ve kullanışlı hale getirin.
                </p>

                <p className="mt-4 text-sm font-medium text-white/80">
                  50 cm: 2.250 TL · 70 cm: 2.750 TL · 90 cm: 3.250 TL
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {["50 CM", "70 CM", "90 CM"].map((size) => (
                    <span
                      key={size}
                      className="rounded-full border border-white/15 bg-black/25 px-4 py-2 text-[10px] tracking-[0.18em] text-white/65 backdrop-blur-sm"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* SAĞ VİTRİN */}
            <div className="grid gap-5 sm:grid-cols-2 lg:col-span-5">

              <ProductCard
                product={products[0]}
                added={addedProductId === products[0].id}
                onAdd={addToCart}
              />

              <ProductCard
                product={products[1]}
                added={addedProductId === products[1].id}
                onAdd={addToCart}
              />

              <ProductCard
                product={products[2]}
                added={addedProductId === products[2].id}
                onAdd={addToCart}
              />

              <ProductCard
                product={products[3]}
                added={addedProductId === products[3].id}
                onAdd={addToCart}
              />

            </div>
          </div>

          {/* ALT ÜRÜNLER */}
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            <ProductCard
              product={products[4]}
              added={addedProductId === products[4].id}
              onAdd={addToCart}
              compact
            />

            <ProductCard
              product={products[5]}
              added={addedProductId === products[5].id}
              onAdd={addToCart}
              compact
            />

            <ProductCard
              product={products[6]}
              added={addedProductId === products[6].id}
              onAdd={addToCart}
              compact
            />

            <ProductCard
              product={products[7]}
              added={addedProductId === products[7].id}
              onAdd={addToCart}
              compact
            />

          </div>

        </div>
      </section>

      {/* =========================
          ÖZELLİKLER
      ========================= */}
      <section
        id="meydan-detay"
        className="border-t border-white/10 bg-white/[0.02]"
      >
        <div className="mx-auto max-w-6xl px-6 py-24">

          <div className="mb-14 text-center">
            <p className="text-xs tracking-[0.35em] text-white/30">
              MEYDAN GARAGE
            </p>

            <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
              Sadece Paspas Değil.
              <br />
              <span className="text-white/40">
                Aracınıza Özel Bir Detay.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/40">
              Aracınıza özel ölçüler, kişiselleştirilebilir renk seçenekleri
              ve özenli üretim anlayışıyla her detayı size özel hale getirin.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">

            <div className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] transition duration-500 hover:border-white/25 hover:bg-white/[0.04]">
              <div className="relative h-64 overflow-hidden">
                <img
                  src="/paspas.1.png"
                  alt="Aracınıza özel EVA paspas"
                  className="h-full w-full object-cover opacity-75 transition duration-700 group-hover:scale-105 group-hover:opacity-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />
                <span className="absolute left-6 top-6 text-xs tracking-[0.3em] text-white/60">
                  01
                </span>
              </div>

              <div className="p-7">
                <p className="text-[10px] tracking-[0.25em] text-white/25">
                  KUSURSUZ UYUM
                </p>
                <h3 className="mt-3 text-xl font-medium">
                  Aracınıza Özel
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/40">
                  Her araç marka ve modeline özel ölçüler ile kusursuz uyum.
                </p>
              </div>
            </div>

            <div className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] transition duration-500 hover:border-white/25 hover:bg-white/[0.04]">
              <div className="relative h-64 overflow-hidden">
                <img
                  src="/paspas.2.png"
                  alt="Kişiselleştirilebilir EVA paspas"
                  className="h-full w-full object-cover opacity-75 transition duration-700 group-hover:scale-105 group-hover:opacity-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />
                <span className="absolute left-6 top-6 text-xs tracking-[0.3em] text-white/60">
                  02
                </span>
              </div>

              <div className="p-7">
                <p className="text-[10px] tracking-[0.25em] text-white/25">
                  SENİN TASARIMIN
                </p>
                <h3 className="mt-3 text-xl font-medium">
                  Tamamen Kişisel
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/40">
                  EVA, biye, iplik ve topukluk renklerini kendiniz seçin.
                </p>
              </div>
            </div>

            <div className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] transition duration-500 hover:border-white/25 hover:bg-white/[0.04]">
              <div className="relative h-64 overflow-hidden">
                <img
                  src="/paspas.3.png"
                  alt="Premium EVA paspas işçiliği"
                  className="h-full w-full object-cover opacity-75 transition duration-700 group-hover:scale-105 group-hover:opacity-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />
                <span className="absolute left-6 top-6 text-xs tracking-[0.3em] text-white/60">
                  03
                </span>
              </div>

              <div className="p-7">
                <p className="text-[10px] tracking-[0.25em] text-white/25">
                  ÖZENLİ ÜRETİM
                </p>
                <h3 className="mt-3 text-xl font-medium">
                  Premium İşçilik
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/40">
                  Detaylara önem veren kaliteli ve özenli üretim anlayışı.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================
          EVA PASPAS ÖZELLİKLERİ
      ========================= */}
      <section
        id="ozellikler"
        className="scroll-mt-24 border-t border-white/10"
      >
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-16 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-xs tracking-[0.35em] text-white/30">
                PREMIUM EVA PASPAS
              </p>

              <h2 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">
                Günlük kullanım için
                <br />
                <span className="text-white/40">
                  akıllı petek yapı.
                </span>
              </h2>

              <p className="mt-6 max-w-lg text-sm leading-7 text-white/45">
                EVA paspasın petekli yüzeyi su, çamur, kum ve kiri
                hücrelerinde tutarak aracınızın tabanına yayılmasını azaltır.
                Aracınıza özel ölçülerle hazırlanır ve günlük kullanımda
                kolay temizlik sağlar.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                  <p className="text-sm font-medium text-white">
                    Su ve kiri hapseder
                  </p>
                  <p className="mt-2 text-xs leading-5 text-white/35">
                    Petekli yüzey sıvı ve kirin paspas üzerinde yayılmasını
                    azaltır.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                  <p className="text-sm font-medium text-white">
                    Aracınıza özel kesim
                  </p>
                  <p className="mt-2 text-xs leading-5 text-white/35">
                    Marka ve modele uygun ölçülerle hazırlanır.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                  <p className="text-sm font-medium text-white">
                    Kolay temizlik
                  </p>
                  <p className="mt-2 text-xs leading-5 text-white/35">
                    Çıkarın, silkeleyin veya suyla temizleyin.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                  <p className="text-sm font-medium text-white">
                    Size özel tasarım
                  </p>
                  <p className="mt-2 text-xs leading-5 text-white/35">
                    EVA, biye ve iplik renklerini kendi zevkinize göre
                    belirleyin.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative flex min-h-[430px] items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_58%)]" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/25 to-black/60" />

              <img
                src="/paspas2.png"
                alt="Meydan Garage EVA Paspas"
                className="relative z-10 h-full max-h-[430px] w-full object-contain p-8 opacity-60 grayscale-[5%]"
              />

              <div className="pointer-events-none absolute inset-0 bg-black/20" />
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          CTA
      ========================= */}
      <section className="border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <p className="text-xs tracking-[0.35em] text-white/30">
            HAZIR MISIN?
          </p>

          <h2 className="mt-5 text-4xl font-semibold sm:text-5xl">
            Aracınız için
            <br />
            <span className="text-white/40">
              kendi tasarımınızı oluşturun.
            </span>
          </h2>

          <a
            href="/arac-sec"
            className="mt-9 inline-flex rounded-full bg-white px-9 py-4 text-sm font-semibold text-black transition hover:scale-105 hover:bg-white/90"
          >
            ARACIMI SEÇ →
          </a>
        </div>
      </section>

      {/* =========================
          İLETİŞİM
      ========================= */}
      <section
        id="iletisim"
        className="border-t border-white/10 bg-white/[0.02]"
      >
        <div className="mx-auto max-w-6xl px-6 py-24">

          <div className="mb-14 text-center">
            <p className="text-xs tracking-[0.35em] text-white/30">
              İLETİŞİM
            </p>

            <h2 className="mt-5 text-4xl font-semibold sm:text-5xl">
              Bize Ulaşın
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/40">
              Aracınız, paspas tasarımınız veya siparişiniz hakkında
              Meydan Garage ile iletişime geçebilirsiniz.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {/* INSTAGRAM */}
            <a
              href="https://instagram.com/meydangarage07"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-white/10 bg-white/[0.02] p-7 transition hover:border-white/25 hover:bg-white/[0.05]"
            >
              <span className="text-xs tracking-[0.25em] text-white/30">
                SOSYAL MEDYA
              </span>

              <h3 className="mt-5 text-lg font-medium">
                Instagram
              </h3>

              <p className="mt-2 text-sm text-white/40">
                @meydangarage07
              </p>

              <span className="mt-6 inline-block text-sm text-white/60 transition group-hover:translate-x-1">
                Instagram'a Git →
              </span>
            </a>

            {/* TELEFON */}
            <a
              href="tel:+905529992307"
              className="group rounded-2xl border border-white/10 bg-white/[0.02] p-7 transition hover:border-white/25 hover:bg-white/[0.05]"
            >
              <span className="text-xs tracking-[0.25em] text-white/30">
                TELEFON
              </span>

              <h3 className="mt-5 text-lg font-medium">
                +90 552 999 23 07
              </h3>

              <p className="mt-2 text-sm text-white/40">
                Bizi arayabilirsiniz
              </p>

              <span className="mt-6 inline-block text-sm text-white/60 transition group-hover:translate-x-1">
                Ara →
              </span>
            </a>

            {/* E-POSTA */}
            <a
              href="mailto:meydangarage@gmail.com"
              className="group rounded-2xl border border-white/10 bg-white/[0.02] p-7 transition hover:border-white/25 hover:bg-white/[0.05]"
            >
              <span className="text-xs tracking-[0.25em] text-white/30">
                E-POSTA
              </span>

              <h3 className="mt-5 text-lg font-medium">
                E-posta
              </h3>

              <p className="mt-2 break-all text-sm text-white/40">
                meydangarage@gmail.com
              </p>

              <span className="mt-6 inline-block text-sm text-white/60 transition group-hover:translate-x-1">
                E-posta Gönder →
              </span>
            </a>

            {/* ADRES */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-7">
              <span className="text-xs tracking-[0.25em] text-white/30">
                ADRES
              </span>

              <h3 className="mt-5 text-lg font-medium">
                Meydan Garage
              </h3>

              <p className="mt-2 text-sm leading-6 text-white/40">
                Altıntaş Mahallesi
                <br />
                Kardeşkentler Caddesi No: 12F/1
                <br />
                Aksu / Antalya
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =========================
          FOOTER
      ========================= */}
      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-12 sm:flex-row sm:items-end sm:justify-between">

          {/* MEYDAN GARAGE */}
          <div>
            <img
              src="/mg-logo.png"
              alt="Meydan Garage"
              className="h-12 w-auto object-contain opacity-80"
            />

            <p className="mt-3 text-xs text-white/30">
              Premium araç paspasları
            </p>

            <p className="mt-1 text-[10px] text-white/20">
              © {new Date().getFullYear()} Meydan Garage
            </p>
          </div>

          {/* =========================
              NEXOMI
          ========================= */}
          <div className="flex flex-col items-end">
            <p className="text-[10px] italic tracking-[0.15em] text-white/50">
              Designed &amp; developed by
            </p>

            <img
              src="/nexomi-logo.png"
              alt="NEXOMI"
              className="mt-3 h-14 w-auto max-w-[180px] object-contain opacity-90"
            />
          </div>

        </div>
      </footer>

    </main>
  );
}

/* =========================
   FEATURE CARD
========================= */

function FeatureCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/[0.02] p-7 transition hover:border-white/20 hover:bg-white/[0.04]">

      <div className="flex items-center justify-between">
        <span className="text-xs tracking-[0.25em] text-white/25">
          {number}
        </span>

        <span className="text-white/20 transition group-hover:translate-x-1 group-hover:text-white/50">
          →
        </span>
      </div>

      <h3 className="mt-8 text-xl font-medium">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-white/40">
        {description}
      </p>

    </div>
  );
}

/* =========================
   PRODUCT CARD
========================= */

function ProductCard({
  product,
  added,
  onAdd,
  compact = false,
}: {
  product: Product;
  added: boolean;
  onAdd: (product: Product) => void;
  compact?: boolean;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-[26px] border border-white/10 bg-[#111111] ${
        compact ? "min-h-[360px]" : "min-h-[270px]"
      }`}
    >
      <img
        src={product.image}
        alt={product.name}
        className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-700 group-hover:scale-[1.05] group-hover:opacity-90"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="text-[9px] tracking-[0.25em] text-white/45">
          {product.category}
        </p>

        <h3
          className={`${compact ? "text-lg" : "text-xl"} mt-2 font-medium leading-tight`}
        >
          {product.name}
        </h3>

        <div className="mt-4 flex items-center justify-between gap-4">
          <span className="text-lg font-semibold">
            {product.price.toLocaleString("tr-TR")} TL
          </span>

          <button
            type="button"
            onClick={() => onAdd(product)}
            className={`rounded-full px-4 py-2 text-[10px] font-semibold tracking-[0.1em] transition ${
              added
                ? "bg-[#25D366] text-black"
                : "bg-white text-black hover:scale-[1.03] hover:bg-white/90"
            }`}
          >
            {added ? "EKLENDİ ✓" : "SEPETE EKLE"}
          </button>
        </div>
      </div>
    </div>
  );
}

