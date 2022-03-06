import {createSelector} from "reselect";

const selectNFT = state => state.myNFTs;

export const selectNFTbyID =  createSelector(
    selectNFT,(NFTs) => (id) =>
        NFTs.filter((nft) => nft._id === id)[0]

);