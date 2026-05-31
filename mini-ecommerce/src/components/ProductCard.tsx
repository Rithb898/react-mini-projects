import { type Product } from "../api";

export default function ProductCard({ product }: { product: Product }) {
  const original = product.price / (1 - product.discountPercentage / 100);
  const lowStock = product.stock <= 10;

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white transition hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-neutral-100">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-cover transition group-hover:scale-105"
        />
        {product.discountPercentage > 0 && (
          <span className="absolute left-2 top-2 rounded bg-neutral-900 px-2 py-0.5 text-xs font-semibold text-white">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-3">
        <p className="text-xs uppercase tracking-wide text-neutral-400">{product.brand}</p>
        <h3 className="line-clamp-1 text-sm font-semibold text-neutral-900">{product.title}</h3>
        <p className="line-clamp-2 text-xs text-neutral-500">{product.description}</p>

        <div className="mt-1 flex items-center gap-1 text-xs text-amber-600">
          <span>★</span>
          <span className="font-medium">{product.rating.toFixed(2)}</span>
          <span className="text-neutral-400">· {product.category}</span>
        </div>

        <div className="mt-auto flex items-end justify-between pt-2">
          <div>
            <span className="text-base font-bold text-neutral-900">${product.price}</span>
            {product.discountPercentage > 0 && (
              <span className="ml-1 text-xs text-neutral-400 line-through">
                ${original.toFixed(0)}
              </span>
            )}
          </div>
          <span className={`text-xs font-medium ${lowStock ? "text-red-600" : "text-green-600"}`}>
            {lowStock ? `Only ${product.stock} left` : "In stock"}
          </span>
        </div>
      </div>
    </div>
  );
}
