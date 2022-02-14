import httpStatus from 'http-status';
import { stripObjectKeys } from '../utils/common';
import { User } from '../data/entities/user.entity';
import ApiError from '../utils/api-error';
import jwt from '../utils/jwt';

export const loginService = async (username: string, email: string, password: string): Promise<{
  user: any, 
  token: string, 
  expiresIn: string 
}>=>{
    return new Promise((resolve, reject)=>{
        User.findOne({...(stripObjectKeys({ username, email }))})
            .then((user)=>{
                if(!user){
                    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'user not found'))
                }

                const isValid = jwt.validPassword(password, user?.hash, user?.salt);

                if(isValid){
                    const tokenObj = jwt.issueJWT(user);
                    resolve({ 
                        user: user.toDomain(), 
                        token: tokenObj.token, 
                        expiresIn: tokenObj.expires 
                    })  
                }else
                    reject(new ApiError(httpStatus.UNAUTHORIZED, 'wrong password'))
            });
    })
}

export const changePasswordService = async (user: User, body: { oldPassword: string, newPassword: string })=>{
    const isValid = jwt.validPassword(body.oldPassword, user.hash, user.salt);

    if( !isValid ){
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Password identity mismatch')
    }

    const saltHash = jwt.genPassword(body.newPassword);
    const salt = saltHash.salt;
    const hash = saltHash.hash;

    try {
        const c_user = await User.findOne( {id: user.id} );
        if (!c_user) throw new Error();
        c_user.salt = salt;
        c_user.hash = hash;
        if ( await c_user.save() ){
            return { 
                user
            }
        }
    } catch (error) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Password change failed');
    }
}

export const registerUserService = async (body: { password: string, name: string, username: string, email: string })=>{
    const { email, username, name, password } = body;

    if ( await User.findOne(stripObjectKeys({username, email})) ) {
        throw new ApiError(httpStatus.FORBIDDEN, 'User already exists');
    }

    const saltHash = jwt.genPassword(password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User();
    newUser.email = email;
    newUser.name = name;
    newUser.username = username;
    newUser.hash = hash;
    newUser.salt = salt;

    await newUser.save();

    const tokenObj = jwt.issueJWT(newUser);
    return { 
        user: newUser, 
        token: tokenObj.token, 
        expiresIn: tokenObj.expires 
    } 
}

export const updateUserProfileService = async (user: User, body: {
    name?: string
})=>{
    const { name } = body;

    if ( name )
        user.name = name;
    await user.save();
    return user.toDomain();
}