import * as request from 'supertest'
import app from '../src/app'

describe('POST /sensor  -- Receive a single UserEvent', () => {
        it('API test', async () => {
            const result = await request(app)
                                    .post('/sensor')
                                    .send({ id: '1',
                                            isSick: 0,
                                            location: { lat: 1.0,
                                                        lng: 1.5 }})
                                    .set('Accept', 'application/json')
                                    .expect(200)
        })
    }
)