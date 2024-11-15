"use client";
import Image from "next/image";
import { MintableItem } from "./MintSection";

export default function MintCard({
  item,
  isLoading,
  onMint,
}: {
  item: MintableItem;
  isLoading: boolean;
  onMint: () => Promise<void>;
}) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <div className="flex flex-col items-center space-y-6">
        <Image
          src={item.image}
          alt={item.name}
          className="w-48 h-48 object-contain"
          width={192}
          height={192}
          unoptimized={true}
        />
        <h2 className="text-3xl font-bold text-gray-800">{item.name}</h2>
        <p className="text-gray-600 text-center">{item.description}</p>
        <button
          onClick={onMint}
          disabled={isLoading}
          className="w-full max-w-xs bg-blue-600 text-white py-3 px-6 rounded-md
            hover:bg-blue-700 transition-colors duration-200
            flex items-center justify-center
            disabled:bg-blue-300"
        >
          {isLoading ? "Minting..." : "Mint"}
        </button>
      </div>
    </div>
  );
}
