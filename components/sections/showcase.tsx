import Image from "next/image";
import {
  ChartLine,
  LayoutDashboard,
  PackageSearch,
  Plus,
  ReceiptText,
  Search,
  Settings,
  Store,
  Users,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

import { GhostNumeral } from "@/components/ghost-numeral";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
   Miniature replicas of the real Reluxio app, populated with a demo luxury
   catalog (photos in /public/product_images). UI chrome stays monochrome to
   match the landing palette; product photos are natural. All mock UIs are
   decorative (aria-hidden) — the sr-only figcaption carries the meaning.
--------------------------------------------------------------------------- */

const img = (n: number) => `/product_images/product_${n}.jpg`;

const STOREFRONT_PRODUCTS = [
  { name: "LV MyLockMe BB", price: "68.500.000₫", photo: img(4) },
  { name: "Versace La Medusa", price: "45.900.000₫", photo: img(17) },
  { name: "YSL Cassandre WOC", price: "28.500.000₫", photo: img(2) },
  { name: "MCM Patricia", price: "12.800.000₫", photo: img(9) },
  { name: "Chanel CH5515", price: "9.200.000₫", photo: img(15) },
  { name: "Gucci GG Bucket Hat", price: "6.400.000₫", photo: img(11) },
];

const ORDERS = [
  { name: "YSL Cassandre WOC", carrier: "GHN", price: "28.500.000₫", status: "In transit", photo: img(2) },
  { name: "Gucci GG Bucket Hat", carrier: "ViettelPost", price: "6.400.000₫", status: "Delivered", photo: img(11) },
  { name: "Versace Medusa Pumps", carrier: "GHTK", price: "15.900.000₫", status: "Packed", photo: img(20) },
  { name: "LV Zippy Coin Purse", carrier: "J&T Express", price: "5.600.000₫", status: "Delivered", photo: img(22) },
];

const INVENTORY = [
  { name: "LV MyLockMe BB", condition: "Like new", price: "68.500.000₫", status: "In stock", photo: img(4) },
  { name: "MCM Toni Mini Tote", condition: "Very good", price: "11.500.000₫", status: "In stock", photo: img(13) },
  { name: "Miu Miu Matelassé Wallet", condition: "Like new", price: "7.800.000₫", status: "Sold", photo: img(6) },
  { name: "Miu Miu Rimless Shades", condition: "Good", price: "6.900.000₫", status: "In stock", photo: img(1) },
];

// Monthly revenue/profit bar heights (%), echoing the app's Finance chart.
const CHART = [
  { r: 28, p: 10 }, { r: 34, p: 12 }, { r: 30, p: 11 }, { r: 42, p: 15 },
  { r: 38, p: 13 }, { r: 52, p: 19 }, { r: 48, p: 17 }, { r: 60, p: 22 },
  { r: 56, p: 20 }, { r: 68, p: 25 }, { r: 74, p: 27 }, { r: 88, p: 32 },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function BrowserFrame({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <figure
      className={cn(
        "hover-lift overflow-hidden rounded-xl border border-white/10 bg-card",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-white/5 px-4 py-2.5">
        <span className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-2 w-2 rounded-full bg-white/15" />
          ))}
        </span>
        <span className="text-muted-foreground ml-2 rounded-md bg-white/5 px-2.5 py-0.5 text-[10px]">
          reluxio · {label.toLowerCase()}
        </span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">{children}</div>
      <figcaption className="sr-only">{label}</figcaption>
    </figure>
  );
}

function StatusPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="shrink-0 rounded-full border border-white/15 bg-white/5 px-1.5 py-px text-[7px] whitespace-nowrap text-white/70">
      {children}
    </span>
  );
}

function Thumb({ photo, size = "h-6 w-6" }: { photo: string; size?: string }) {
  return (
    <span className={cn("relative block shrink-0 overflow-hidden rounded-md", size)}>
      <Image src={photo} alt="" fill sizes="48px" className="object-cover" />
    </span>
  );
}

/** The Finance dashboard — sidebar, stat cards, monthly bar chart. */
function MockDashboard() {
  const nav = [
    { icon: LayoutDashboard, label: "Overview" },
    { icon: PackageSearch, label: "Inventory" },
    { icon: Users, label: "Customers" },
    { icon: ReceiptText, label: "Orders" },
    { icon: ChartLine, label: "Finance", active: true },
    { icon: Store, label: "Storefront" },
    { icon: Settings, label: "Settings" },
  ];
  // Gross profit / margin render green in the real Finance page.
  const stats = [
    { label: "Revenue", value: "128.400.000₫" },
    { label: "Gross profit", value: "41.200.000₫", positive: true },
    { label: "Profit margin", value: "32.1%", positive: true },
    { label: "Orders", value: "47" },
  ];

  return (
    <div aria-hidden className="absolute inset-0 flex text-left">
      {/* Sidebar */}
      <div className="hidden w-[19%] flex-col border-r border-white/5 bg-white/[0.02] p-3 sm:flex">
        <div className="flex items-center gap-1.5 px-1">
          <span className="bg-foreground text-background grid h-4 w-4 shrink-0 place-items-center rounded-[3px] font-serif text-[9px] font-semibold">
            R
          </span>
          <span className="font-serif text-[9px] font-semibold tracking-[0.14em] uppercase">
            Reluxio
          </span>
          <span className="ml-auto rounded-full border border-white/20 px-1 py-px text-[6px] text-white/70">
            Premium
          </span>
        </div>
        <nav className="mt-3 space-y-0.5">
          {nav.map(({ icon: Icon, label, active }) => (
            <div
              key={label}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-2 py-1 text-[9px]",
                active ? "bg-white/10 text-white" : "text-white/45",
              )}
            >
              <Icon className="h-2.5 w-2.5" />
              {label}
            </div>
          ))}
        </nav>
      </div>

      {/* Main pane */}
      <div className="flex min-w-0 flex-1 flex-col gap-3 p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">Finance</span>
          <div className="flex gap-1.5">
            <span className="flex items-center gap-1 rounded-md border border-white/15 px-2 py-1 text-[8px] text-white/70">
              <Plus className="h-2 w-2" /> Add income
            </span>
            <span className="rounded-md border border-white/15 px-2 py-1 text-[8px] text-white/70">
              Export PDF
            </span>
          </div>
        </div>

        <div className="flex w-max gap-0.5 rounded-lg border border-white/10 p-0.5 text-[8px]">
          {["Today", "7 days", "This month", "Custom"].map((tab, i) => (
            <span
              key={tab}
              className={cn(
                "rounded-md px-2 py-0.5",
                i === 2 ? "bg-white/10 text-white" : "text-white/45",
              )}
            >
              {tab}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-2">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-lg border border-white/8 bg-white/[0.03] p-2">
              <p className="text-[7px] text-white/50">{stat.label}</p>
              <p
                className={cn(
                  "mt-0.5 text-[11px] font-semibold",
                  stat.positive && "text-emerald-400",
                )}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="flex min-h-0 flex-1 flex-col rounded-lg border border-white/8 bg-white/[0.02] p-3">
          <div className="flex items-center justify-between">
            <p className="text-[9px] font-medium">Monthly revenue & profit</p>
            <div className="flex items-center gap-2 text-[7px] text-white/50">
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-[2px] bg-emerald-400" /> Profit
              </span>
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-[2px] bg-amber-400" /> Revenue
              </span>
            </div>
          </div>
          <div className="mt-2 flex min-h-0 flex-1 items-end gap-1.5">
            {CHART.map((month, i) => (
              <div key={i} className="flex h-full flex-1 flex-col justify-end gap-0.5">
                <div className="flex h-full items-end justify-center gap-px">
                  <span className="w-1/2 rounded-t-[2px] bg-amber-400" style={{ height: `${month.r}%` }} />
                  <span className="w-1/2 rounded-t-[2px] bg-emerald-400" style={{ height: `${month.p}%` }} />
                </div>
                <span className="text-center text-[6px] text-white/35">{MONTHS[i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Orders table — product, carrier, price, status pill. */
function MockOrders() {
  return (
    <div aria-hidden className="absolute inset-0 flex flex-col p-3 text-left">
      <div className="flex items-center justify-between px-1 pb-2">
        <span className="text-[10px] font-semibold">Orders</span>
        <span className="flex items-center gap-1 rounded-md border border-white/15 px-1.5 py-0.5 text-[7px] text-white/70">
          <Plus className="h-2 w-2" /> New order
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1.5">
        {ORDERS.map((order) => (
          <div
            key={order.name}
            className="flex flex-1 items-center gap-2 rounded-lg border border-white/6 bg-white/[0.03] px-2"
          >
            <Thumb photo={order.photo} />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[8px] font-medium">{order.name}</span>
              <span className="block truncate text-[7px] text-white/40">{order.carrier}</span>
            </span>
            <span className="text-[7px] whitespace-nowrap text-white/60">{order.price}</span>
            <StatusPill>{order.status}</StatusPill>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Public storefront — merchant header + product card grid. */
function MockStorefront() {
  return (
    <div aria-hidden className="absolute inset-0 flex flex-col p-3 text-left">
      <div className="flex items-center gap-1.5 px-1 pb-2">
        <span className="bg-foreground text-background grid h-4 w-4 place-items-center rounded-full font-serif text-[8px] font-semibold">
          K
        </span>
        <span className="text-[9px] font-semibold">Kim Closet</span>
        <span className="ml-auto rounded-full border border-white/15 px-1.5 py-px text-[6px] text-white/50">
          128 items
        </span>
      </div>
      <div className="grid flex-1 grid-cols-3 gap-2">
        {STOREFRONT_PRODUCTS.map((product) => (
          <div key={product.name} className="flex min-h-0 flex-col overflow-hidden rounded-lg border border-white/6 bg-white/[0.03]">
            <span className="relative min-h-0 flex-1">
              <Image src={product.photo} alt="" fill sizes="130px" className="object-cover" />
            </span>
            <span className="p-1.5">
              <span className="block truncate text-[7px] font-medium">{product.name}</span>
              <span className="block text-[7px] text-white/50">{product.price}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Inventory table — search bar + rows with condition and stock status. */
function MockInventory() {
  return (
    <div aria-hidden className="absolute inset-0 flex flex-col p-3 text-left">
      <div className="flex items-center justify-between px-1 pb-2">
        <span className="text-[10px] font-semibold">Inventory</span>
        <span className="flex items-center gap-1 rounded-md border border-white/15 px-1.5 py-0.5 text-[7px] text-white/70">
          <Plus className="h-2 w-2" /> Add product
        </span>
      </div>
      <div className="mb-1.5 flex items-center gap-1.5 rounded-md border border-white/8 bg-white/[0.03] px-2 py-1 text-[7px] text-white/35">
        <Search className="h-2 w-2" /> Search by name or seller...
      </div>
      <div className="flex flex-1 flex-col gap-1.5">
        {INVENTORY.map((item) => (
          <div
            key={item.name}
            className="flex flex-1 items-center gap-2 rounded-lg border border-white/6 bg-white/[0.03] px-2"
          >
            <Thumb photo={item.photo} />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[8px] font-medium">{item.name}</span>
              <span className="block truncate text-[7px] text-white/40">{item.condition}</span>
            </span>
            <span className="text-[7px] whitespace-nowrap text-white/60">{item.price}</span>
            <StatusPill>{item.status}</StatusPill>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function Showcase() {
  const t = await getTranslations("showcase");

  return (
    <section
      id="product"
      className="relative scroll-mt-20 overflow-hidden py-24 sm:py-32"
    >
      <GhostNumeral n="01" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div data-fx="rise" className="section-reveal mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-semibold text-balance sm:text-4xl">
            {t("heading")}
          </h2>
          <p className="text-muted-foreground mt-4 text-balance leading-relaxed">
            {t("sub")}
          </p>
        </div>

        <div data-fx="tilt" className="section-reveal texture-aurora mt-14 rounded-2xl p-1">
          <BrowserFrame label={t("dashboard")}>
            <MockDashboard />
          </BrowserFrame>
        </div>

        {/* Small frames sit slightly tilted at rest and square up on hover. */}
        <div data-fx-group className="section-reveal mt-8 grid gap-6 sm:grid-cols-3">
          <div data-fx="card" className="transition-transform duration-300 sm:-rotate-[1.2deg] sm:hover:rotate-0">
            <BrowserFrame label={t("orders")}>
              <MockOrders />
            </BrowserFrame>
          </div>
          <div data-fx="card" className="transition-transform duration-300 sm:rotate-[0.8deg] sm:hover:rotate-0">
            <BrowserFrame label={t("storefront")}>
              <MockStorefront />
            </BrowserFrame>
          </div>
          <div data-fx="card" className="transition-transform duration-300 sm:-rotate-[0.8deg] sm:hover:rotate-0">
            <BrowserFrame label={t("inventory")}>
              <MockInventory />
            </BrowserFrame>
          </div>
        </div>
      </div>
    </section>
  );
}
