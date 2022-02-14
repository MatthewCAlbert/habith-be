import { connect } from '../config/database';
import supertest from 'supertest';
import app from '../app';
import { User } from '../data/entities/user.entity';
import { Connection } from 'typeorm';
import faker from '@faker-js/faker';

jest.setTimeout(parseInt(String(process.env.JEST_TESTING_TIMEOUT)));
const request = supertest(app);

describe('Habit Activity', () => {
    const userData = {
        name: faker.name.findName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: 'pass12345'
    };
    let connection: Connection;
    let token = '';

    beforeAll((done) => {
        const fun = async () => {
            connection = await connect();
            // Register users
            await request.post('/v1/auth/register').send(userData);
            const response = await request.post('/v1/auth/login').send({
                username: userData?.username,
                password: userData?.password
            })
            const {token: fetchedToken, expiresIn} = response?.body?.data;
            token = 'Bearer '+fetchedToken;
        }
        fun().finally(done);
    }, 10000);

    afterAll((done)=>{
        const fun = async () => {
            await User.delete({username: userData.username});
            await connection.close();
        }
        fun().finally(done);
    })

    it('Get empty habit', (done) => {
        request.get('/v1/habit').set('Authorization',`${token}`).then((response) => {
            expect(response.status).toBe(200);
            const data = response?.body?.data;
            expect(data?.length).toStrictEqual(0);
            done();
        })
    });

    let habitId: string;

    it('Create habit', (done) => {
        request.post('/v1/habit').set('Authorization',`${token}`).send({
            'title': 'Belajar gelut lagi',
            'category': 'rutin',
            'description': 'saya suka',
            'target': 1,
            'target_type': 'none',
            'start': null,
            'end': null,
            'repeat_every_day': 1
        }).then((response) => {
            expect(response.status).toBe(200);
            const data = response?.body?.data;
            expect(typeof data?.id).toStrictEqual('string');
            expect(data?.title).toStrictEqual('Belajar gelut lagi');
            habitId = data?.id;
            done();
        })
    });

    it('Get one habit', (done) => {
        request.get('/v1/habit').set('Authorization',`${token}`).then((response) => {
            expect(response.status).toBe(200);
            const data = response?.body?.data;
            expect(data?.length).toStrictEqual(1);
            done();
        })
    });

    it('Get one habit by id', (done) => {
        request.get(`/v1/habit/${habitId}`).set('Authorization',`${token}`).then((response) => {
            expect(response.status).toBe(200);
            const data = response?.body?.data;
            expect(typeof data?.id).toStrictEqual('string');
            done();
        })
    });

    it('Update one habit by id', (done) => {
        request.put(`/v1/habit/${habitId}`).set('Authorization',`${token}`).send({
            'title': 'Belajar gelut lagi',
            'category': 'rutin',
            'description': 'saya suka suka',
            'target': 1,
            'target_type': 'none',
            'start': null,
            'end': null,
            'repeat_every_day': 1
        }).then((response) => {
            expect(response.status).toBe(200);
            const data = response?.body?.data;
            expect(data?.description).toStrictEqual('saya suka suka');
            done();
        })
    });

    // Habit History

    const habitHistoryIds: string[] = [];

    it('Create habit history', (done) => {
        request.post(`/v1/habit/${habitId}/history`).set('Authorization',`${token}`).send({
            'date': '2022-02-14',
            'value': 1
        }).then((response) => {
            expect(response.status).toBe(200);
            const data = response?.body?.data;
            expect(typeof data?.id).toStrictEqual('string');
            habitHistoryIds.push(data?.id);
            done();
        })
    });

    it('Create habit history with dupe date', (done) => {
        request.post(`/v1/habit/${habitId}/history`).set('Authorization',`${token}`).send({
            'date': '2022-02-14',
            'value': 1
        }).then((response) => {
            expect(response.status).toBe(400);
            done();
        })
    });

    it('Create habit history 2', (done) => {
        request.post(`/v1/habit/${habitId}/history`).set('Authorization',`${token}`).send({
            'date': '2022-02-15',
            'value': 1
        }).then((response) => {
            expect(response.status).toBe(200);
            const data = response?.body?.data;
            expect(typeof data?.id).toStrictEqual('string');
            habitHistoryIds.push(data?.id);
            done();
        })
    });

    it('Update habit history', (done) => {
        request.put(`/v1/habit/history/${habitHistoryIds[0]}`).set('Authorization',`${token}`).send({
            'value': 3
        }).then((response) => {
            expect(response.status).toBe(200);
            const data = response?.body?.data;
            expect(data?.value).toStrictEqual(3);
            done();
        })
    });

    it('Delete habit history', (done) => {
        request.delete(`/v1/habit/history/${habitHistoryIds[0]}`).set('Authorization',`${token}`).then((response) => {
            expect(response.status).toBe(200);
            done();
        })
    });

    // End Habit History

    it('Delete one habit by id', (done) => {
        request.delete(`/v1/habit/${habitId}`).set('Authorization',`${token}`).then((response) => {
            expect(response.status).toBe(200);
            done();
        })
    });

});