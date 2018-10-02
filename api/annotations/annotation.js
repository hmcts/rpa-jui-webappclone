const express = require('express');
const config = require('../../config');
const generateRequest = require('../lib/request');


function getAnnotionSet(uuid, options) {
    return generateRequest('GET', `${config.services.em_anno_api}/api/annotation-sets/filter?documentId=${uuid}`, options);
}

function createAnnotationSet(options) {
    return generateRequest('POST', `${config.services.em_anno_api}/api/annotation-sets/`, options);
}

function addAnnotation(options) {
    return generateRequest('POST', `${config.services.em_anno_api}/api/annotations`, options);
}

function deleteAnnotation(uuid, options) {
    return generateRequest('DELETE', `${config.services.em_anno_api}/api/annotations/${uuid}`, options);
}

function getOptions(req) {
    return {
        headers: {
            Authorization: `Bearer ${req.auth.token}`,
            ServiceAuthorization: req.headers.ServiceAuthorization
        },
        body: req.body
    };
}

module.exports = app => {
    const router = express.Router({ mergeParams: true });
    app.use('/annotation', router);

    router.post('/annotation-sets', (req, res, next) => {
        // Called when get annotation-sets returns 404
        const options = getOptions(req);

        createAnnotationSet(options)
            .then(response => {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('content-type', 'application/json');
                res.status(200).send(JSON.stringify(response));
            })
            .catch(response => {
                res.status(response.error.status).send(response.error.message);
            });
    });

    router.get('/annotation-sets/:uuid', (req, res, next) => {
        const options = getOptions(req);
        const uuid = req.params.uuid;

        getAnnotionSet(uuid, options)
            .then(response => {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('content-type', 'application/json');
                res.status(200).send(JSON.stringify(response));
            })
            .catch(response => {
                console.log(response.error || response);
                res.status(response.error.status).send(response.error.message);
            });
    });

    router.delete('/annotations/:uuid', (req, res, next) => {
        const options = getOptions(req);
        const uuid = req.params.uuid;

        deleteAnnotation(uuid, options)
            .then(response => {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('content-type', 'application/json');
                res.status(200).send(JSON.stringify(response));
            })
            .catch(response => {
                res.status(response.error.status).send(response.error.message);
            });
    });

    router.post('/annotations', (req, res, next) => {
        const options = getOptions(req);

        addAnnotation(options)
            .then(response => {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('content-type', 'application/json');
                res.status(200).send(JSON.stringify(response));
            })
            .catch(response => {
                res.status(response.error.status).send(response.error.message);
            });
    });
};
