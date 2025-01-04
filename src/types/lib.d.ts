declare module 'lib/mongo' {
  import { Mongoose } from 'mongoose';
  function dbConnect(): Promise<Mongoose>;
  export default dbConnect;
}