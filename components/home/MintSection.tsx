"use client";
import { useSmartAccount } from "@/contexts/SmartAccountContext";
import { useState } from "react";
import Image from "next/image";
import sword from "./images/sword.png";
import { encodeFunctionData, parseAbi, parseUnits, verifyMessage } from "viem";

export function MintSection() {
  const { address, client } = useSmartAccount();
  const [isLoading, setIsLoading] = useState(false);

  const handleMint = async () => {
    if (!client || !address) return;

    setIsLoading(true);
    try {
      const contractAddress = "0xc2485e38954EA3e3Ec0f3BB3B8fCD468582Fb9b4";
      const abi = parseAbi(["function mint(address)"]);
      const mintData = encodeFunctionData({
        abi: abi,
        functionName: "mint",
        args: [address as `0x${string}`],
      });

      const userOp = await client.sendUserOperation({
        uo: {
          target: contractAddress,
          data: mintData,
        },
      });

      const receipt = await client.waitForUserOperationTransaction(userOp);
      alert("Successfully minted your sword!");
    } catch (error) {
      console.error("Failed to mint:", error);
      alert("Failed to mint sword");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-8 rounded-lg shadow-md">
      <div className="flex flex-col items-center space-y-6">
        <Image
          src={sword}
          alt="Legendary Sword"
          className="w-48 h-48 object-contain"
          width={192}
          height={192}
        />

        <h2 className="text-3xl font-bold text-gray-800">Legendary Sword</h2>

        <p className="text-gray-600 text-center">A powerful sword</p>

        <button
          onClick={handleMint}
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
