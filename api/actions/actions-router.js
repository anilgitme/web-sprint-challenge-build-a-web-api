// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model');
const router = express.Router();

//first get request /api/actions
router.get('/api/actions', (req, res) => {
    Actions.get()
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((error) => {
            res.status(500).json({ message: error.message })
        })
})


//get by id

router.get('/api/actions/:id', async(req, res) => {
    const { id } = req.params;
    const getId = await Actions.get(id)
    try {
        if (!getId) {
            res.status(404).json({ message: 'current id does not exists' })
        } else {
            res.status(200).json(getId)
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//post request 

router.post('/api/actions', async(req, res) => {
    const body = req.body;

    if (!body.description || !body.notes || !body.project_id) {
        res.status(400).json({ message: 'Please fill out missing fields' })
    } else {
        try {
            const createdAction = await Actions.insert(body);
            res.status(201).json(createdAction)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
});

//put returns updated action

router.put('/api/actions/:id', async(req, res) => {
    const { id } = req.params;
    const body = req.body;
    if (!body.description && !body.project_id && !body.notes) {
        res.status(400).json({ message: 'Please fill out missing fields' })
    } else {
        try {
            const updateAction = await Actions.update(id, body)
            res.status(200).json(updateAction)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
})

//delete returns no response body

router.delete('/api/actions/:id', async(req, res) => {
    const { id } = req.params;
    const deleteAction = await Actions.remove(id)
    try {
        if (!deleteAction) {
            res.status(404).json({ message: 'The ID provided does not exist' })
        } else {
            res.status(200).json(deleteAction);
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;