// it converts [46898.0, 0.0801]  to {price:46898.0, amount:0.0801}

interface FtxOrder {
    [index: number]: number
}

export default (ftxOrder: FtxOrder) => {
    return { price: ftxOrder[0], amount: ftxOrder[1] }
}
