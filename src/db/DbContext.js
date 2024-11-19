import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { HouseSchema } from '../models/Houses';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Houses = mongoose.model('House', HouseSchema)
}

export const dbContext = new DbContext()
