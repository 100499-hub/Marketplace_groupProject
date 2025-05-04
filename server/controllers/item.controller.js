import Item from '../models/item.model.js';

// GET /v1/items
export const getItems = async (req, res) => {
    const items = await Item.find().populate('owner', 'userName');
    res.status(200).json(items);
};

// POST /v1/items  (auth-protected)
export const createItem = async (req, res) => {
    const it = new Item({ ...req.body, owner: req.user._id });
    await it.save();
    res.status(201).json(it);
};

// PUT /v1/items/:id  (owner only)
export const updateItem = async (req, res) => {
    const it = await Item.findById(req.params.id);
    if (!it || it.owner.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized' });
    }
    Object.assign(it, req.body);
    await it.save();
    res.json(it);
};

// DELETE /v1/items/:id  (owner only)
export const deleteItem = async (req, res) => {
    const it = await Item.findById(req.params.id);
    if (!it || it.owner.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized' });
    }
    await it.remove();
    res.json({ message: 'Deleted' });
};

// POST /v1/items/:id/buy  (any logged-in non-owner → deletes)
export const buyItem = async (req, res) => {
    const it = await Item.findById(req.params.id);
    if (!it) return res.status(404).json({ message: 'Not found' });
    if (it.owner.toString() === req.user._id.toString()) {
        return res.status(400).json({ message: 'Cannot buy your own item' });
    }
    await it.remove();
    res.json({ message: `Purchased & removed "${it.title}"` });
};
