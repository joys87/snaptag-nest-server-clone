// import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
// import fs from 'fs';
// import multer from 'multer';
// import path, { extname, join } from 'path';

// const mkdir = (directory: string) => {
//   try {
//     console.log('Create a root uploads folder...');

//     fs.mkdirSync(join(__dirname, '..', `uploads`)); //폴더를 만드는 명령어
//   } catch (error) {
//     console.log('The folder already exists...');
//   }

//   try {
//     console.log(` Create a ${directory} uploads folder...`);

//     fs.mkdirSync(join(__dirname, '..', `uploads/${directory}`)); //폴더 생성
//   } catch (error) {
//     console.log(`The ${directory} folder already exists...`);
//   }
// };

// mkdir('uploads');

// export const multerOptionsFactory = (): MulterOptions => {
//   return {
//     storage: multer.diskStorage({
//       destination(req, file, done) {
//         done(null, join(process.cwd(), 'uploads'));
//       },

//       filename(req, file, done) {
//         const ext = extname(file.originalname);
//         const basename = path.basename(file.originalname, ext);

//         done(null, `${basename}_${Date.now()}${ext}`);
//       },
//     }),
//     limits: { fileSize: 10 * 1024 * 1024 },
//   };
// };
