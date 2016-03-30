import redis from 'redis';
import { Router } from 'express';
import nconf from '../config';

const router = Router(); // eslint-disable-line new-cap

let client = redis.createClient('redis://' + nconf.get('REDIS_PORT_6379_TCP_ADDR') + ':6379');

router
  .route('/:channel')
    .post((req, res) => {
      client.publish(req.params.channel, 'build for ' + req.body.repository.name + ' has finished',
      (err, response) => {
        res.send({ msg: "pushed to " + response + " subscribers" });
      });  
    });

export default router;
