// Write your "projects" router here!
const express = require('express');
const Project = require('./projects-model');
const router = express.Router();

//endpoint for retrieving the list of actions for a project
router.get('/api/projects/:id/actions', async(req, res) => {
    const { id } = req.params;
    const actionList = await Project.getProjectActions(id);
    try {
        res.status(200).json(actionList);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/api/projects', (req, res) => {
    Project.get()
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((error) => {
            res.status(500).json({ message: error.message })
        })
})


//get by id

router.get('/api/projects/:id', async(req, res) => {
    const { id } = req.params;
    const getId = await Project.get(id)
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

router.post('/api/projects', async(req, res) => {
    const body = req.body;
    if (!body.description || !body.name) {
        res.status(400).json({ message: 'Please fill out missing fields' })
    } else {
        await Project.insert(body)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(error => {
                res.status(500).json({ message: error.message })
            })
    }

})

//put returns updated action

router.put('/api/projects/:id', async(req, res) => {
    const { id } = req.params;
    const body = req.body;
    if (!body.name && !body.description && !body.completed) {
        res.status(400).json({ message: 'Please fill out missing fields' })
    } else {
        try {
            const updateProject = await Project.update(id, body)
            res.status(200).json(updateProject)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

})



//delete returns no response body

router.delete('/api/projects/:id', async(req, res) => {
    const { id } = req.params;
    try {
        const deleteAction = await Project.remove(id)
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