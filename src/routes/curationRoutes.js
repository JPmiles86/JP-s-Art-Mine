// my-gallery/src/routes/curationRoutes.js

const express = require('express');
const router = express.Router();
const { CurationListUser, CurationListUserPhotos } = require('../../models');

// Create a new curation list for a user
router.post('/user', async (req, res) => {
    try {
        const { userId, name, visibility } = req.body;

        // Check if a list with the same name already exists for the user
        const existingList = await CurationListUser.findOne({
            where: { userId, name, deleted: false }
        });

        if (existingList) {
            return res.status(400).json({ error: 'A list with this name already exists.' });
        }

        const curationList = await CurationListUser.create({ userId, name, visibility });
        res.status(201).json(curationList);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create curation list' });
    }
});

// Get all curation lists for a user
router.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const curationLists = await CurationListUser.findAll({
            where: { userId, deleted: false }
        });

        // If no lists exist, create a default "Wish List"
        if (curationLists.length === 0) {
            const wishList = await CurationListUser.create({
                userId,
                name: 'Wish List',
                visibility: 'private',
            });
            return res.status(201).json([wishList]);
        }

        res.status(200).json(curationLists);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch curation lists' });
    }
});

// Update a curation list's name or visibility
router.put('/user/:listId', async (req, res) => {
    try {
        const { listId } = req.params;
        const { name, visibility } = req.body;
        const curationList = await CurationListUser.findByPk(listId);

        if (!curationList) {
            return res.status(404).json({ error: 'Curation list not found' });
        }

        curationList.name = name || curationList.name;
        curationList.visibility = visibility || curationList.visibility;
        await curationList.save();

        res.status(200).json(curationList);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update curation list' });
    }
});

// Delete a curation list (soft delete)
router.delete('/user/:listId', async (req, res) => {
    try {
        const { listId } = req.params;
        const curationList = await CurationListUser.findByPk(listId);

        if (!curationList) {
            return res.status(404).json({ error: 'Curation list not found' });
        }

        curationList.deleted = true;
        await curationList.save();
        res.status(200).json({ message: 'Curation list deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete curation list' });
    }
});

// Updated route: Get all photos in all lists for a user
router.get('/user/:userId/photos', async (req, res) => {
    try {
        const { userId } = req.params;
        const listPhotos = await CurationListUserPhotos.findAll({
            include: [
                {
                    model: CurationListUser,
                    where: { userId, deleted: false },
                    attributes: ['id', 'name']
                }
            ]
        });
        res.status(200).json(listPhotos);
    } catch (error) {
        console.error('Error fetching photos:', error);
        res.status(500).json({ error: 'Failed to fetch photos in curation lists', details: error.message });
    }
});

// Add a photo to a curation list
// Modify the existing "Add a photo to a curation list" route
router.post('/user/:listId/photo', async (req, res) => {
    try {
        const { listId } = req.params;
        const { photoId, diptychCode } = req.body;

        const existingEntry = await CurationListUserPhotos.findOne({
            where: { listId, photoId, diptychCode }
        });

        if (existingEntry) {
            if (existingEntry.removed) {
                existingEntry.removed = false;
                await existingEntry.save();
                return res.status(200).json(existingEntry);
            } else {
                return res.status(400).json({ error: 'Photo already exists in the list.' });
            }
        }

        const curationListPhoto = await CurationListUserPhotos.create({
            listId,
            photoId,
            diptychCode,
            order: 1, // You can implement logic to set the correct order
            removed: false,
        });

        res.status(201).json(curationListPhoto);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add photo to curation list' });
    }
});

// Modify the existing "Mark a photo as removed from a curation list" route
router.delete('/user/:listId/photo/:photoId', async (req, res) => {
    try {
        const { listId, photoId } = req.params;
        const { diptychCode } = req.body;

        const curationListPhoto = await CurationListUserPhotos.findOne({
            where: { listId, photoId, diptychCode }
        });

        if (!curationListPhoto) {
            return res.status(404).json({ error: 'Photo not found in curation list' });
        }

        curationListPhoto.removed = true;
        await curationListPhoto.save();
        res.status(200).json({ message: 'Photo removed from curation list' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove photo from curation list' });
    }
});

module.exports = router;