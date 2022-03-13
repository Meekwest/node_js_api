import { Request, Response, NextFunction } from 'express';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';

export interface IUserController {
	login: (req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction) => void;
	register: (req: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction) => void;
}
