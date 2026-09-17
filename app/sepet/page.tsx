"use client";

import { useEffect, useMemo, useState } from "react";

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
const WHATSAPP_NUMBER = "905529992307";

const recommendationProducts = [
  {
    id: "sprey-koku",
    name: "Sprey Koku",
    price: 400,
    image: "/sprey-koku.jpeg",
    category: "KOKU",
  },
  {
    id: "silecek",
    name: "Silecek",
    price: 750,
    image: "/silecek.jpeg",
    category: "ARAÇ BAKIM",
  },
  {
    id: "arac-ici-koku",
    name: "Araç İçi Koku Bombası",
    price: 1000,
    image: "/arac-ici-koku.jpeg",
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
  if (typeof window === "undefined") return;

  window.localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("meydan-cart-updated"));
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(readCart());
  }, []);

  const total = useMemo(() => {
    return items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }, [items]);

  const totalQuantity = useMemo(() => {
    return items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
  }, [items]);

  const hasUnpricedTrunk = items.some((item) =>
    item.details?.some((detail) =>
      detail.toLocaleLowerCase("tr-TR").includes("fiyat ayrıca belirlenecek")
    )
  );

  function updateQuantity(id: string, nextQuantity: number) {
    if (nextQuantity < 1) return;

    const nextItems = items.map((item) =>
      item.id === id
        ? { ...item, quantity: nextQuantity }
        : item
    );

    setItems(nextItems);
    writeCart(nextItems);
  }

  function removeItem(id: string) {
    const nextItems = items.filter((item) => item.id !== id);

    setItems(nextItems);
    writeCart(nextItems);
  }

  function addRecommendedProduct(product: (typeof recommendationProducts)[number]) {
    const currentItems = readCart();
    const existing = currentItems.find((item) => item.id === product.id);

    let nextItems: CartItem[];

    if (existing) {
      nextItems = currentItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      nextItems = [
        ...currentItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image,
          category: product.category,
        },
      ];
    }

    setItems(nextItems);
    writeCart(nextItems);
  }

  function clearCart() {
    if (!window.confirm("Sepetteki tüm ürünler silinsin mi?")) {
      return;
    }

    setItems([]);
    writeCart([]);
  }

  function sendOrderToWhatsApp() {
    if (items.length === 0) {
      alert("Sepetiniz boş.");
      return;
    }

    const lines: string[] = [
      "MEYDAN GARAGE - YENİ SİPARİŞ",
      "",
    ];

    items.forEach((item, index) => {
      lines.push(`${index + 1}. ${item.name}`);
      lines.push(`Kategori: ${item.category}`);
      lines.push(`Adet: ${item.quantity}`);
      lines.push(
        `Birim Fiyat: ${item.price.toLocaleString("tr-TR")} TL`
      );

      if (item.quantity > 1) {
        lines.push(
          `Ara Toplam: ${(item.price * item.quantity).toLocaleString(
            "tr-TR"
          )} TL`
        );
      }

      if (item.details?.length) {
        item.details.forEach((detail) => {
          lines.push(`• ${detail}`);
        });
      }

      lines.push("");
    });

    lines.push(
      `TOPLAM: ${total.toLocaleString("tr-TR")} TL`
    );

    if (hasUnpricedTrunk) {
      lines.push("");
      lines.push(
        "Not: Bagaj havuzu seçildi. Bagaj havuzu fiyatı bu toplama dahil değildir."
      );
    }

    lines.push("");
    lines.push(
      "Sipariş bilgilerinizi kontrol edin. Bilgiler doğru mu?"
    );
    lines.push("");
    lines.push(
      "Meydan Garage web sitesi üzerinden gönderildi."
    );

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      lines.join("\n")
    )}`;

    window.open(url, "_blank");
  }

  return (
    <main className="min-h-screen bg-[#090909] px-4 py-8 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">

        {/* ÜST ALAN */}
        <div className="flex flex-col gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <a
              href="/"
              className="text-xs tracking-[0.15em] text-white/40 transition hover:text-white"
            >
              ← ANA SAYFA
            </a>

            <p className="mt-8 text-xs tracking-[0.3em] text-white/30">
              MEYDAN GARAGE
            </p>

            <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">
              Sepetiniz
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/40">
              Ürünlerinizi ve aracınıza özel EVA paspas tasarımınızı
              aynı siparişte birleştirin. Siparişi onayladığınızda
              tüm bilgiler WhatsApp üzerinden Meydan Garage'a gönderilir.
            </p>
          </div>

          {items.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="w-fit text-xs tracking-[0.14em] text-white/35 transition hover:text-white"
            >
              SEPETİ TEMİZLE
            </button>
          )}
        </div>

        {/* BOŞ SEPET */}
        {items.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-2xl font-medium">
              Sepetiniz şu anda boş.
            </p>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/40">
              Ana sayfadaki ürünlerden ekleyebilir veya aracınıza özel
              EVA paspas tasarımınızı oluşturabilirsiniz.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="/#urunler"
                className="rounded-full border border-white/15 px-6 py-3 text-xs font-semibold transition hover:bg-white hover:text-black"
              >
                ÜRÜNLERE GİT
              </a>

              <a
                href="/arac-sec"
                className="rounded-full bg-white px-6 py-3 text-xs font-semibold text-black transition hover:scale-[1.02]"
              >
                PASPAS TASARLA
              </a>
            </div>
          </div>
        ) : (
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">

            {/* ÜRÜNLER */}
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="grid gap-5 rounded-[24px] border border-white/10 bg-white/[0.025] p-4 sm:grid-cols-[150px_1fr]"
                >
                  {/* GÖRSEL */}
                  <div className="flex h-36 items-center justify-center overflow-hidden rounded-2xl bg-[#171717]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-contain p-3"
                    />
                  </div>

                  {/* BİLGİ */}
                  <div className="flex min-w-0 flex-col">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-[9px] tracking-[0.22em] text-white/30">
                          {item.category}
                        </p>

                        <h2 className="mt-2 text-lg font-medium">
                          {item.name}
                        </h2>

                        {item.details?.length ? (
                          <div className="mt-4 space-y-1.5">
                            {item.details.map((detail, index) => (
                              <p
                                key={`${item.id}-${index}`}
                                className="text-xs leading-5 text-white/40"
                              >
                                {detail}
                              </p>
                            ))}
                          </div>
                        ) : null}
                      </div>

                      <div className="shrink-0 sm:text-right">
                        <p className="text-lg font-semibold">
                          {item.price.toLocaleString("tr-TR")} TL
                        </p>

                        {item.quantity > 1 && (
                          <p className="mt-1 text-xs text-white/35">
                            Toplam{" "}
                            {(item.price * item.quantity).toLocaleString(
                              "tr-TR"
                            )}{" "}
                            TL
                          </p>
                        )}
                      </div>
                    </div>

                    {/* ADET / SİL */}
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-6">
                      <div className="flex items-center overflow-hidden rounded-full border border-white/10">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.quantity - 1
                            )
                          }
                          disabled={item.quantity <= 1}
                          className="h-10 w-11 text-white/60 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-25"
                        >
                          −
                        </button>

                        <span className="min-w-11 text-center text-sm">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.quantity + 1
                            )
                          }
                          className="h-10 w-11 text-white/60 transition hover:bg-white/10"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-xs tracking-[0.12em] text-white/35 transition hover:text-red-300"
                      >
                        ÜRÜNÜ KALDIR
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* İLGİNİZİ ÇEKEBİLECEK ÜRÜNLER */}
              <section className="pt-8">
                <div className="mb-5">
                  <p className="text-[10px] tracking-[0.25em] text-white/30">
                    MEYDAN GARAGE
                  </p>

                  <h2 className="mt-2 text-2xl font-semibold">
                    İlginizi Çekebilecek Ürünler
                  </h2>

                  <p className="mt-2 text-sm text-white/40">
                    Siparişinize tek tıkla ekleyebilirsiniz.
                  </p>
                </div>

                <div
                  className="flex gap-4 overflow-x-auto pb-3 pr-2 snap-x snap-mandatory"
                  style={{
                    scrollbarWidth: "thin",
                  }}
                >
                  {recommendationProducts
                    .filter(
                      (product) =>
                        !items.some((item) => item.id === product.id)
                    )
                    .map((product) => (
                      <div
                        key={product.id}
                        className="group min-w-[78%] snap-start overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.025] sm:min-w-[46%] lg:min-w-[calc(25%-12px)]"
                      >
                        <div className="h-40 overflow-hidden bg-[#151515]">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        </div>

                        <div className="p-4">
                          <p className="text-[9px] tracking-[0.18em] text-white/30">
                            {product.category}
                          </p>

                          <h3 className="mt-2 min-h-[44px] text-sm font-medium leading-5">
                            {product.name}
                          </h3>

                          <div className="mt-4 flex items-center justify-between gap-3">
                            <span className="text-sm font-semibold">
                              {product.price.toLocaleString("tr-TR")} TL
                            </span>

                            <button
                              type="button"
                              onClick={() => addRecommendedProduct(product)}
                              className="rounded-full bg-white px-3 py-2 text-[9px] font-bold tracking-[0.08em] text-black transition hover:scale-[1.03]"
                            >
                              EKLE +
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </section>

              <div className="flex flex-wrap gap-3 pt-4">
                <a
                  href="/#urunler"
                  className="rounded-full border border-white/10 px-5 py-3 text-xs font-medium text-white/55 transition hover:border-white/30 hover:text-white"
                >
                  + TÜM ÜRÜNLERİ GÖR
                </a>

                <a
                  href="/arac-sec"
                  className="rounded-full border border-white/10 px-5 py-3 text-xs font-medium text-white/55 transition hover:border-white/30 hover:text-white"
                >
                  + PASPAS TASARLA
                </a>
              </div>
            </div>

            {/* SİPARİŞ ÖZETİ */}
            <aside className="h-fit rounded-[28px] border border-white/10 bg-[#151515] p-6 lg:sticky lg:top-6">
              <p className="text-xs tracking-[0.22em] text-white/30">
                SİPARİŞ ÖZETİ
              </p>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between gap-5">
                  <span className="text-white/40">
                    Toplam Ürün
                  </span>
                  <span>{totalQuantity}</span>
                </div>

                <div className="h-px bg-white/10" />

                <div className="flex items-end justify-between gap-5">
                  <span className="text-white/50">
                    Genel Toplam
                  </span>

                  <span className="text-2xl font-semibold">
                    {total.toLocaleString("tr-TR")} TL
                  </span>
                </div>
              </div>

              {hasUnpricedTrunk && (
                <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs leading-5 text-white/40">
                    Bagaj havuzu seçilmiş bir paspas siparişi var.
                    Bagaj havuzu fiyatı henüz toplam tutara dahil değildir.
                  </p>
                </div>
              )}

              <button
                type="button"
                onClick={sendOrderToWhatsApp}
                className="mt-6 w-full rounded-full bg-[#25D366] px-6 py-4 text-sm font-bold text-black transition hover:scale-[1.01]"
              >
                SEPETİ ONAYLA & WHATSAPP →
              </button>

              <p className="mt-4 text-center text-[10px] leading-4 text-white/25">
                Butona bastığınızda sepetteki tüm ürünler ve paspas
                detayları WhatsApp mesajına otomatik eklenir.
              </p>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
