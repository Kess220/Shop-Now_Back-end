let cartItems = [];

export async function addItem(req, res) {
    const newItem = req.body;
    cartItems.push(newItem);
    res.status(201).json(newItem);
};

export async function removeItem(req, res) {
    const itemId = req.params.id;
    cartItems = cartItems.filter((item) => item.id !== itemId);
    res.sendStatus(204);
};

export async function updateItemQuantity(req, res) {
    const itemId = req.params.id;
    const newQuantity = req.body.quantity;

    cartItems = cartItems.map((item) => {
        if (item.id === itemId) {
            return { ...item, quantity: newQuantity };
        }
        return item;
    });

    res.sendStatus(204);
};

export async function getCartItems(req, res) {
    res.json(cartItems);
};

export async function clearCart(req, res) {
    cartItems = [];
    res.sendStatus(204);
};