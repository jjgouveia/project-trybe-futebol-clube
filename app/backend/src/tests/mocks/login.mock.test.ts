import { ILogin } from '../../interfaces/ILogin'
import IUser from '../../interfaces/IUser'

export const userMock: IUser = {
    id: 1,
    username: 'Zezinho',
    role: 'admin',
    email: 'zezindobar@gemeio.com',
    password: 'fidobio'
}

export const loginMock: ILogin = {
    email: userMock.email,
    password: userMock.password,
}

export const tokenMock: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InplemluZG9iYXJAZ2VtZWlvLmNvbSIsInBhc3N3b3JkIjoiZmlkb2JpbyIsImlhdCI6MTY2OTQzNDc4Nn0.BUaV9p5tkyYF_X7nT49klWvEfWqEBAAmb6GBt4oJVe8'


export const invalidLogins: ILogin[] = [
    {
      email: userMock.email,
      password: '',
    },
    {
      email: '',
      password: userMock.password,
    },
    {
      email: userMock.email,
      password: 'zezin',
    },
    {
      email: 'fidobio@gemeio.com',
      password: userMock.password
    },
];