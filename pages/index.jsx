import { useState } from "react";
import { NFTCard } from "../components/nftCard";

const Home = () => {
	const [wallet, setWalletAddress] = useState("");
	const [collection, setCollectionAddress] = useState("");
	const [NFTs, setNFTs] = useState([]);
	const [fetchForCollection, setFetchForCollection] = useState(false);

	const fetchNFTs = async () => {
		let nfts;
		var requestOptions = {
			method: "GET",
		};

		console.log("fetching NFTs...");

		const api_key = "WvjrzSqR4EeHhlbmHsC7h1_LpBo5A74t";
		const baseURL = `https://eth-rinkeby.alchemyapi.io/v2/${api_key}/getNFTs/`;

		if (!collection.length) {
			const fetchURL = `${baseURL}?owner=${wallet}`;
			nfts = await fetch(fetchURL, requestOptions).then((data) => data.json());
		} else {
			console.log("fetching nfts for collection owned by address");

			const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
			nfts = await fetch(fetchURL, requestOptions).then((data) => data.json());
		}

		if (nfts) {
			console.log("nfts: ", nfts);
			setNFTs(nfts.ownedNfts);
		}
	};

	const fetchNFTsForCollection = async () => {
		if (collection.length) {
			var requestOptions = {
				method: "GET",
			};

			const api_key = "A8A1Oo_UTB9IN5oNHfAc2tAxdR4UVwfM";
			const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTsForCollection/`;

			const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;
			const nfts = await fetch(fetchURL, requestOptions).then((data) =>
				data.json()
			);

			if (nfts) {
				console.log("NFTs in collection:", nfts);
				setNFTs(nfts.nfts);
			}
		}
	};

	return (
		<div className="flex flex-col items-center justify-center py-8 gap-y-3">
			<div className="flex flex-col w-full justify-center items-center gap-y-4">
				<input
					onChange={(e) => setWalletAddress(e.target.value)}
					value={wallet}
					className="border-2 border-sky-300 px-2 rounded-lg disabled:opacity-75 disabled:border-gray-300"
					type={"text"}
					disabled={fetchForCollection}
					placeholder="Add your wallet address"></input>
				<input
					onChange={(e) => setCollectionAddress(e.target.value)}
					value={collection}
					className="border-2 border-sky-300 px-2 rounded-lg"
					type={"text"}
					placeholder="Add the collection address"></input>
				<label className="text-gray-600 ">
					<input
						onChange={(e) => {
							setFetchForCollection(e.target.checked);
						}}
						type={"checkbox"}
						className="mr-2 default:ring-4 accent-blue-400"></input>
					Fetch for collection
				</label>
				<button
					className={
						"disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"
					}
					onClick={() => {
						if (fetchForCollection) {
							fetchNFTsForCollection();
						} else {
							fetchNFTs();
						}
					}}>
					Let's go!{" "}
				</button>
			</div>
			<div className="flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center">
				{NFTs.length > 0 &&
					NFTs.map((nft) => (
						<NFTCard key={nft.contract.address + Math.random()} nft={nft} />
					))}
				{NFTs.length === 0 && (
					<div className="text-center">No NFTs found! :/</div>
				)}
			</div>
		</div>
	);
};

export default Home;

