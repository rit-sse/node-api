import redis from 'redis';
import { Router } from 'express';
import nconf from '../config';
import request from 'request-promise';

const router = Router(); // eslint-disable-line new-cap
const client = redis.createClient('redis://' + nconf.get('REDIS_PORT_6379_TCP_ADDR') + ':6379');

router
  .route('/dockerbuilds')
  .post((req, res) => {
    // Publish the bots message to dockerbuilds
    client.publish('dockerbuilds', 'build for ' + req.body.repository.name + ' has finished', (err, response) => {
      res.send({
        msg: 'pushed to ' + response + ' subscribers'
      });
    });
    // Required response for docker hub to mark the webhook as completed.
    const responseData = {
      'state': 'success',
      'description': 'SSE webhook response',
      'context': 'sse',
      'target_url': 'https://sse.rit.edu'
    };
    request.post({
      url: req.body.callback_url,
      json: responseData
    })
    .then(() => console.log('Responsed'))
    .catch(err => console.error(err));
  });

router
  .route('/:channel')
  .post((req, res) => {
    // Publish the bots message to dockerbuilds
    client.publish(req.params.channel, JSON.stringify(req.body), (err, response) => {
      res.send({status: 'ok', count: response });
    });
  });

export
default router;
