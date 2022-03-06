import {NFTActionTypes} from "../actions/types";

export const nftReducer = (state = {myNFTs: null},action) => {
    switch (action.type){
        case  NFTActionTypes.SET_NFTs:
            return {
                ...state,
                myNFTs: action.payload
            };
        case NFTActionTypes.SET_NFT_NAME_BY_ID:
            return {
                ...state,
                myNFTs: state.myNFTs.map((nft) => nft._id === action.payload.id ? {
                    ...nft, name : action.payload.name} : nft
                ),
            }
        case NFTActionTypes.SET_NFT_DESCR_BY_ID:
            return {
                ...state,
                myNFTs: state.myNFTs.map((nft) => nft._id === action.payload.id ? {
                    ...nft, description : action.payload.description} : nft
                ),
            }
        case NFTActionTypes.ADD_NFT_ATTRB_BY_ID:
            return {
                ...state,
                myNFTs: state.myNFTs.map((nft) => nft._id === action.payload.id ? {
                    ...nft, attributes : [...nft.attributes,action.payload.attribute]} : nft
                ),
            }
        case NFTActionTypes.DEL_NFT_ATTRB_BY_ID:
            return {
                ...state,
                myNFTs: state.myNFTs.map((nft) => nft._id === action.payload.id ? {
                    ...nft, attributes : nft.attributes.filter((item,index) =>parseInt(action.payload.index)!==index)} : nft
                ),
            }
        case NFTActionTypes.UPDATE_NFT_BY_ID:
            return {
                ...state,
                myNFTs: state.myNFTs.map((nft)=>nft._id === action.payload._id ? action.payload:nft)
            }
        default:
            return state;
    }
}