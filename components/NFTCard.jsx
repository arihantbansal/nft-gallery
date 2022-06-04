export const NFTCard = ({ nft }) => {
	return (
		<div className="w-1/4 flex flex-col px-2 py-1 border-1 border-gray-400 rounded-lg">
			<div className="flex-auto rounded-md">
				<img
					className="object-contain h-128 w-full rounded-t-md"
					src={nft.media[0].gateway}></img>
			</div>
			<div className="flex-auto flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md h-110 ">
				<div className="flex-auto">
					<h2 className="text-xl text-gray-800">{nft.title}</h2>
					<p className="text-gray-600">ID: {parseInt(nft.id.tokenId, 16)}</p>
					<p className="text-gray-600 text-ellipsis overflow-hidden whitespace-nowrap">
						Contract Address: {`${nft.contract.address}`}
					</p>
				</div>
				<div className="flex-grow mt-2">
					<p className="text-gray-600">{nft.description}</p>
				</div>
			</div>
		</div>
	);
};
