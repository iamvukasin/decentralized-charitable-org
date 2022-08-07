source .env;

export STARKNET_NETWORK=alpha-goerli;
export STARKNET_WALLET=starkware.starknet.wallets.open_zeppelin.OpenZeppelinAccount;

CONTRACT="./contracts/Organization.cairo";
BUILD_DIR="./build";
BUILT_CONTRACT="$BUILD_DIR/contract.json";
BUILT_CONTRACT_ABI="$BUILD_DIR/abi.json";

starknet-compile $CONTRACT --output $BUILT_CONTRACT --abi $BUILT_CONTRACT_ABI;

# starknet deploy \
#     --contract $BUILT_CONTRACT \
#     --input $ORGANIZATION_OWNER_ADDRESS;
