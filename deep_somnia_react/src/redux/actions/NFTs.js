import {NFTActionTypes} from "./types";

export const setNFTs = NFTs =>({
    type: NFTActionTypes.SET_NFTs,
    payload : NFTs
})

export const updateNFTByID = nft =>({
    type: NFTActionTypes.UPDATE_NFT_BY_ID,
    payload : nft
})

export const setNameOfNFTByID = (id,name) => (
    {
        type: NFTActionTypes.SET_NFT_NAME_BY_ID,
        payload: {id,name}
    }
)

export const setDescriptionOfNFTByID = (id,description) => (
    {
        type: NFTActionTypes.SET_NFT_DESCR_BY_ID,
        payload: {id,description}
    }
)

export const addAttributeNFTByID = (id,attribute) => (
    {
    type : NFTActionTypes.ADD_NFT_ATTRB_BY_ID,
    payload : {id,attribute}

    }
)

export const deleteAttributeNFTByID = (id,index) => (
    {
        type : NFTActionTypes.DEL_NFT_ATTRB_BY_ID,
        payload : {id,index}

    }
)