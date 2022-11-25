import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jsonwebtoken from 'jsonwebtoken';
import * as bcryptjs from 'bcryptjs';
import { Response } from 'superagent';
// @ts-ignore
import chaiHttp = require('chai-http');
import App from '../app';
import User from '../database/models/Users';