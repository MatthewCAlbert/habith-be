import { connect } from '../config/database';
import supertest from 'supertest';
import app from '../app';
import { User } from '../data/entities/user.entity';
import { Connection } from 'typeorm';
import faker from '@faker-js/faker';

jest.setTimeout(1000);
const request = supertest(app);

describe('Auth Activity', () => {
    const userData = {
        name: faker.name.findName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: 'oldpass12345'
    };
    const newPassword = 'newpass12345';
    let connection: Connection;
    let token = '';
    beforeAll(async () => {
        connection = await connect();
    }, 10000);
    afterAll(async ()=>{
        await connection.close();
    })

    // Create User
    it('Create user', (done) => {
    
        request.post('/v1/auth/register').send(userData).then((response)=>{
            expect(response.status).toBe(200);
            const {user, token: fetchedToken, expiresIn} = response?.body?.data;
            const {username, name, email} = user;
            expect(name).toMatch(userData.name);
            expect(email).toMatch(userData.email);
            expect(username).toMatch(userData.username);
            expect(expiresIn).toBe('1d');
            done()
        });

    });

    // Login User
    it('Login user', (done) => {
    
        request.post('/v1/auth/login').send({
            username: userData?.username,
            password: userData?.password
        }).then( response => {
            expect(response.status).toBe(200);
            const {token: fetchedToken, expiresIn} = response?.body?.data;
            token = 'Bearer '+fetchedToken;
            done();
        });

    });

    // Test Protected with Token and get user profile
    it('Test protected route with token and get user profile', (done) => {
        
        expect(token).toMatch(/^Bearer .*/);
    
        request.get('/v1/auth/profile')
            .set('Authorization',`${token}`).then( response => {
                expect(response.status).toBe(200);
                const {username, name} = response?.body?.data?.user;
                expect(username).toMatch(userData.username);
                expect(name).toMatch(userData.name);
                done();
            } );

    });

    // Test change password
    it('Change user password', (done) => {
    
        request.post('/v1/auth/change-password').set('Authorization',`${token}`).send({
            oldPassword: userData?.password,
            newPassword: newPassword,
            rePassword: newPassword,
        }).then( response => {
            expect(response.status).toBe(200);
            done();
        });

    });

    // Test login using new password
    it('Login using new password', (done) => {
    
        request.post('/v1/auth/login').send({
            username: userData?.username,
            password: newPassword
        }).then( response => {
            expect(response.status).toBe(200);
            done();
        });

    });

    // Test Protected with no Token
    it('Test protected route without token', (done) => {
    
        request.get('/v1/protected').then(response=>{
            expect(response.status).toBe(401);
            done();
        });

    });

    // Destroy User
    it('Destroy user', (done) => {
        User.delete({username: userData.username}).then(response => {
            // console.log(response)
            // expect(response.affected).toBeInstanceOf(Number);
            done();
        });
    });

});